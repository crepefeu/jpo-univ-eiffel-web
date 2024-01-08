import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  displayHeaderAndFooter = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Observe url changes and hide header on virtual tour page
    this.router.events.subscribe((val) => {
      if (this.router.url.includes('virtual-tour')) {
        this.displayHeaderAndFooter = false;
      } else {
        this.displayHeaderAndFooter = true;
      }
    });
    }
}
