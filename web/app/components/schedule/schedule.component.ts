import { Component, OnInit } from '@angular/core';
import { Feeding } from 'web/app/models/Feeding';
import { ScheduleService } from 'web/app/services/schedule/schedule.service';
import { Period } from 'server/models/period';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
    feedings: Feeding[];
    periods: Period[];

    constructor(private scheduler: ScheduleService) { }

    ngOnInit() {
        this.periods = this.getPeriods();
        this.scheduler.getFeedingTimes().subscribe(feedings =>
            this.feedings = feedings);
    }

    addFeedingTime() {
        this.feedings.push(new Feeding);
    }

    scheduleFeedings() {
        let feedings = this.feedings.filter(this.removeIncomplete);
        console.log(feedings);

        this.scheduler.scheduleFeedings(feedings).subscribe();
    }

    removeIncomplete(feeding: Feeding) {
        return feeding.hour !== 0 || feeding.minute !== 0;
    }

    formatTimeComponent(component: number): string {
        if (component !== null)
            return component.toString().padStart(2, '0');
    }

    deleteFeeding(feeding: Feeding) {
        this.scheduler.delete(feeding).subscribe(() => {
            this.removeFromArray(feeding);
        });
    }

    removeFromArray(feeding: Feeding) {
        const index = this.feedings.indexOf(feeding);
        this.feedings.splice(index, 1);
    }

    getPeriods(): Period[] {
        return [Period.AM, Period.PM]
    }

    getPeriod(period: Period) {
        return Period[period];
    }
}
