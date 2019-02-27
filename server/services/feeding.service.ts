import { Feeding } from "../models/feeding";
import { getEntries, toEntry, scheduleJobs, deleteEntry } from "./cron.service";
import { Period } from "../models/period";

export function getFeedings(): Feeding[] {
    var times = getEntries().map(toEntry)
    return times.map(toFeeding).sort(byTime);
}

export function scheduleFeedings(feedings: Feeding[]) {
    let cronEntries = feedings.map(feeding => {
        if(isMidnight(feeding))
            feeding.hour = 0;
        else if (isPM(feeding))
            feeding.hour += 12
        return buildCronEntry(feeding);
    });
    scheduleJobs(cronEntries);
}

export function deleteFeeding(feeding: Feeding) {
    const entry = buildCronEntry(feeding);
    deleteEntry(entry)
}

function isMidnight(feeding: Feeding) {
    return Number(feeding.hour) === 12 
        && Number(feeding.minute) === 0
        && Number(feeding.period) === Period.AM;
}

function isPM(feeding: Feeding): boolean {
    return Number(feeding.period) === Period.PM
}

export function buildCronEntry(feeding: Feeding) {
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