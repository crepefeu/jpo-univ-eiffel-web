import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

    if (!CSS.supports('animation-timeline: scroll()')) {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from('.tilted-img', {
        scrollTrigger: {
          trigger: '.tilted-img',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        },

        transform: 'perspective(1000px) rotateX(25deg)',
      })

      gsap.from('.pop-image-ctn.oculus', {
        scrollTrigger: {
          trigger: '.pop-img.oculus',
          start: 'top bottom',
          end: 'bottom center',
          scrub: true,
        },

        transform: 'translateY(200px)'
      })

      gsap.from('.pop-image-ctn.hololens', {
        scrollTrigger: {
          trigger: '.pop-img.hololens',
          start: 'top bottom',
          end: 'bottom center',
          scrub: true,
        },

        transform: 'translateY(150px)'
      })
    }
  }
}
