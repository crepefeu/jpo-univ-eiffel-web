import { defaultErrorToastConfig, defaultSuccessToastConfig } from './../../../../configs/default-toast.configs';
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
import { ModifyDiplomaFormComponent } from '../modify-diploma-form/modify-diploma-form.component';
import { ModifyDiplomaCategoryFormComponent } from '../modify-diploma-category-form/modify-diploma-category-form.component';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-manage-list',
  templateUrl: './manage-list.component.html',
  styleUrls: ['./manage-list.component.scss']
})
export class ManageListComponent implements OnInit {

  @ViewChild('pagination') pagination!: PaginationComponent;

  @Input() originalData: any[] = [];
  @Input() listType?: ManageListTypes;
  @Input() isLoading?: boolean;

  isHandheld = false;

  data: any[] = [];
  searchString: string = "";
  pageSize = 10;

  constructor(private search: SearchService,
    private modalService: ModalService,
    private attendees: AttendeesService,
    private toast: HotToastService,
    private diplomas: DiplomasService,
    private responsive: BreakpointObserver) {
    this.responsive.observe('(max-width: 500px)').subscribe(result => {
      this.isHandheld = result.matches;
      this.pageSize = this.isHandheld ? 5 : 10;
    });
    this.search.getSearchString.subscribe((string: string) => this.searchString = string);
  }

  ngOnInit(): void {
    this.data = this.originalData;
  }

  closeDropDown(dropdownList: HTMLDivElement) {
    dropdownList.classList.remove('show');
  }

  close() {
    this.modalService.close();
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
      if (!this.isHandheld) {
        this.modalService.open(AddAttendeeFormComponent, {
          ...this.modalService.modalConfig,
          title: 'Ajouter un participant'
        });
      } else {
        this.modalService.open(AddAttendeeFormComponent, {
          ...this.modalService.drawerConfig,
          title: 'Ajouter un participant',
        });
      }
    } else if (this.listType === ManageListTypes.Diplomas || this.listType === ManageListTypes.DiplomaCategories) {
      if (entity === 'diploma') {
        if (!this.isHandheld) {
          this.modalService.open(AddDiplomaFormComponent, {
            ...this.modalService.modalConfig,
            title: 'Ajouter un diplôme'
          });
        } else {
          this.modalService.open(AddDiplomaFormComponent, {
            ...this.modalService.drawerConfig,
            title: 'Ajouter un diplôme',
          });
        }
      } else if (entity === 'category') {
        if (!this.isHandheld) {
          this.modalService.open(AddDiplomaCategoryFormComponent, {
            ...this.modalService.modalConfig,
            title: 'Ajouter une catégorie'
          });
        } else {
          this.modalService.open(AddDiplomaCategoryFormComponent, {
            ...this.modalService.drawerConfig,
            title: 'Ajouter une catégorie',
          });
        }
      }
    }
  }

  openModifyModal(item: any) {
    if (this.listType === ManageListTypes.Attendees) {
      if (!this.isHandheld) {
        this.modalService.open(ModifyAttendeeFormComponent, {
          ...this.modalService.modalConfig,
          title: 'Modifier le participant',
          data: {
            item
          }
        });
      } else {
        this.modalService.open(ModifyAttendeeFormComponent, {
          ...this.modalService.drawerConfig,
          title: 'Modifier le participant',
          data: {
            item
          }
        });
      }
    } else if (this.listType === ManageListTypes.Diplomas) {
      if (!this.isHandheld) {
        this.modalService.open(ModifyDiplomaFormComponent, {
          ...this.modalService.modalConfig,
          title: 'Modifier le diplôme',
          data: {
            item
          }
        });
      } else {
        this.modalService.open(ModifyDiplomaFormComponent, {
          ...this.modalService.drawerConfig,
          title: 'Modifier le diplôme',
          data: {
            item
          }
        });
      }
    } else if (this.listType === ManageListTypes.DiplomaCategories) {
      if (!this.isHandheld) {
        this.modalService.open(ModifyDiplomaCategoryFormComponent, {
          ...this.modalService.modalConfig,
          title: 'Modifier la catégorie',
          data: {
            item
          }
        });
      } else {
        this.modalService.open(ModifyDiplomaCategoryFormComponent, {
          ...this.modalService.drawerConfig,
          title: 'Modifier la catégorie',
          data: {
            item
          }
        });
      }
    }
  }

  deleteItem(itemId: number) {
    if (this.listType === ManageListTypes.Attendees) {
      this.attendees.deleteAttendee(itemId).subscribe({
        next: data => {
          if (data.status == 'error') {
            if (this.isHandheld) {
              this.toast.error(data.message, {
                ...defaultErrorToastConfig,
                style: {
                  ...defaultErrorToastConfig.style,
                  fontSize: '0.8rem',
                  position: 'absolute',
                  bottom: '65px',
                }
              });
            } else {
              this.toast.error('Une erreur est survenue', {
                ...defaultErrorToastConfig
              });
            }
          } else if (data.status == 'success') {
            if (this.isHandheld) {
              this.toast.success(data.message, {
                ...defaultSuccessToastConfig,
                style: {
                  ...defaultSuccessToastConfig.style,
                  fontSize: '0.8rem',
                  position: 'absolute',
                  bottom: '65px',
                }
              });
            } else {
              this.toast.success(data.message, {
                ...defaultSuccessToastConfig
              });
            }
            this.deleteItemFromList(itemId);
            this.modalService.closeConfirmationModal();
          }
        },
        error: err => {
          if (this.isHandheld) {
            this.toast.error('Une erreur est survenue', {
              ...defaultErrorToastConfig,
              style: {
                ...defaultErrorToastConfig.style,
                fontSize: '0.8rem',
                position: 'absolute',
                bottom: '65px',
              }
            });
          } else {
            this.toast.error('Une erreur est survenue', {
              ...defaultErrorToastConfig
            });
          }
        }
      });
    } else if (this.listType === ManageListTypes.Diplomas) {
      this.diplomas.deleteDiploma(itemId).subscribe({
        next: data => {
          if (data.status == 'error') {
            if (this.isHandheld) {
              this.toast.error(data.message, {
                ...defaultErrorToastConfig,
                style: {
                  ...defaultErrorToastConfig.style,
                  fontSize: '0.8rem',
                  position: 'absolute',
                  bottom: '65px',
                }
              });
            } else {
              this.toast.error(data.message, {
                ...defaultErrorToastConfig
              });
            }
          } else if (data.status == 'success') {
            if (this.isHandheld) {
              this.toast.success(data.message, {
                ...defaultSuccessToastConfig,
                style: {
                  ...defaultSuccessToastConfig.style,
                  fontSize: '0.8rem',
                  position: 'absolute',
                  bottom: '65px',
                }
              });
            } else {
              this.toast.success(data.message, {
                ...defaultSuccessToastConfig
              });
            }
            this.deleteItemFromList(itemId);
            this.modalService.closeConfirmationModal();
          }
        },
        error: err => {
          if (this.isHandheld) {
            this.toast.error('Une erreur est survenue', {
              ...defaultErrorToastConfig,
              style: {
                ...defaultErrorToastConfig.style,
                fontSize: '0.8rem',
                position: 'absolute',
                bottom: '65px',
              }
            });
          } else {
            this.toast.error('Une erreur est survenue', {
              ...defaultErrorToastConfig
            });
          }
        },
      });
    } else if (this.listType === ManageListTypes.DiplomaCategories) {
      this.diplomas.deleteDiplomaCategory(itemId).subscribe({
        next: data => {
          if (data.status == 'error') {
            if (this.isHandheld) {
              this.toast.error(data.message, {
                ...defaultErrorToastConfig,
                style: {
                  ...defaultErrorToastConfig.style,
                  fontSize: '0.8rem',
                  position: 'absolute',
                  bottom: '65px',
                }
              });
            } else {
              this.toast.error(data.message, {
                ...defaultErrorToastConfig
              });
            }
          } else if (data.status == 'success') {
            if (this.isHandheld) {
              this.toast.success(data.message, {
                ...defaultSuccessToastConfig,
                style: {
                  ...defaultSuccessToastConfig.style,
                  fontSize: '0.8rem',
                  position: 'absolute',
                  bottom: '65px',
                }
              });
            } else {
              this.toast.success(data.message, {
                ...defaultSuccessToastConfig
              });
            }
            this.deleteItemFromList(itemId);
            this.modalService.closeConfirmationModal();
          }
        },
        error: err => {
          if (this.isHandheld) {
            this.toast.error('Une erreur est survenue', {
              ...defaultErrorToastConfig,
              style: {
                ...defaultErrorToastConfig.style,
                fontSize: '0.8rem',
                position: 'absolute',
                bottom: '65px',
              }
            });
          } else {
            this.toast.error('Une erreur est survenue', {
              ...defaultErrorToastConfig
            });
          }
        }
      });
    }
  }

  deleteItemFromList(itemId: number) {
    this.originalData = this.originalData?.filter((item: any) => item.id !== itemId);
    this.data = this.data?.filter((item: any) => item.id !== itemId);
  }

  openConfirmationModal(itemId: number) {
    if (this.listType === ManageListTypes.Attendees) {
      if (!this.isHandheld) {
        this.modalService.openConfirmationModal({
          ...this.modalService.modalConfig,
          title: 'Supprimer le participant',
          confirmationSentence: 'Êtes-vous sûr de vouloir supprimer ce participant ?',
          confirmationLabel: 'Supprimer',
          onConfirm: () => this.deleteItem(itemId),
          size: {
            width: 'fit-content',
          }
        });
      } else {
        this.modalService.openConfirmationModal({
          ...this.modalService.drawerConfig,
          title: 'Supprimer le participant',
          confirmationSentence: 'Êtes-vous sûr de vouloir supprimer ce participant ?',
          confirmationLabel: 'Supprimer',
          onConfirm: () => this.deleteItem(itemId),
        });
      }
    } else if (this.listType === ManageListTypes.Diplomas) {
      if (!this.isHandheld) {
        this.modalService.openConfirmationModal({
          ...this.modalService.modalConfig,
          title: 'Supprimer le diplôme',
          confirmationSentence: 'Êtes-vous sûr de vouloir supprimer ce diplôme ?',
          confirmationLabel: 'Supprimer',
          onConfirm: () => this.deleteItem(itemId),
          size: {
            width: 'fit-content',
          }
        });
      } else {
        this.modalService.openConfirmationModal({
          ...this.modalService.drawerConfig,
          title: 'Supprimer le diplôme',
          confirmationSentence: 'Êtes-vous sûr de vouloir supprimer ce diplôme ?',
          confirmationLabel: 'Supprimer',
          onConfirm: () => this.deleteItem(itemId)
        });
      }
    } else if (this.listType === ManageListTypes.DiplomaCategories) {
      if (!this.isHandheld) {
        this.modalService.openConfirmationModal({
          ...this.modalService.modalConfig,
          title: 'Supprimer la catégorie',
          confirmationSentence: 'Êtes-vous sûr de vouloir supprimer cette catégorie ?',
          confirmationLabel: 'Supprimer',
          onConfirm: () => this.deleteItem(itemId),
          size: {
            width: 'fit-content',
          }
        });
      } else {
        this.modalService.openConfirmationModal({
          ...this.modalService.drawerConfig,
          title: 'Supprimer la catégorie',
          confirmationSentence: 'Êtes-vous sûr de vouloir supprimer cette catégorie ?',
          confirmationLabel: 'Supprimer',
          onConfirm: () => this.deleteItem(itemId),
        });
      }
    }
  }
}
