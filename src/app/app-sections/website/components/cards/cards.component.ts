import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {

  @HostListener('document:mousemove', ['$event']) 
  onMouseMove(e: any) {
    document.body.style.setProperty('--mx', e.clientX);
    document.body.style.setProperty('--my', e.clientY);
  }
  
}
