import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { MultiStepFormComponent } from '../../components/multi-step-form/multi-step-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private modalService: ModalService) { }

  ngOnInit(): void {}

  goToContent() {
    document.getElementById("content")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  openRegisterForm() {
    this.modalService.open(MultiStepFormComponent, {
      title: 'Formulaire',
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
        width: '60vw',
        height: 'fit-content',
      }
    });
  }

}
