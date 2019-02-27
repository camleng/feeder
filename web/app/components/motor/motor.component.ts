import { Component, OnInit, Inject } from '@angular/core';
import { Status } from 'web/app/models/Status';
import { MotorService } from 'web/app/services/motor/motor.service';

@Component({
    selector: 'app-motor',
    templateUrl: './motor.component.html',
    styleUrls: ['./motor.component.scss']
})
export class MotorComponent implements OnInit {
    socket: WebSocket;
    status = Status[Status.Disconnected];

    constructor(private motor: MotorService,
        @Inject('BASE_URL') private baseUrl: string) { }

    ngOnInit() {
        this.setupWebSocketConnection();
    }

    turn() {
        this.motor.turn().subscribe();
    }

    isTurning(): boolean {
        return this.status === Status[Status.Turning];
    }

    setupWebSocketConnection() {
        let socketUrl = this.buildSocketUrl();
        this.socket = new WebSocket(socketUrl);

        this.socket.onmessage = event => {
            let data = JSON.parse(event.data);
            this.status = Status[data.status];
        }

        this.socket.onclose = event => {
            setTimeout(function () {
                this.socket = new WebSocket(socketUrl);
            }, 1000);
        }
    }

    buildSocketUrl() {
        let middle = this.baseUrl.split(':')[1];
        return `wss:${middle}:8000`;
    }
}
