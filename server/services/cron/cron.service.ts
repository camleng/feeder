import * as shell from 'shelljs';
import { readFile, writeFile } from '../file/file.service';

const crontabCmd = 'crontab -l | grep -e leo-feeder';
const crontabTempPath = '/tmp/crontab';

export function getEntries() {
    return shell.exec(crontabCmd, { silent: true })
        .stdout
        .split('\n')
        .filter(removeEmpty);
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

export function toTime(entry: string): string[] {
    var regexp = /(\d{1,2})\s+(\d{1,2}).*leo-feeder.*/;
    let matches = regexp.exec(entry);
    return matches
        ? matches.slice(1, 3)
        : [];
}

export function removeFromArray(item: string, array: string[]): string[] {
    const index = array.indexOf(item);
    array.splice(index, 1);
    return array;
}

export function installNewCrontab() {
    shell.exec(`crontab ${crontabTempPath}`);
}

export function copyEntriesToTempFile() {
    shell.exec(`crontab -l > ${crontabTempPath}`);
}

export function addEntries(data: Buffer | string, cronEntries: string[]): string[] {
    const originalEntries = getOriginalEntries(data);
    return Array.from(new Set(originalEntries.concat(cronEntries)));
}

export function getOriginalEntries(data): string[] {
    let entries = split(data);
    return entries.filter(removeFeederEntries);
}

export function split(data: Buffer): string[] {
    return data.toString().split('\n').filter(removeEmpty);
}

export function removeFeederEntries(entry) {
    return toTime(entry).length === 0;
}

export async function writeLines(lines: string[]) {
    const content = lines.join('\n') + '\n';
    await writeFile(crontabTempPath, content);
}

export function removeEmpty(entry: string) {
    return entry !== '';
}