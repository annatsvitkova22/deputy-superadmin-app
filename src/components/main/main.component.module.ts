import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MainRoutes } from './main.component.routing';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(MainRoutes),
    ],
    providers: []
})
export class MainComponentsModule {}
