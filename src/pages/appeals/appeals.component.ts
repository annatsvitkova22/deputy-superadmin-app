import { Component, OnInit, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { ResultModel, Information, Appeal } from '../../models';
import { AppealsService } from './appeals.service';

@Component({
    selector: 'app-appeals',
    templateUrl: './appeals.component.html',
})
export class AppealsComponent implements OnInit {
    appeals: Appeal[];
    // tslint:disable-next-line: no-inferrable-types
    isLoad: boolean = true;
    settings = {
        add: false,
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
                editable: false,
            },
            title: {
                title: ' Заголовок',
                type: 'string',
            },
            description: {
                title: 'Опис',
                type: 'string',
            },
            status: {
                title: 'Статус',
                type: 'string',
                editable: false,
            },
            userId: {
                title: 'id користувача',
                type: 'string',
                editable: false,
            },
            deputyId: {
                title: 'id депутата',
                type: 'string',
                editable: false,
            },
        },
    };

    source: LocalDataSource = new LocalDataSource();

    constructor(
        private appealsService: AppealsService
    ) {}

    async ngOnInit(): Promise<void> {
        this.appeals = await this.appealsService.getAllAppeals();
        this.source.load(this.appeals);
        this.isLoad = false;
    }

    async onDeleteConfirm(event): Promise<void> {
        if (window.confirm('Ви впевнені, що хочете видалити?')) {
            event.confirm.resolve();
            const result: ResultModel = await this.appealsService.deleteAppeal(event.data.id);
            if (!result.status) {
                window.alert('Помилка мережі');
            } else {
                this.appeals = this.appeals.filter(info => info.id !== event.data.id);
                this.source = new LocalDataSource(this.appeals);
            }
        } else {
            event.confirm.reject();
        }
    }

    async onSaveConfirm(event): Promise<void> {
        const result: ResultModel = await this.appealsService.editAppeal(event.newData.id, event.newData.title, event.newData.description);
        if (result.status) {
            this.appeals = this.appeals.map(info => {
                if (info.id === event.data.id) {
                    return event.newData;
                }
                return info;
            });
            this.source = new LocalDataSource(this.appeals);
        } else {
            window.alert('Помилка мережі');
        }
    }
}
