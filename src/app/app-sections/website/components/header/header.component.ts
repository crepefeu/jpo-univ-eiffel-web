import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { MultiStepFormComponent } from '../multi-step-form/multi-step-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isHandheld = false;

  showSidebar = false

  constructor(private responsive: BreakpointObserver,
    private modalService: ModalService) {
    responsive.observe(['(max-width: 820px)']).subscribe({
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

  openRegisterForm() {
    if (this.isHandheld) {
      this.modalService.open(MultiStepFormComponent, this.modalService.drawerConfig)
    } else {
      this.modalService.open(MultiStepFormComponent, this.modalService.modalConfig);
    }
  }
}
