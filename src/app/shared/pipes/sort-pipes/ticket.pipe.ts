import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortTicket'
})
export class TicketPipe implements PipeTransform {

  transform(items: any[], field: string): any[] {
    if (!items) return [];

    if (field) items.sort((a, b) => a[field] > b[field] ? 1 : -1);
    else items.sort((a, b) => a > b ? 1 : -1);

    return items;
  }
}
