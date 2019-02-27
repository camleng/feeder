import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MotorService {
    ws: WebSocket;

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

    turn(): Observable<any> {
        let url = this.stripTrailingSlash();
        return this.http.post(`${url}/api/turn`, null);
    } 

    stripTrailingSlash(): string {
        if (this.lastCharacterIsSlash())
            return this.baseUrl.slice(0, -1);
    }

    lastCharacterIsSlash() {
        return this.baseUrl[this.baseUrl.length - 1] === '/';
    }
}
