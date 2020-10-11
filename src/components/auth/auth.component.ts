import { Component } from '@angular/core';

import { AuthService } from './auth.service';
import { ResultModel } from '../../models';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isError: boolean;
  message: string;
  isLoad: boolean;

  constructor(
      private authService: AuthService
  ){}

  onSubmit = async ({email, password}) => {
    this.isLoad = true;
    const result: ResultModel = await this.authService.signIn(email, password);
    if (result.status) {
      window.alert(result.message);
    }
    this.isLoad = false;
  }
}
