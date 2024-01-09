import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  // @HostListener('body:pointermove', ['$event'])
  // onPointerMove(event: PointerEvent) {
  //   this.syncPointer({ x: event.clientX, y: event.clientY });
  // }

  ngOnInit(): void {
    if (!CSS.supports('animation-timeline: scroll()')) {
      gsap.registerPlugin(ScrollTrigger)

      gsap.set('.track__indicators', { aspectRatio: '7 / 1' })

      const INDICATORS = document.querySelectorAll('.indicator')
      const ARTICLES = document.querySelectorAll('li')
      INDICATORS.forEach((indicator, index) => {
        // Here need to animate the indicator based on the position of the card
        gsap.to(indicator, {
          flex: 3,
          repeat: 1,
          yoyo: true,
          scrollTrigger: {
            scrub: true,
            horizontal: true,
            trigger: ARTICLES[index],
            scroller: 'ul',
            start: "right right",
            end: "left left",
            snap: [0, 1]
          }
        })
      })

    }
    //     gsap.registerPlugin(ScrollTrigger)
    //     gsap.set('section', { '--base': 0 })
    //     gsap.to('section', {
    //       '--base': 320,
    //       ease: 'none',
    //       scrollTrigger: {
    //         horizontal: true,
    //         scrub: true,
    //         scroller: 'ul',
    //       },
    //     })
    //     const ITEMS = document.querySelectorAll('li')
    //     ITEMS.forEach((ITEM) => {
    //       gsap
    //         .timeline()
    //         .set(ITEM, { '--sat': 0 })
    //         .to(ITEM, {
    //           '--sat': 100,
    //           scrollTrigger: {
    //             trigger: ITEM,
    //             start: 'right 75%',
    //             end: 'center center',
    //             horizontal: true,
    //             scrub: true,
    //             scroller: 'ul',
    //           },
    //         })
    //         .fromTo(
    //           ITEM,
    //           { '--sat': 100 },
    //           {
    //             '--sat': 0,
    //             scrollTrigger: {
    //               trigger: ITEM,
    //               end: 'left 25%',
    //               start: 'center center',
    //               horizontal: true,
    //               scrub: true,
    //               scroller: 'ul',
    //             },
    //           }
    //         )
    //     })
    // }

    // syncPointer = ({ x, y }: { x: number, y: number }) => {
    //   document.documentElement.style.setProperty('--px', x.toFixed(2))
    //   document.documentElement.style.setProperty('--py', y.toFixed(2))
    // }
  }

  goToContent(contentId: string) {
    document.getElementById(contentId)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  expand(faqAccordion: HTMLDivElement, icon: HTMLElement) {
    faqAccordion.classList.toggle('expanded');
    icon.classList.toggle('rotate');
  }
}
