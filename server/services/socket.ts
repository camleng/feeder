import * as WebSocket from 'ws';
import { Status } from '../models/status';
import { Server } from 'http';

let wss: WebSocket.Server;

export function initializeWebSocketServer(server: Server) {
    wss = new WebSocket.Server({ server });
    
    wss.on('connection', ws => {
        ws.send(JSON.stringify({ status: Status.Connected }));
    });
}

export function broadcast(status: Status) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify({ status: status }));
    });
}
