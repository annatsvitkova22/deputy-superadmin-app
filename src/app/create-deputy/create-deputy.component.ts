import { Component, OnInit } from '@angular/core';
import { DeputyService } from './create-deputy.service';

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
    this.deputyService.createDeputy(data);
    console.log('data', data)
  }

}
