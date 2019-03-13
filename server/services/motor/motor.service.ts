import { broadcast } from '../socket/socket.service';
import { Status } from '../../models/status';
import * as shell from 'shelljs';

export function turnMotor() {
    broadcast(Status.Turning);
    shell.exec(`${process.env.PYTHON} ${process.env.FEEDER}`,
        { async: true, silent: true },
        () => broadcast(Status.Finished));
}