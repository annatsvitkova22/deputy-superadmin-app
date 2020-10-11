import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DeputyService } from './create-deputy.service';
import { Information, ResultModel } from '../../models';

@Component({
  selector: 'app-create-deputy',
  templateUrl: './create-deputy.component.html',
  styleUrls: ['./create-deputy.component.scss']
})
export class CreateDeputyComponent implements OnInit {
  isError: boolean;
  message: string;
  districts: Information[];
  parties: Information[];
  isLoad: boolean = true;
  isLoadDeputy: boolean;
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

  async ngOnInit(): Promise<void> {
    this.districts = await this.deputyService.getDistricts();
    this.parties = await this.deputyService.getParties();
    this.isLoad = false;
  }

  onSubmit = async () => {
    this.isLoadDeputy = true;
    this.form.disable();
    const res: ResultModel = await this.deputyService.createDeputy(this.form.value);
    if (res.status) {
      window.alert('Зареєстровано');
      this.form.reset();
    } else {
      this.isError = true;
      this.message = res.message;
    }
    this.isLoadDeputy = false;
    this.form.enable();
  }
}
