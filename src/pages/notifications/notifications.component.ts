import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Slick } from 'ngx-slickjs';

import { NotificationsService } from './notificatons.service';
import { ConfirmAppealGroup, ResultModel, Appeal } from '../../models';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
    messages: ConfirmAppealGroup[];
    appeals: Appeal[];
    isLoad: boolean = true;
    config: Slick.Config = {
        infinite: false,
        slidesToShow: 1,
        swipeToSlide: true,
        arrows: false,
        variableWidth: true,
        slidesToScroll: 1,
        dots: false,
        autoplaySpeed: 500 ,
    };
    constructor(
        private notificationsService: NotificationsService
    ) {}

    async ngOnInit(): Promise<void> {
        this.messages = await this.notificationsService.getConfirmAppeal();
        this.appeals = await this.notificationsService.getBlockAppeal();
        this.isLoad = false;
    }

    async onApprove(id: string): Promise<void> {
        const result: ResultModel  = await this.notificationsService.approveAppeal(id);
        if (result.status) {
            this.messages = this.messages.filter(message => message.confirm.id !== id);
        } else {
            window.alert(result.message);
        }
    }

    onReject(id: string): void {
        this.messages.map(message => {
            if (message.confirm.id === id) {
                message.isReject = true;
                return message;
            } else {
                return message;
            }
        });
    }

    async onComment(message: ConfirmAppealGroup, value: string): Promise<void> {
        const result: ResultModel = await this.notificationsService.sendComent(message.appeal.deputyId, value, message.confirm.appealId);
        if (result.status) {
            this.messages.map(mes => {
                if (mes.confirm.id === message.confirm.id) {
                    mes.confirm.isRead = true;
                    return mes;
                } else {
                    return mes;
                }
            });
            this.notificationsService.confirmIsRead(message.confirm.id)
        } else {
            window.alert('Помилка мережі');
        }
    }

    async onApproveAppeal(id: string): Promise<void> {
        const result: ResultModel  = await this.notificationsService.onReadAppeal(id);
        if (result.status) {
            this.appeals.map(appeal => {
                if (appeal.id === id) {
                    appeal.isRead = true;
                    return appeal;
                } else {
                    return appeal;
                }
            });
        } else {
            window.alert(result.message);
        }
    }

    async onReturnAppeal(id: string): Promise<void> {
        const result: ResultModel  = await this.notificationsService.returnAppeal(id);
        if (result.status) {
            this.appeals = this.appeals.filter(appeal => appeal.id !== id);
        } else {
            window.alert(result.message);
        }
    }
}
