import { Component, OnInit, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { ResultModel, Information } from '../../models';
import { DeputyService } from '../create-deputy/create-deputy.service';

@Component({
    selector: 'app-information',
    templateUrl: './information.component.html',
})
export class InformationComponent implements OnInit {
    information: Information[];
    // tslint:disable-next-line: no-inferrable-types
    isLoad: boolean = true;
    @Input() type: string;
    settings = {
        add: {
            confirmCreate: true,
            addButtonContent: '<i class="material-icons">add</i>',
            createButtonContent: '<i class="material-icons">check</i>',
            cancelButtonContent: '<i class="material-icons">close</i>',
        },
        edit: {
            confirmSave: true,
            editButtonContent: '<i class="material-icons">edit</i>',
            saveButtonContent: '<i class="material-icons">save</i>',
            cancelButtonContent: '<i class="material-icons">close</i>',
        },
        delete: {
            confirmDelete: true,
            deleteButtonContent: '<i class="material-icons">delete</i>',
        },
        columns: {
            id: {
                title: 'ID',
                type: 'string',
                addable: false,
                editable: false,
            },
            name: {
                title: ' Назва',
                type: 'string',
            },
        },
    };

    source: LocalDataSource = new LocalDataSource();

    constructor(
        private deputyService: DeputyService
    ) {}

    async ngOnInit(): Promise<void> {
        if (this.type === 'parties') {
            this.information = await this.deputyService.getParties();
        } else {
            this.information = await this.deputyService.getDistricts();
        }
        this.source.load(this.information);
        this.isLoad = false;
    }

    async onDeleteConfirm(event): Promise<void> {
        if (window.confirm('Ви впевнені, що хочете видалити?')) {
            event.confirm.resolve();
            const result: ResultModel = await this.deputyService.deleteInformation(event.data.id, this.type);
            if (!result.status) {
                window.alert('Помилка мережі');
            } else {
                this.information = this.information.filter(info => info.id !== event.data.id);
                this.source = new LocalDataSource(this.information);
            }
        } else {
            event.confirm.reject();
        }
    }

    async onCreateConfirm(event): Promise<void> {
        const {name} = event.newData;
        if (name) {
            const result: ResultModel = await this.deputyService.addInformation(name, this.type);
            if (result.status) {
                let newData = event.newData;
                newData = newData.id = result.message;
                this.information = [event.newData, ...this.information];
                this.source = new LocalDataSource(this.information);
            }
        } else {
            window.alert('Помилка заповнення полів');
        }
    }


    async onSaveConfirm(event): Promise<void> {
        const result: ResultModel = await this.deputyService.editInformation(event.newData.id, event.newData.name, this.type);
        if (result.status) {
            this.information = this.information.map(info => {
                if (info.id === event.data.id) {
                    return event.newData;
                }
                return info;
            });
            this.source = new LocalDataSource(this.information);
        } else {
            window.alert('Помилка мережі');
        }
    }
}
