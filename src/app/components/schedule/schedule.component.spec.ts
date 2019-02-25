import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleComponent } from './schedule.component';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { Feeding } from 'src/app/models/Feeding';
import { Period } from 'src/app/models/Period';
import { of } from 'rxjs';

describe('ScheduleComponent', () => {
    let component: ScheduleComponent;
    let fixture: ComponentFixture<ScheduleComponent>;
    let scheduler: ScheduleService;
    let getFeedingTimes: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ScheduleComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScheduleComponent);
        component = fixture.componentInstance;
        scheduler = TestBed.get(ScheduleService);
        fixture.detectChanges();
    });

    beforeEach(() => {
        getFeedingTimes = spyOn(scheduler, 'getFeedingTimes').and.returnValue(of(getFeedings()));
    });

    describe('when initializing', () => {
        beforeEach(() => {
            component.ngOnInit();
        });

        it('calls the schedule service to get the feeding times', () => {
            expect(getFeedingTimes).toHaveBeenCalled();
        });

        describe('given the call to get the feedings is successful', () => {
            let feedings: Feeding[];

            beforeEach(() => {
                feedings = getFeedings();
            });

            it('sets the feedings', () => {
                expect(component.feedings).toEqual(feedings);
            });
        });
    });
});

function getFeedings(): Feeding[] {
    return <Feeding[]>[
        {
            hour: 8,
            minute: 0,
            period: Period.AM
        }
    ];
}
