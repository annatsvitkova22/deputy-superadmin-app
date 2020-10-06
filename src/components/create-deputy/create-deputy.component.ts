import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DeputyService } from './create-deputy.service';
import { District, Party, ResultModel } from '../../models';

@Component({
  selector: 'app-create-deputy',
  templateUrl: './create-deputy.component.html',
  styleUrls: ['./create-deputy.component.scss']
})
export class CreateDeputyComponent implements OnInit {
  isError: boolean;
  message: string;
  districts: District[];
  parties: Party[];
  isLoad: boolean = true;
  form = new FormGroup({
    email: new FormControl('', [Validators.required, , Validators.email]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    patronymic: new FormControl('', [Validators.required]),
    district: new FormControl(null, [Validators.required]),
    party: new FormControl(null, [Validators.required]),
  });

  constructor(
    private deputyService: DeputyService,
  ) { }

  async ngOnInit() {
    this.districts = await this.deputyService.getDistricts();
    this.parties = await this.deputyService.getParties();
    this.isLoad = false;
  }

  onSubmit = async () => {
    const res: ResultModel = await this.deputyService.createDeputy(this.form.value);
    this.isError = true;
    this.message = res.status ? 'Акаунт вже створено' : res.message;
  }
}
