import * as shell from 'shelljs';
import { readFile, writeFile } from '../services/file';

const crontabCmd = 'crontab -l | grep -e leo-feeder';
const crontabTempPath = '/tmp/crontab';

export function getEntries() {
    return shell.exec(crontabCmd, { silent: true })
        .stdout
        .split('\n')
        .filter(removeEmpty);
}

export function toEntry(entry: string): string[] {
    var regexp = /(\d{1,2})\s+(\d{1,2}).*leo-feeder.*/;
    let matches = regexp.exec(entry);
    return matches 
        ? matches.slice(1, 3) 
        : [];
}

export async function scheduleJobs(cronEntries: string[]) {
    copyEntriesToTempFile();
    const data = await readFile(crontabTempPath);
    const entries = addEntries(data, cronEntries);
    await writeLines(entries);
    installNewCrontab();
}

export async function deleteEntry(entry: string) {
    copyEntriesToTempFile();
    const data = await readFile(crontabTempPath);
    let entries = split(data);
    entries = removeFromArray(entry, entries);
    await writeLines(entries);
    installNewCrontab();
}

function removeFromArray(item: string, array: string[]): string[] {
    const index = array.indexOf(item);
    array.splice(index, 1);
    return array;
}

function installNewCrontab() {
    shell.exec(`crontab ${crontabTempPath}`);
}

function copyEntriesToTempFile() {
    shell.exec(`crontab -l > ${crontabTempPath}`);
}

function addEntries(data: Buffer | string, cronEntries: string[]): string[] {
    const originalEntries = getOriginalEntries(data);
    return Array.from(new Set(originalEntries.concat(cronEntries)));
}

function getOriginalEntries(data): string[] {
    let entries = split(data);
    return entries.filter(removeFeederEntries);
}

function split(data: Buffer): string[] {
    return data.toString().split('\n').filter(removeEmpty);
}

function removeFeederEntries(entry) {
    return toEntry(entry).length === 0;
}

async function writeLines(lines: string[]) {
    await writeFile(crontabTempPath, lines.join('\n'));
}

function removeEmpty(entry: string) {
    return entry !== '';
}
