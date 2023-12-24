import { Component, OnInit } from '@angular/core';
import { ManageListTypes } from 'src/app/enums/manageListTypes.enum';
import { DiplomasService } from 'src/app/services/diplomas.service';

@Component({
  selector: 'app-diplomas-manage',
  templateUrl: './diplomas-manage.component.html',
  styleUrls: ['./diplomas-manage.component.scss']
})
export class DiplomasManageComponent implements OnInit {

  listType = ManageListTypes.Diplomas;
  diplomasData: any;

  constructor(private diplomas: DiplomasService) { }

  ngOnInit(): void {
    this.diplomas.getAllDiplomas().subscribe({
      next: data => {
        this.diplomasData = data.sort((a: any, b: any) => a.category.name.localeCompare(b.category.name))
      },
      error: err => console.error('An error occurred :', err),
      complete: () => console.log('getAllDiplomas() completed')
    });
  }
}
