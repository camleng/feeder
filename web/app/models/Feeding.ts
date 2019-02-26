import { Period } from './Period';

export class Feeding {
    hour: number = 0;
    minute: number = 0;
    period: Period = Period.AM;
    showDelete: boolean = false;
}