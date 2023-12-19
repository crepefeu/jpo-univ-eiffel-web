import { Component, Input, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { ManageListTypes } from 'src/app/enums/manageListTypes.enum';
import { ModalService } from 'src/app/services/modal.service';
import { AddAttendeeFormComponent } from '../add-attendee-form/add-attendee-form.component';

@Component({
  selector: 'app-manage-list',
  templateUrl: './manage-list.component.html',
  styleUrls: ['./manage-list.component.scss']
})
export class ManageListComponent implements OnInit {

  @Input() originalData: any[] = [];
  @Input() listType?: ManageListTypes;

  data: any[] = [];
  searchString: string = "";

  constructor(private search: SearchService,
    private modalService: ModalService) {
    this.search.getSearchString.subscribe((string: string) => this.searchString = string);
  }

  ngOnInit(): void {
    this.data = this.originalData;
  }

  closeDropDown(dropdownList: HTMLDivElement) {
    dropdownList.classList.remove('show');
  }

  toggleDropdown(dropdownList: HTMLDivElement) {
    dropdownList.classList.toggle('show');
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

  onFilterChange(key: string) {
    if (key === 'all') {
      this.data = this.originalData;
    } else if (key === 'irl') {
      this.data = this.originalData.filter((attendee: any) => attendee.isIrlAttendee);
    } else if (key === 'dist') {
      this.data = this.originalData.filter((attendee: any) => !attendee.isIrlAttendee);
    }
  }

  updateSearchString(string: string) {
    this.search.setSearchString(string);
  }

  openAddModal() { 
    this.modalService.open(AddAttendeeFormComponent, {
      title: 'Ajouter un participant',
      animations: {
        modal: {
          enter: 'enter-scaling 0.1s ease-out',
          leave: 'exit-scaling 0.1s ease-out',
        },
        overlay: {
          enter: 'fade-in 0.1s',
          leave: 'fade-out 0.1s forwards',
        },
      },
      size: {
        width: '80vw',
        height: '80vh',
      }
    });
  }

  openUpdateModal() { 
    this.modalService.open(AddAttendeeFormComponent, {
      title: 'Modifier le participant',
      animations: {
        modal: {
          enter: 'enter-scaling 0.1s ease-out',
          leave: 'exit-scaling 0.1s ease-out',
        },
        overlay: {
          enter: 'fade-in 0.1s',
          leave: 'fade-out 0.1s forwards',
        },
      },
      size: {
        width: '80vw',
        height: '80vh',
      }
    });
  }

  close() {
    this.modalService.close();
  }
}
