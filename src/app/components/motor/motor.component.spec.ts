import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorComponent } from './motor.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MotorComponent', () => {
    let component: MotorComponent;
    let fixture: ComponentFixture<MotorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [MotorComponent],
            providers: [{ provide: 'BASE_URL', useValue: 'https://leofeeder.com/' }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MotorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
