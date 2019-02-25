import * as shell from 'shelljs';
import * as express from 'express'
import { Status } from '../models/status';
import { broadcast } from '../services/socket';
let router = express.Router();

router.post('/', (req, res) => {
    turnMotor();
    res.send(JSON.stringify({ message: 'OK' }));
});

module.exports = router;

function turnMotor() {
    broadcast(Status.Turning);
    shell.exec(`${process.env.PYTHON} feeder.py`,
        { async: true, silent: true },
        () => broadcast(Status.Finished));
}
