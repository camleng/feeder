import { Injectable, Inject } from '@angular/core';
import { Feeding } from 'web/app/models/Feeding';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ScheduleService {
    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

    getFeedingTimes(): Observable<Feeding[]> {
        let url = this.buildUrl();
        return this.http.get<Feeding[]>(`${url}/api/feedings`);
    }

    scheduleFeedings(feedings: Feeding[]): Observable<any> {
        let url = this.buildUrl();
        return this.http.put(`${url}/api/feedings`, feedings);
    }

    delete(feeding: Feeding): Observable<any> {
        let url = this.buildUrl();
        return this.http.post(`${url}/api/feedings/delete`, feeding);
    }

    buildUrl(): string {
        if (this.lastCharacterIsSlash())
            return this.baseUrl.slice(0, -1);
    }

    lastCharacterIsSlash() {
        return this.baseUrl[this.baseUrl.length - 1] === '/';
    }
}
