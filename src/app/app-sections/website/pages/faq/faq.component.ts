import { Component, OnInit } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

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
  }

  goToContent(contentId: string) {
    document.getElementById(contentId)?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }

  expand(faqAccordion: HTMLDivElement, icon: HTMLElement) {
    faqAccordion.classList.toggle('expanded');
    icon.classList.toggle('rotate');
  }
}
