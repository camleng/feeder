import * as express from 'express';
import { Feeding } from '../models/feeding';
import { Period } from '../models/period';
import { getEntries, toEntry, scheduleJobs, deleteEntry } from '../services/cron';
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

function getFeedings(): Feeding[] {
    var times = getEntries().map(toEntry)
    return times.map(toFeeding).sort(byTime);
}

function scheduleFeedings(feedings: Feeding[]) {
    let cronEntries = feedings.map(feeding => {
        if(isMidnight(feeding))
            feeding.hour = 0;
        else if (isPM(feeding))
            feeding.hour += 12
        return buildCronEntry(feeding);
    });
    scheduleJobs(cronEntries);
}

function isMidnight(feeding: Feeding) {
    return Number(feeding.hour) === 12 
        && Number(feeding.minute) === 0
        && Number(feeding.period) === Period.AM;
}

function isPM(feeding: Feeding): boolean {
    return Number(feeding.period) === Period.PM
}

function deleteFeeding(feeding: Feeding) {
    const entry = buildCronEntry(feeding);
    deleteEntry(entry)
}

function buildCronEntry(feeding: Feeding) {
    let scriptName = `${process.cwd()}/feeder.py`;
    return `${feeding.minute}\t${feeding.hour}\t*\t*\t*\t${process.env.PYTHON} ${scriptName}`;
}

function byTime(x: Feeding, y: Feeding) {
    if (x.period === y.period) {
        if (x.hour === y.hour)
            return x.minute - y.minute;
        return x.hour - y.hour;
    }

    return x.period - y.period;
}

function toFeeding(timeArray: string[]): Feeding {
    let [minute, hour] = timeArray.map(Number);
    let period = Period.AM;

    if (hour > 12) {
        hour -= 12;
        period = Period.PM
    }

    return {
        hour,
        minute,
        period
    };
}