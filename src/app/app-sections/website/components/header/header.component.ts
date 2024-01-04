import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isHandheld = false;

  showSidebar = false

  constructor(private responsive: BreakpointObserver) {
    responsive.observe(['(max-width: 860px)']).subscribe({
      next: data => {
        if (data.matches) {
          this.isHandheld = true;
        } else {
          this.isHandheld = false;
        }
      }
    });
  }

  ngOnInit(): void {
    document.body.classList.toggle('dark-theme', false);
  }
}
