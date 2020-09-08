import { CanActivate, Router } from '@angular/router';
import { Injectable, ɵConsole } from '@angular/core';
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
            const idTokenResult = await auth().currentUser.getIdTokenResult(true);
            const timeNow = Math.round(new Date().getTime() / 1000);

            if (idTokenResult && idTokenResult.claims.exp > timeNow) {
                let userStore;
                this.store.select('authStore').subscribe((data: AuthState) => userStore = data );
                if (!userStore.isAuth) {
                    const userId: string = idTokenResult.claims.user_id;
                    await this.db.collection('users').doc(userId).get().subscribe(async (snapshot) => {
                        const user: firebase.firestore.DocumentData = snapshot.data();
                        if (user.role !== 'admin') {
                            this.router.navigate(['/login']);
                            isAuth = false;
                        } else {
                            await this.authService.setUser(userId, user.email, user.role, idTokenResult.token);
                            isAuth = true;
                        }
                    });
                } else {
                    if (userStore.user.role !== 'admin') {
                        this.router.navigate(['/login']);
                        isAuth = false;
                    } else {
                        isAuth = true;
                    }
                }
            } else {
                this.router.navigate(['/login']);
                isAuth = false;
            }
        } catch (error) {
            this.router.navigate(['/login']);
            isAuth = false;
        }
        return isAuth;
    }
}
