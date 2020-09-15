import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { transliterate as slugify } from 'transliteration';

import { CreateDeputyModel, ResultModel } from '../../models';

@Injectable()
export class DeputyService {
    private createDeputyPath: string = 'https://us-central1-deputy-app.cloudfunctions.net/sendEmailDeputyForCreate';

    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) {}

    async createDeputy({email, name, surname, patronymic}: CreateDeputyModel): Promise<ResultModel> {
        let result: ResultModel;
        const randomPassword: string = Math.random().toString(36).substring(2) + Math.max(1, Math.min(10));
        const randomId: string = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4);
        let fullName: string = surname.toLocaleLowerCase() + '-' + name.toLocaleLowerCase()  + '-' + randomId;
        fullName = slugify(fullName);
        console.log('fullName', fullName)
        const data: CreateDeputyModel = {
            email,
            name,
            surname,
            patronymic,
            password: randomPassword,
            role: 'deputy',
            fullName
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

    sendEmailDeputy(data: CreateDeputyModel): Observable<any> {
        return this.httpClient.post(this.createDeputyPath, data)
            .pipe(catchError(this.errorHandler));
    }

    errorHandler(error: HttpErrorResponse) {
        return throwError(error.message || 'Server Error');
    }
}
