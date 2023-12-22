import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {

  expand(faqAccordion: HTMLDivElement, icon: HTMLElement) {
    faqAccordion.classList.toggle('expanded');
    icon.classList.toggle('rotate');
  }
}
