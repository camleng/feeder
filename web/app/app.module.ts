import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MotorComponent } from './components/motor/motor.component';
import { HeaderComponent } from './components/header/header.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { TimePipe } from './pipes/time/time.pipe';

@NgModule({
    declarations: [
        AppComponent,
        MotorComponent,
        HeaderComponent,
        ScheduleComponent,
        TimePipe
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'feeder', pathMatch: 'full' },
            { path: 'feeder', component: MotorComponent },
            { path: 'schedule', component: ScheduleComponent },
            { path: '*', redirectTo: 'feeder', pathMatch: 'full' }
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
