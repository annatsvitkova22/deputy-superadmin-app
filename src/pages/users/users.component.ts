import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { UsersService } from './users.service';
import { User, ResultModel } from '../../models';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
    users: User[];
    isLoad: boolean = true;
    isLoadCreate: boolean;
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
                title: 'Ім`я',
                type: 'string',
            },
            email: {
                title: 'Пошта',
                type: 'string',
                editable: false,
            },
            role: {
                title: 'Роль',
                type: 'string',
            },
            isDesabled: {
                title: 'Заблоковано',
                type: 'boolean',
                addable: false,
                editor: {
                    type: 'checkbox'
                }
            }
        },
    };

    source: LocalDataSource = new LocalDataSource();

    constructor(
        private usersService: UsersService,
    ) {}

    async ngOnInit() {
        this.users = await this.usersService.getUsers();
        this.source.load(this.users);
        this.isLoad = false;
    }

    async onDeleteConfirm(event) {
        if (window.confirm('Ви впевнені, що хочете видалити?')) {
            event.confirm.resolve();
            event.data.isDesabled = true;
            this.users = this.users.map(user => {
                if (user.id === event.data.id) {
                    return event.data;
                }
                return user;
            });
            this.source = new LocalDataSource(this.users);
            const result: ResultModel = await this.usersService.desibleUser(event.data.id);
            if (!result.status) {
                window.alert('Помилка мережі');
                event.data.isDesabled = false;
                this.users = this.users.map(user => {
                    if (user.id === event.data.id) {
                        return event.data;
                    }
                    return user;
                });
                this.source = new LocalDataSource(this.users);
            }
        } else {
            event.confirm.reject();
        }
    }

    async onCreateConfirm(event) {
        this.isLoadCreate = true;
        const {name, role, email} = event.newData;
        const isRole = this.checkRole(role);
        const isEmail = this.checkEmail(email);
        if (name && isRole && isEmail) {
            const result: ResultModel = await this.usersService.onCreateUser(event.newData);
            event.newData.isDesabled = false;
            event.newData.id = result.message;
            if (result.status) {
                this.users = [event.newData, ...this.users];
                this.source = new LocalDataSource(this.users);
            }
        } else {
            window.alert('Помилка заповнення полів');
        }
        this.isLoadCreate = false;
    }

    checkRole(role): boolean {
        let isRole: boolean = false
        if (role === 'user' || role === 'admin' || role === 'deputy') {
            isRole = true;
        }

        return isRole;
    }

    checkEmail(email): boolean {
        let isEmail: boolean = false;
        const pattern = '[A-Za-z0-9._%-+]+@[A-Za-z0-9._%-]+\\.[a-z]{2,20}';
        const result = email.match(pattern); 
        if (result) {
            isEmail = true;
        }

        return isEmail;
    }

    async onSaveConfirm(event): Promise<void> {
        const result: ResultModel = await this.usersService.editUser(event.newData);
        if (result.status) {
            this.users = this.users.map(user => {
                if (user.id === event.data.id) {
                    return event.newData;
                }
                return user;
            });
            this.source = new LocalDataSource(this.users);
        } else {
            window.alert('Помилка мережі');
        }
    }
}
