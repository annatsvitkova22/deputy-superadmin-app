import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ResultModel, ConfirmMessage, Appeal, ConfirmAppealGroup } from '../../models';

@Injectable()
export class NotificationsService {
    private sendComentDeputyPath: string = 'https://us-central1-deputy-app.cloudfunctions.net/sendCommentDeputy';
    constructor(
        private httpClient: HttpClient,
        private db: AngularFirestore,
    ) {}

    filterNotifications(ref: CollectionReference) {
        let dataRef: firebase.firestore.Query<firebase.firestore.DocumentData> = ref.where('type', '==', 'confirm');
        dataRef = dataRef.orderBy('date', 'desc');

        return dataRef;
    }

    async getConfirmAppeal(): Promise<ConfirmAppealGroup[]> {
        let confirmAppeals: any = await this.db.collection('messages', ref => this.filterNotifications(ref)).get().toPromise();
        if (confirmAppeals.size) {
            confirmAppeals = confirmAppeals.docs.map((snap) => async () =>  {
                const {appealId, date, loadedFiles, message, isRead} = snap.data();
                const confirm: ConfirmMessage = {
                    id: snap.id,
                    appealId,
                    date,
                    loadedFiles,
                    message,
                    isRead: isRead ? isRead : false
                };
                const appealSpan = await this.db.collection('appeals').doc(appealId).get().toPromise();
                const {title, description, userId, deputyId} = appealSpan.data();
                const appeal: Appeal = {
                    title,
                    description,
                    userId,
                    deputyId
                };
                const confirmAppealGroup: ConfirmAppealGroup = {
                    appeal,
                    confirm
                };

                return confirmAppealGroup;
            });
            return Promise.all(confirmAppeals.map(fn => fn()));
        }
        return [];
    }

    filterAppeal(ref: CollectionReference) {
        let dataRef: firebase.firestore.Query<firebase.firestore.DocumentData> = ref.where('isBlock', '==', true);
        dataRef = dataRef.orderBy('updateDate', 'desc');

        return dataRef;
    }

    async getBlockAppeal(): Promise<Appeal[]> {
        const appeals: Appeal[] = [];
        const appealsRef = await this.db.collection('appeals', ref => this.filterAppeal(ref)).get().toPromise();
        if (appealsRef.size) {
            appealsRef.docs.map(span => {
                const {title, description, userId, deputyId, fileImageUrl, fileUrl, isRead} = span.data();
                const appeal: Appeal = {
                    id: span.id,
                    title,
                    description,
                    userId,
                    deputyId,
                    fileUrl: fileUrl ? fileUrl : null,
                    fileImageUrl: fileImageUrl ? fileImageUrl : null,
                    isRead: isRead ? isRead : false
                };

                appeals.push(appeal);
            });
        }

        return appeals;
    }

    async approveAppeal(id: string): Promise<ResultModel> {
        let result: ResultModel;
        await this.db.collection('messages').doc(id).update({type: 'done'}).then(span => {
            result = {
                status: true
            };
        }).catch(() => {
            result = {
                status: false,
                message: 'Помилка мережі'
            };
        });

        return result;
    }

    async sendComent(deputyId: string, message: string, appealId: string): Promise<ResultModel> {
        let result: ResultModel;
        await this.sendComentDeputy(deputyId, message, appealId).toPromise().then((res: boolean) => {
            result = {
                status: res
            };
        }, (error) => {
            result = {
                status: false,
                message: error.message
            };
        });

        return result;
    }

    async returnAppeal(id: string): Promise<ResultModel>  {
        let result: ResultModel;
        await this.db.collection('appeals').doc(id).update({isBlock: false}).then(() => {
            result = {
                status: true
            };
        }).catch( () => {
            result = {
                status: false,
                message: 'Помилка мережі'
            };
        });

        return result;
    }

    async onReadAppeal(id: string): Promise<ResultModel>  {
        let result: ResultModel;
        await this.db.collection('appeals').doc(id).update({isRead: true}).then(() => {
            result = {
                status: true
            };
        }).catch( () => {
            result = {
                status: false,
                message: 'Помилка мережі'
            };
        });

        return result;
    }

    async confirmIsRead(id: string): Promise<void>{
        await this.db.collection('messages').doc(id).update({isRead: true});
    }

    sendComentDeputy(deputyId: string, message: string, appealId: string): Observable<any> {
        return this.httpClient.post(this.sendComentDeputyPath, {deputyId, message, appealId})
            .pipe(catchError(this.errorHandler));
    }

    errorHandler(error: HttpErrorResponse) {
        return throwError(error.message || 'Server Error');
    }
}
