import { Component } from '@angular/core';

import { AuthService } from '../../components/auth/auth.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
    id: string;

    constructor(
        private authService: AuthService,
    ){}

    onSubmit = async ({email}) => {
        const message: string = await this.authService.resetPassword(email);
        window.alert(message);
    }
}
