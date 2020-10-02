import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';
import { ResultModel } from '../../models';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isError: boolean;
  message: string;

  constructor(
      private authService: AuthService
  ){}

  ngOnInit() {}

  onSubmit = async ({email, password}) => {
    const result: ResultModel = await this.authService.signIn(email, password);
    if (result.status) {
      window.alert(result.message);
    }
  }

}