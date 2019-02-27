import * as express from 'express'
import { turnMotor } from '../services/motor.service';
let router = express.Router();

router.post('/', (req, res) => {
    turnMotor();
    res.json({ message: 'OK' });
});

module.exports = router;
