import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'time'
})
export class TimePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        if (value !== null && value !== undefined)
            return value.toString().padStart(2, '0');
    }
}
