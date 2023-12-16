import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

    /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param searchText search string
   * @returns list of elements filtered by search text or []
   */
    transform(items: any[], searchText: string): any[] {
      if (!items) {
        return [];
      }
      if (searchText.length < 1) {
        return items;
      }
  
      return items.filter(item => {
        return Object.keys(item).some(key => {
          return String(item[key]).toLowerCase().includes(searchText.toLowerCase());
        });
      });
    }

}
