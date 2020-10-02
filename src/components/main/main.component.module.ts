import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MainRoutes } from './main.component.routing';

@NgModule({
    imports: [
        RouterModule.forChild(MainRoutes),
    ],
    declarations: [
    ]
})
export class MainComponentsModule {}
