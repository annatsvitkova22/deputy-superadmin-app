import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { MainState } from '../../store/main.state';
import { AddAuth } from '../../store/auth.action';
import { AuthState, CreateUser, AuthUser } from '../../models';

@Injectable()
export class AuthService {

    constructor(
        private authFire: AngularFireAuth,
        private db: AngularFirestore,
        private router: Router,
        private store: Store<MainState>,
    ) {}

    async signIn(email: string, password: string): Promise<boolean> {
        let success: boolean = false;
        await this.authFire.signInWithEmailAndPassword(email, password).then(async result => {
            await this.db.collection('users').doc(result.user.uid).get().subscribe(async (snapshot) => {
                const user: firebase.firestore.DocumentData = snapshot.data();
                await this.setUser(result.user.uid, user.email, user.role);
                this.router.navigate(['/']);
            });

        }).catch(err => {
            success = true;
        });

        return success;
    }

    async setUser(userId: string, email: string, role: string, token = null): Promise<void> {
        const authStore: AuthState = {
            isAuth: true,
            user: { role, email, userId }
        };
        this.store.dispatch(new AddAuth(authStore));
        let getIdTokenResult: auth.IdTokenResult;
        if (!token) {
            getIdTokenResult = await auth().currentUser.getIdTokenResult();
        }
        localStorage.setItem('deputies-admin-app', token ? token : getIdTokenResult.token);

        await this.store.select('authStore').subscribe((data: AuthState) => console.log('data', data) );
    }

    async resetPassword(email: string): Promise<string> {
        let message: string = 'Check your email';

        await this.authFire.sendPasswordResetEmail(email).catch(err => message = err.message);

        return message;
    }
}
