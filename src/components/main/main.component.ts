import { Component } from '@angular/core';


@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent {
    isSidebarActive: boolean;

    constructor(){}

    onActiveSidebar(isActive: boolean): void {
        this.isSidebarActive = isActive;
    }
}
