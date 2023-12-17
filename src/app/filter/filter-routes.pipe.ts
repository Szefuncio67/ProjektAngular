import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRoutes'
})
export class FilterRoutesPipe implements PipeTransform {

  transform(list: any[], searchTerm: string): any {
    if (!searchTerm) {
      return list;
    }

    const filteredList = list.filter(trasa =>
      trasa.Nazwa.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredList;
  }

}
