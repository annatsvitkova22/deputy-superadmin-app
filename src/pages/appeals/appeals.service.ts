import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ResultModel, Appeal } from '../../models';

@Injectable()
export class AppealsService {

    constructor(
        private db: AngularFirestore,
    ) {}

    async getAllAppeals(): Promise<Appeal[]> {
        const appeals: Appeal[] = [];
        const appealsSnaps: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
            = await this.db.collection('appeals').get().toPromise();
        if (appealsSnaps.size) {
            appealsSnaps.forEach(appealsSnap => {
                const {title, description, userId, deputyId, status} = appealsSnap.data();
                const appeal: Appeal = {
                    id: appealsSnap.id,
                    title,
                    description,
                    status,
                    userId,
                    deputyId
                };
                appeals.push(appeal);
            });
        }

        return appeals;
    }

    async editAppeal(id: string, title: string, description: string): Promise<ResultModel> {
        let result: ResultModel;
        await this.db.collection('appeals').doc(id).update({title, description}).then(async () => {
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

    async deleteAppeal(id: string): Promise<ResultModel> {
        let result: ResultModel;
        const appealRef = this.db.collection('appeals').doc(id);
        await appealRef.get().toPromise().then(async snap => {
            const { deputyId } = snap.data();
            const deputyRef = this.db.collection('users').doc(deputyId);
            await deputyRef.get().toPromise().then(async deputySnap => {
                const {countAppeals} = deputySnap.data();
                deputyRef.update({countAppeals: countAppeals - 1});
                await appealRef.delete().then(async () => {
                    result = {
                        status: true
                    };
                });
            });
        }).catch(() => {
            result = {
                status: false,
                message: 'Помилка мережі'
            };
        });

        return result;
    }
}
