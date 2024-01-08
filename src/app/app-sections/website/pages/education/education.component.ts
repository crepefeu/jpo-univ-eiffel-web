import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  isHandheld = false;

  constructor(private responsive: BreakpointObserver) { }

  ngOnInit(): void {
    this.responsive.observe(['(max-width: 820px)']).subscribe((result) => {
      if (result.matches) {
        this.isHandheld = true;
      } else {
        this.isHandheld = false;
      }
    });
  }
}
