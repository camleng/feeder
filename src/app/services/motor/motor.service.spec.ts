import { TestBed } from '@angular/core/testing';

import { MotorService } from './motor.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MotorService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [{ provide: 'BASE_URL', useValue: 'https://leofeeder.com/' }]
    }));

    it('should be created', () => {
        const service: MotorService = TestBed.get(MotorService);
        expect(service).toBeTruthy();
    });
});
