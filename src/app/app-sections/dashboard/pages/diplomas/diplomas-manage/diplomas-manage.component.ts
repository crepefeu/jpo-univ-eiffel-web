import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { ManageListTypes } from 'src/app/enums/manageListTypes.enum';
import { Diploma } from 'src/app/models/diploma';
import { DiplomaCategory } from 'src/app/models/diplomaCategory';
import { DiplomasService } from 'src/app/services/diplomas.service';

@Component({
  selector: 'app-diplomas-manage',
  templateUrl: './diplomas-manage.component.html',
  styleUrls: ['./diplomas-manage.component.scss']
})
export class DiplomasManageComponent implements OnInit {

  listType = ManageListTypes.Diplomas;
  diplomasList?: Diploma[];
  diplomaCategoriesList?: DiplomaCategory[];
  isDiplomasLoading = false;
  isDiplomaCategoriesLoading = false;

  isSwitchToggled = false;

  constructor(private diplomas: DiplomasService,
    private toast: HotToastService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      if (params.get('listType') == 'diplomaCategories') {
        this.isSwitchToggled = true;
        this.listType = ManageListTypes.DiplomaCategories;
      } else {
        this.listType = ManageListTypes.Diplomas;
      }
    });

    this.isDiplomasLoading = true;
    this.diplomas.getAllDiplomas().subscribe({
      next: data => {
        this.diplomasList = data.sort((a: Diploma, b: Diploma) => a.category.name.localeCompare(b.category.name));
      },
      error: err => {
        this.toast.error('Une erreur est survenue', {
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
        this.isDiplomasLoading = false
      },
      complete: () => this.isDiplomasLoading = false
    });

    this.isDiplomaCategoriesLoading = true
    this.diplomas.getAllDiplomaCategoriesWithDiplomas().subscribe({
      next: data => {
        this.diplomaCategoriesList = data.sort((a: DiplomaCategory, b: DiplomaCategory) => a.name.localeCompare(b.name));
      },
      error: err => {
        this.toast.error('Une erreur est survenue', {
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
        this.isDiplomaCategoriesLoading = false
      },
      complete: () => this.isDiplomaCategoriesLoading = false
    })
  }

  onListTypeChange(switchToggle: HTMLInputElement) {
    if (switchToggle.checked) {
      this.router.navigate([], {relativeTo: this.route, queryParams: { listType: 'diplomaCategories' } });
      this.listType = ManageListTypes.DiplomaCategories;
    } else {
      this.router.navigate([], {relativeTo: this.route, queryParams: {} });
      this.listType = ManageListTypes.Diplomas;
    }
  }
}
