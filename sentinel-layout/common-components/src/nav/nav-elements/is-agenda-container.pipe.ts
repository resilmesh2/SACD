import { Pipe, PipeTransform } from '@angular/core';
import { MenuElement, AgendaResolver } from '@sentinel/layout';

@Pipe({
  name: 'isAgendaContainer',
  standalone: true,
})
export class IsAgendaContainerPipe implements PipeTransform {
  transform(element: MenuElement): boolean {
    return AgendaResolver.isAgendaContainer(element);
  }
}
