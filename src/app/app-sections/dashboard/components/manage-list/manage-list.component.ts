import { Attendee } from './../../../../models/attendee';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { ManageListTypes } from 'src/app/enums/manageListTypes.enum';
import { ModalService } from 'src/app/services/modal.service';
import { AddAttendeeFormComponent } from '../add-attendee-form/add-attendee-form.component';
import { ModifyAttendeeFormComponent } from '../modify-attendee-form/modify-attendee-form.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { AttendeesService } from 'src/app/services/attendees.service';
import { HotToastService } from '@ngneat/hot-toast';
import { AddDiplomaFormComponent } from '../add-diploma-form/add-diploma-form.component';
import { DiplomasService } from 'src/app/services/diplomas.service';
import { AddDiplomaCategoryFormComponent } from '../add-diploma-category-form/add-diploma-category-form.component';

@Component({
  selector: 'app-manage-list',
  templateUrl: './manage-list.component.html',
  styleUrls: ['./manage-list.component.scss']
})
export class ManageListComponent implements OnInit {

  @ViewChild('pagination') pagination?: PaginationComponent;

  @Input() originalData: any[] = [];
  @Input() listType?: ManageListTypes;
  @Input() isLoading?: boolean;

  data: any[] = [];
  searchString: string = "";

  constructor(private search: SearchService,
    private modalService: ModalService,
    private attendees: AttendeesService,
    private toast: HotToastService,
    private diplomas: DiplomasService) {
    this.search.getSearchString.subscribe((string: string) => this.searchString = string);
  }

  ngOnInit(): void {
    this.data = this.originalData;
  }

  closeDropDown(dropdownList: HTMLDivElement) {
    dropdownList.classList.remove('show');
  }

  toggleDropdown(dropdownList: HTMLDivElement) {
    // remove all other dropdowns
    const dropdowns = document.querySelectorAll('.dropdown-menu.show');
    dropdowns.forEach((dropdown: any) => {
      if (dropdown !== dropdownList) {
        dropdown.classList.remove('show');
      }
    });

    // toggle selected dropdown
    dropdownList.classList.toggle('show');
  }

  onOrderByChange(key: string) {
    if (key === 'asc') {
      this.data?.sort(function (a, b) {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      });
    } else if (key === 'desc') {
      this.data?.sort(function (a, b) {
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
      this.data = this.originalData?.filter((attendee: any) => attendee.isIrlAttendee);
    } else if (key === 'dist') {
      this.data = this.originalData?.filter((attendee: any) => !attendee.isIrlAttendee);
    }
  }

  updateSearchString(string: string) {
    this.search.setSearchString(string);
    this.pagination?.selectPageNumber(1);
  }

  openAddModal(entity?: string) {
    if (this.listType === ManageListTypes.Attendees) {
      this.modalService.open(AddAttendeeFormComponent, {
        title: 'Ajouter un participant',
        displayHeader: true,
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
          height: 'fit-content',
        }
      });
    } else if (this.listType === ManageListTypes.Diplomas) {
      if (entity === 'diploma') {
        this.modalService.open(AddDiplomaFormComponent, {
          title: 'Ajouter un diplôme',
          displayHeader: true,
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
            height: 'fit-content',
          }
        });
      } else if (entity === 'category') {
        this.modalService.open(AddDiplomaCategoryFormComponent, {
          title: 'Ajouter une catégorie',
          displayHeader: true,
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
            height: 'fit-content',
          }
        });
      }
    }
  }

  openModifyModal(item: any) {
    if (this.listType === ManageListTypes.Attendees) {
      this.modalService.open(ModifyAttendeeFormComponent, {
        title: 'Modifier le participant',
        displayHeader: true,
        data: {
          listItem: item
        },
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
          height: 'fit-content',
        }
      });
    } else if (this.listType === ManageListTypes.Diplomas) {
      this.modalService.open(ModifyAttendeeFormComponent, {
        title: 'Modifier le diplôme',
        displayHeader: true,
        data: {
          listItem: item
        },
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
          height: 'fit-content',
        }
      });
    }
  }

  close() {
    this.modalService.close();
  }

  deleteItem(itemId: number) {
    if (this.listType === ManageListTypes.Attendees) {
      this.attendees.deleteAttendee(itemId).subscribe({
        next: data => {
          if (data.status == 'error') {
            this.toast.error(data.message, {
              duration: 4000,
              position: 'bottom-center',
              style: {
                backgroundColor: 'var(--toast-bkg)',
                color: 'var(--toast-txt)',
                borderRadius: '30px',
                border: '1.5px solid var(--toast-error)',
                fontWeight: '400',
                padding: '3px 10px'
              }
            });
          } else if (data.status == 'success') {
            this.toast.success(data.message, {
              duration: 4000,
              position: 'bottom-center',
              style: {
                backgroundColor: 'var(--toast-bkg)',
                color: 'var(--toast-txt)',
                borderRadius: '30px',
                border: '1.5px solid var(--toast-success)',
                fontWeight: '400',
                padding: '3px 10px'
              }
            });
            this.deleteItemFromList(itemId);
          }
        },
        error: err => this.toast.error('Une erreur est survenue', {
          duration: 4000,
          position: 'bottom-center',
          style: {
            backgroundColor: 'var(--toast-bkg)',
            color: 'var(--toast-txt)',
            borderRadius: '30px',
            border: '1.5px solid var(--toast-error)',
            fontWeight: '400',
            padding: '3px 10px'
          }
        }),
      });
    } else if (this.listType === ManageListTypes.Diplomas) {
      this.diplomas.deleteDiploma(itemId).subscribe({
        next: data => {
          if (data.status == 'error') {
            this.toast.error(data.message, {
              duration: 4000,
              position: 'bottom-center',
              style: {
                backgroundColor: 'var(--toast-bkg)',
                color: 'var(--toast-txt)',
                borderRadius: '30px',
                border: '1.5px solid var(--toast-error)',
                fontWeight: '400',
                padding: '3px 10px'
              }
            });
          } else if (data.status == 'success') {
            this.toast.success(data.message, {
              duration: 4000,
              position: 'bottom-center',
              style: {
                backgroundColor: 'var(--toast-bkg)',
                color: 'var(--toast-txt)',
                borderRadius: '30px',
                border: '1.5px solid var(--toast-success)',
                fontWeight: '400',
                padding: '3px 10px'
              }
            });
            this.deleteItemFromList(itemId);
          }
        },
        error: err => this.toast.error('Une erreur est survenue', {
          duration: 4000,
          position: 'bottom-center',
          style: {
            backgroundColor: 'var(--toast-bkg)',
            color: 'var(--toast-txt)',
            borderRadius: '30px',
            border: '1.5px solid var(--toast-error)',
            fontWeight: '400',
            padding: '3px 10px'
          }
        }),
      });
    } else if (this.listType === ManageListTypes.DiplomaCategories) {
      this.diplomas.deleteDiplomaCategory(itemId).subscribe({
        next: data => {
          if (data.status == 'error') {
            this.toast.error(data.message, {
              duration: 4000,
              position: 'bottom-center',
              style: {
                backgroundColor: 'var(--toast-bkg)',
                color: 'var(--toast-txt)',
                borderRadius: '30px',
                border: '1.5px solid var(--toast-error)',
                fontWeight: '400',
                padding: '3px 10px'
              }
            });
          } else if (data.status == 'success') {
            this.toast.success(data.message, {
              duration: 4000,
              position: 'bottom-center',
              style: {
                backgroundColor: 'var(--toast-bkg)',
                color: 'var(--toast-txt)',
                borderRadius: '30px',
                border: '1.5px solid var(--toast-success)',
                fontWeight: '400',
                padding: '3px 10px'
              }
            });
            this.deleteItemFromList(itemId);
          }
        },
        error: err => this.toast.error('Une erreur est survenue', {
          duration: 4000,
          position: 'bottom-center',
          style: {
            backgroundColor: 'var(--toast-bkg)',
            color: 'var(--toast-txt)',
            borderRadius: '30px',
            border: '1.5px solid var(--toast-error)',
            fontWeight: '400',
            padding: '3px 10px'
          }
        }),
      });
    }
  }

  deleteItemFromList(itemId: number) {
    this.originalData = this.originalData?.filter((item: any) => item.id !== itemId);
    this.data = this.data?.filter((item: any) => item.id !== itemId);
  }
}
