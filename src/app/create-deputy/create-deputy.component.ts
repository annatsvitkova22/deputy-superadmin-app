import { Component, OnInit } from '@angular/core';
import { DeputyService } from './create-deputy.service';
import { ResultModel } from '../../models';

@Component({
  selector: 'app-create-deputy',
  templateUrl: './create-deputy.component.html',
  styleUrls: ['./create-deputy.component.scss']
})
export class CreateDeputyComponent {
  isError: boolean;
  message: string;

  constructor(
    private deputyService: DeputyService
  ) { }

  onSubmit = async (data) => {
    const res: ResultModel = await this.deputyService.createDeputy(data);
    this.isError = true;
    this.message = res.status ? 'Account was created' : res.message;
  }
}
