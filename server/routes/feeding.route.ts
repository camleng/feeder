import * as express from 'express';
import { getFeedings, scheduleFeedings, deleteFeeding } from '../services/feeding/feeding.service';
let router = express.Router();

router.get('/', (req, res) => {
    res.json(getFeedings());
});

router.put('/', (req, res) => {
    scheduleFeedings(req.body);
    res.json({ status: 200 });
});

router.post('/delete', (req, res) => {
    deleteFeeding(req.body);
    res.json({ status: 200 });
});

module.exports = router;
