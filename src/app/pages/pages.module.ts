import { NgModule } from "@angular/core";
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';

import { FormsModule } from '@angular/forms'
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficadonaComponent } from '../components/graficadona/graficadona.component';


import { ChartsModule } from 'ng2-charts';
import { AccountSettingsComponent } from '../components/account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';


@NgModule({
    declarations:[
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficadonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent
    ],
    exports:[
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        GraficadonaComponent
    ],
    imports:[
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
    ]
})

export class PagesModule{}