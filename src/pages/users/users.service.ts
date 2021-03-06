import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { transliterate as slugify } from 'transliteration';

import { environment } from '../../environments/environment';
import { User, ResultModel } from '../../models';

@Injectable()
export class UsersService {

    constructor(
        private httpClient: HttpClient,
        private db: AngularFirestore,
    ) {}

    async getUsers(): Promise<User[]> {
        const users: User[] = [];
        await this.db.collection('users').get().toPromise().then(snaps => {
            snaps.forEach(snap => {
                const {name, surname, patronymic, email, role, isDesabled} = snap.data();
                const user: User = {
                    id: snap.id,
                    name: role === 'deputy' ? surname + ' ' + name  + ' ' + patronymic : name,
                    email,
                    role,
                    isDesabled: isDesabled ? isDesabled : false,
                };

                users.push(user);
            });
        });

        return users;
    }

    async onCreateUser(user: User): Promise<ResultModel> {
        let result: ResultModel;
        const randomPassword: string = Math.random().toString(36).substring(2) + Math.max(1, Math.min(10));
        const randomId: string = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4);
        let fullName: string;
        const customName: string[] = user.name.split(' ');
        if (user.role === 'deputy') {
            fullName = user.surname.toLocaleLowerCase() + '-' + user.name.toLocaleLowerCase()  + '-' + randomId;
        } else {
            const newRandomId: string = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4);
            fullName = customName[0].toLocaleLowerCase() + '-' + newRandomId + '-' + randomId;
        }
        fullName = slugify(fullName);
        const data: User = {
            email: user.email,
            name: user.role === 'deputy' ? customName[1] : user.name,
            surname: user.role === 'deputy' ? customName[0] : null,
            patronymic: user.role === 'deputy' ? customName[2] : null,
            password: randomPassword,
            role: user.role ? user.role : 'deputy',
            fullName,
        };

        await this.createUser(data).toPromise().then((res) => {
            result = {
                status: res,
                message: fullName
            };
        }, (error) => {
            result = {
                status: false,
                message: error.message
            };
        });

        return result;
    }

    createUser(data: User): Observable<any> {
        return this.httpClient.post(environment.createDeputyPath, data)
            .pipe(catchError(this.errorHandler));
    }

    async desibleUser(userId: string): Promise<ResultModel> {
        let result: ResultModel;
        await this.sendUserOnDesible(userId).toPromise().then(async (res: boolean) => {
            await this.deleteAppeals(userId);
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

    async deleteUser(userId: string): Promise<ResultModel> {
        let result: ResultModel;
        await this.sendUserOnDelete(userId).toPromise().then(async (res: boolean) => {
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

    async deleteAppeals(userId: string): Promise<void> {
        await this.db.collection('appeals', ref => ref.where('userId', '==', userId)).get().toPromise().then(snaps => {
            if (snaps.size) {
                snaps.forEach(snap => {
                    this.db.collection('appeals').doc(snap.id).delete();
                    this.deleteComment(snap.id);
                });
            }
        });
        await this.db.collection('appeals', ref => ref.where('deputyId', '==', userId)).get().toPromise().then(snaps => {
            if (snaps.size) {
                snaps.forEach(snap => {
                    this.db.collection('appeals').doc(snap.id).delete();
                    this.deleteComment(snap.id);
                });
            }
        });
    }

    async deleteComment(appealsId: string): Promise<void> {
        await this.db.collection('messages', ref => ref.where('appealId', '==', appealsId)).get().toPromise().then(snaps => {
            snaps.forEach(snap => {
                this.db.collection('messages').doc(snap.id).delete();
            });
        });
    }

    async editUser(user: User): Promise<ResultModel> {
        let result: ResultModel;
        await this.sendUserOnEdit(user).toPromise().then((res: boolean) => {
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

    sendUserOnEdit(user: User): Observable<any> {
        return this.httpClient.post(environment.editUserPath, user)
            .pipe(catchError(this.errorHandler));
    }

    sendUserOnDelete(userId: string): Observable<any> {
        return this.httpClient.post(environment.deleteUserPath, {userId})
            .pipe(catchError(this.errorHandler));
    }

    sendUserOnDesible(userId: string): Observable<any> {
        return this.httpClient.post(environment.desibleUserPath, {userId})
            .pipe(catchError(this.errorHandler));
    }

    errorHandler(error: HttpErrorResponse) {
        return throwError(error.message || 'Server Error');
    }
}
