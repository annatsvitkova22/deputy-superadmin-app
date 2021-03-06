import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { MainState } from '../../store/main.state';
import { environment } from '../../environments/environment';
import { AddAuth, DeleteAuth } from '../../store/auth.action';
import { AuthState, ResultModel, UserAvatal } from '../../models';

@Injectable()
export class AuthService {
    constructor(
        private authFire: AngularFireAuth,
        private db: AngularFirestore,
        private router: Router,
        private store: Store<MainState>,
        private httpClient: HttpClient,
    ) {}

    async signIn(email: string, password: string): Promise<ResultModel> {
        let success: ResultModel = {
            status: false,
            message: ''
        };
        await this.authFire.signInWithEmailAndPassword(email, password).then(async result => {
            await this.db.collection('users').doc(result.user.uid).get().toPromise().then(async (snapshot) => {
                const user: firebase.firestore.DocumentData = snapshot.data();
                if (user.role !== 'deputy') {
                    const name: string[] = user.name.split(' ');
                    const shortName: string = name[1] ? name[1].substr(0, 1).toUpperCase() : '' + name[0].substr(0, 1).toUpperCase();
                    await this.setUser(result.user.uid, user.email, user.role, user.imageUrl, shortName);
                    this.router.navigate(['/dashbord/users']);
                } else {
                    this.signOut();
                    success = {
                        status: true,
                        message: 'У Вас недостатньо прав для доступу'
                    };
                }
            });
        }).catch(err => {
            const message: string = err.code === 'auth/user-not-found' ?  'Неправильний логин' : 'Неправильний пароль';
            success = {
                status: true,
                message
            };
        });

        return success;
    }

    async setUser(userId: string, email: string, role: string, imageUrl: string, shortName: string, token = null): Promise<void> {
        const authStore: AuthState = {
            isAuth: true,
            user: { role, email, userId, imageUrl, shortName }
        };
        this.store.dispatch(new AddAuth(authStore));
        let getIdTokenResult: auth.IdTokenResult;
        if (!token) {
            getIdTokenResult = await auth().currentUser.getIdTokenResult();
        }
        localStorage.setItem('deputy-superadmin-app', token ? token : getIdTokenResult.token);
    }

    async getUserImage(): Promise<UserAvatal>  {
        let userImage: UserAvatal;
        this.store.select('authStore').subscribe((data: AuthState) =>  {
            if (data.user) {
                userImage = {
                    imageUrl: data.user.imageUrl ? data.user.imageUrl : null,
                    shortName: data.user.shortName ? data.user.shortName : null
                };
            }
        });

        return userImage;
    }


    async checkToken(): Promise<boolean> {
        let isValid: boolean;
        const token: string = localStorage.getItem('deputy-superadmin-app');
        if (token) {
            await this.getTokenResponse(token).toPromise().then((res) => {
                isValid = true;
            }).catch(err => {
                isValid = false;
                this.signOut();
            });
        } else {
            isValid = false;
        }

        return isValid;
    }

    async getUserId(): Promise<string>  {
        let userId: string;
        this.store.select('authStore').subscribe((data: AuthState) =>  userId = data.user ? data.user.userId : null);

        return userId;
    }

    async getUserEmail(): Promise<string>  {
        let userEmail: string;
        this.store.select('authStore').subscribe((data: AuthState) =>  userEmail = data.user.email);

        return userEmail;
    }

    getTokenResponse(token: string): Observable<any> {
        return this.httpClient.post(environment.checkTokenPath, {
            token
        }).pipe(catchError(this.errorHandler));
    }

    errorHandler(error: HttpErrorResponse) {
        return throwError(error.error.message || 'Server Error');
    }

    async resetPassword(email: string): Promise<string> {
        let message: string = 'Check your email';

        await this.authFire.sendPasswordResetEmail(email).catch(err => message = err.message);

        return message;
    }

    signOut(): void {
        this.authFire.signOut();
        this.store.dispatch(new DeleteAuth());
        localStorage.removeItem('deputy-superadmin-app');
    }
}
