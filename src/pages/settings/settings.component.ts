import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ChangeEmailComponent } from '../../components/settings/change-email/change-email.component';
import { ChangePasswordComponent } from '../../components/settings/change-password/change-password.component';
import { ChangePassword, ResultModel } from '../../models';
import { AuthService } from '../../components/auth/auth.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent {
    // tslint:disable-next-line: no-inferrable-types
    isLoad: boolean;
    @ViewChild('emailChild') emailChild: ChangeEmailComponent;
    @ViewChild('passwordChild') passwordChild: ChangePasswordComponent;

    constructor(
        private router: Router,
        private authService: AuthService
    ){}

    async onSave(): Promise<void> {
        this.isLoad = true;
        const email: string = this.emailChild.getForm();
        const passwords: ChangePassword = this.passwordChild.getForm();
        const {oldPassword, password, repeatPassword}: ChangePassword = passwords;
        // tslint:disable-next-line: no-inferrable-types
        let isError: boolean = false;
        let isChangePas: boolean = false;
        let isEmailPas: boolean = false;
        if (oldPassword && password && repeatPassword) {
            if (!isError) {
                const changePasswordResult: ResultModel = await this.passwordChild.onSubmit(passwords);
                if (changePasswordResult.status) {
                    isChangePas = true;
                } else {
                    isError = true;
                }
            }
        }
        if (email) {
            // tslint:disable-next-line: no-shadowed-variable
            const changeInfoResult: boolean = await this.emailChild.onSubmit(email);
            if (changeInfoResult) {
                isEmailPas = true;
            } else {
                isError = true;
            }
        }
        if (!isError) {
            if (isEmailPas && isChangePas) {
                window.alert('Оновлення збережено і вiдправлено підтвердження на пошту');
            } else if (isEmailPas) {
                window.alert('Вам вiдправлено підтвердження на пошту');
            } else if (isChangePas) {
                window.alert('Пароль оновлено');
            } else {
                window.alert('Помилка оновлення, спробуйте ще раз');
            }
            this.authService.signOut();
            this.router.navigate(['/sign-in']);
        }
        this.isLoad = false;
    }
}
