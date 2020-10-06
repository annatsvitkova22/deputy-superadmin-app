import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { transliterate as slugify } from 'transliteration';
import { AngularFirestore } from '@angular/fire/firestore';

import { CreateDeputyModel, ResultModel, District, Party, User } from '../../models';

@Injectable()
export class DeputyService {
    private createDeputyPath: string = 'https://us-central1-deputy-app.cloudfunctions.net/createCustomUser';

    constructor(
        private httpClient: HttpClient,
        private db: AngularFirestore,
    ) {}

    async createDeputy({email, name, surname, patronymic, party, district}: CreateDeputyModel): Promise<ResultModel> {
        let result: ResultModel;
        const randomPassword: string = Math.random().toString(36).substring(2) + Math.max(1, Math.min(10));
        const randomId: string = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4);
        let fullName: string = surname.toLocaleLowerCase() + '-' + name.toLocaleLowerCase()  + '-' + randomId;
        fullName = slugify(fullName);
        const data: User = {
            email,
            name,
            surname,
            patronymic,
            password: randomPassword,
            role: 'deputy',
            fullName,
            district: district.id,
            party: party.id
        };
        await this.sendEmailDeputy(data).toPromise().then((res: boolean) => {
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

    async getDistricts(): Promise<District[]> {
        const districts: District[] = [];
        await this.db.collection('districts').get().toPromise().then(async (snapshots) => {
            snapshots.forEach(snapshot => {
                const district: District = {
                    id: snapshot.id,
                    name: snapshot.data().name
                };
                districts.push(district);
            });
        });

        return districts;
    }

    async getParties(): Promise<Party[]> {
        const parties: Party[] = [];
        await this.db.collection('parties').get().toPromise().then(async (snapshots) => {
            snapshots.forEach(snapshot => {
                const party: Party = {
                    id: snapshot.id,
                    name: snapshot.data().name
                };
                parties.push(party);
            });
        });

        return parties;
    }

    sendEmailDeputy(data: User): Observable<any> {
        return this.httpClient.post(this.createDeputyPath, data)
            .pipe(catchError(this.errorHandler));
    }

    errorHandler(error: HttpErrorResponse) {
        return throwError(error.message || 'Server Error');
    }
}
