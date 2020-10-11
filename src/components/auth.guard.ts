import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { auth } from 'firebase';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';

import { MainState } from '../store/main.state';
import { AuthState } from '../models';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private store: Store<MainState>,
        private db: AngularFirestore,
        private authService: AuthService
    ) {}

    async canActivate(): Promise<boolean> {
        let isAuth: boolean;
        try {
            const isValidToken: boolean = await this.authService.checkToken();
            if (isValidToken) {
                const idTokenResult: auth.IdTokenResult = await new Promise((resolve) => {
                    auth().onAuthStateChanged(user => {
                        if (user) {
                            resolve(user.getIdTokenResult());
                        } else {
                            this.router.navigate(['/sign-in']);
                            resolve(null);
                        }
                    });
                });
                if (idTokenResult) {
                    let userStore;
                    const userId: string = idTokenResult.claims.user_id;
                    this.store.select('authStore').subscribe((data: AuthState) => userStore = data );
                    await this.db.collection('users').doc(userId).get().toPromise().then(async (snapshot) => {
                        const user: firebase.firestore.DocumentData = snapshot.data();
                        let shortName: string;
                        if (user.role === 'admin') {
                            if (!userStore.isAuth) {
                                const name: string[] = user.name.split(' ');
                                shortName = name[1] ? name[1].substr(0, 1).toUpperCase() : '' + name[0].substr(0, 1).toUpperCase();
                                // tslint:disable-next-line: max-line-length
                                await this.authService.setUser(userId, user.email, user.role, user.imageUrl, shortName, idTokenResult.token);
                            } else {
                                localStorage.setItem('deputy-superadmin-app', idTokenResult.token);
                            }
                            isAuth = true;
                        } else {
                            this.router.navigate(['/sign-in']);
                            isAuth = false;
                        }
                    });
                }
            } else {
                auth().signOut();
                this.router.navigate(['/sign-in']);
                isAuth = false;
            }
        } catch (error) {
            this.router.navigate(['/sign-in']);
            isAuth = false;
        }
        return isAuth;
    }
}
