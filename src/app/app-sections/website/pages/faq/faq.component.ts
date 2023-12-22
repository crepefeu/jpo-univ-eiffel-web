import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  @HostListener('body:pointermove', ['$event'])
  onPointerMove(event: PointerEvent) {
    this.syncPointer({ x: event.clientX, y: event.clientY });
  }

  ngOnInit(): void {
      gsap.registerPlugin(ScrollTrigger)
      gsap.set('section', { '--base': 0 })
      gsap.to('section', {
        '--base': 320,
        ease: 'none',
        scrollTrigger: {
          horizontal: true,
          scrub: true,
          scroller: 'ul',
        },
      })
      const ITEMS = document.querySelectorAll('li')
      ITEMS.forEach((ITEM) => {
        gsap
          .timeline()
          .set(ITEM, { '--sat': 0 })
          .to(ITEM, {
            '--sat': 100,
            scrollTrigger: {
              trigger: ITEM,
              start: 'right 75%',
              end: 'center center',
              horizontal: true,
              scrub: true,
              scroller: 'ul',
            },
          })
          .fromTo(
            ITEM,
            { '--sat': 100 },
            {
              '--sat': 0,
              scrollTrigger: {
                trigger: ITEM,
                end: 'left 25%',
                start: 'center center',
                horizontal: true,
                scrub: true,
                scroller: 'ul',
              },
            }
          )
      })
  }

  expand(faqAccordion: HTMLDivElement, icon: HTMLElement) {
    faqAccordion.classList.toggle('expanded');
    icon.classList.toggle('rotate');
  }

  syncPointer = ({ x, y }: { x: number, y: number }) => {
    document.documentElement.style.setProperty('--px', x.toFixed(2))
    document.documentElement.style.setProperty('--py', y.toFixed(2))
  }
}
