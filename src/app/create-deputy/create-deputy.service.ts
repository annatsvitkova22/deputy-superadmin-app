import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class DeputyService {

    constructor(
        private authFire: AngularFireAuth,
        private db: AngularFirestore,
        private router: Router
    ) {}

    async createDeputy({email, name}): Promise<boolean> {
        let success: boolean = false;
        const randomPassword: string = Math.random().toString(36).substring(2) + Math.max(1, Math.min(10));
        console.log('randomPassword', randomPassword)
        await this.authFire.createUserWithEmailAndPassword(email, randomPassword).then(async result => {
            console.log('result', result);
            // this.writeDeputyToCollection(result.user.uid,)

            this.router.navigate(['/']);
        }).catch(err => {
            success = true;
        });

        return success;
    }

    async writeDeputyToCollection(userId: string, name: string, email: string): Promise<boolean> {
        try {
            await this.db.collection('users').doc(userId).set({
                name,
                email,
                role: 'deputy'
            });
        } catch (error) {
            return error;
        }

        return true;
    }

}
