import { Component, Input } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-manage-list',
  templateUrl: './manage-list.component.html',
  styleUrls: ['./manage-list.component.scss']
})
export class ManageListComponent {

  @Input() data: any[] = [];

  open = false;
  searchString: string = "";

  constructor(private search: SearchService) {
    this.search.getSearchString.subscribe((string: string) => this.searchString = string);
  }

  closeDropDown() {
  }
  closeOnClick() {
  }

  onOrderByChange(key: string) {
    if (key === 'asc') {
      this.data.sort(function (a, b) {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      });
    } else if (key === 'desc') {
      this.data.sort(function (a, b) {
        if (a.firstName < b.firstName) {
          return 1;
        }
        if (a.firstName > b.firstName) {
          return -1;
        }
        return 0;
      });
    }
  }

  updateSearchString(string: string) {
    this.search.setSearchString(string);
  }
}
