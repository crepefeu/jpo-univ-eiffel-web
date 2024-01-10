import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { MultiStepFormComponent } from '../../components/multi-step-form/multi-step-form.component';
import gsap from 'gsap';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isHandheld = false;

  constructor(private router: Router,
    private modalService: ModalService,
    private responsive: BreakpointObserver) {
    this.responsive.observe(['(max-width: 820px)']).subscribe((result) => {
      if (result.matches) {
        this.isHandheld = true;
      } else {
        this.isHandheld = false;
      }
    });
  }

  ngOnInit() {
    // select element with .text-block class
    const text = document.querySelector('.text-block') as HTMLSpanElement;

    // set to transparent
    text.style.color = 'transparent';

    const getFontSize = () => {
      const REM = 6.9
      const VW = window.innerWidth / 100

      var PX = gsap.utils.clamp(2 * REM, 12 * REM, 12 * VW + REM)

      if (this.isHandheld) {
        var handHeldFontSize = gsap.utils.clamp(2 * REM, 12 * REM, 12 * VW + REM);
        return Math.round(handHeldFontSize);
      }

      return Math.round(PX)
    }

    // Grab the canvas from the DOM we're going to clip
    const CANVAS = document.querySelector('canvas')
    const CONTEXT = CANVAS!.getContext('2d')
    // Create a static canvas we can reuse for the text
    const TEXT_CANVAS = document.createElement('canvas')
    const TEXT_CONTEXT = TEXT_CANVAS.getContext('2d')
    // Create a rings canvas that you can composite on at the end
    const RING_CANVAS = document.createElement('canvas')
    const RING_CONTEXT = RING_CANVAS.getContext('2d')

    const DPI = window.devicePixelRatio || 1

    // Set the heights
    RING_CANVAS.height = TEXT_CANVAS.height = CANVAS!.height = CANVAS!.offsetHeight * DPI
    RING_CANVAS.width = TEXT_CANVAS.width = CANVAS!.width = CANVAS!.offsetWidth * DPI

    const TEXT = "Découvrez"
    // Draw the text onto the text canvas
    TEXT_CONTEXT!.fillStyle = '#2f2a86'
    TEXT_CONTEXT!.textAlign = 'center'
    TEXT_CONTEXT!.textBaseline = 'middle'
    TEXT_CONTEXT!.font = `700 ${getFontSize() * DPI}px Inter`
    TEXT_CONTEXT!.shadowColor = 'rgba(10, 10, 10, 0.2)'
    TEXT_CONTEXT!.fillText(TEXT, TEXT_CANVAS.width / 2, TEXT_CANVAS.height / 2)

    const RINGS: { id: number; hue: number; spread: number; angle: number; }[] = []

    for (let i = 0; i < 150; i++) {
      RINGS.push({
        id: i,
        hue: gsap.utils.random(250, 230, 1),
        spread: gsap.utils.random(75, 359, 1),
        angle: 0,
      })
    }
    const ORIGIN = {
      x: 350 * DPI,
      y: -100 * DPI,
    }
    const DRAW = () => {
      CONTEXT!.globalCompositeOperation = 'copy'
      RING_CONTEXT!.clearRect(0, 0, RING_CANVAS.width, RING_CANVAS.height)
      RING_CONTEXT!.fillStyle = '#2f2a86'
      RING_CONTEXT!.fillRect(0, 0, CANVAS!.width, CANVAS!.height)
      RING_CONTEXT!.lineWidth = 3 * DPI
      RING_CONTEXT!.lineCap = 'round'
      // Draw the rings
      for (const ring of RINGS) {
        RING_CONTEXT!.strokeStyle = `hsl(${ring.hue}, 50%, 50%)`
        RING_CONTEXT!.save()
        RING_CONTEXT!.translate(ORIGIN.x, ORIGIN.y)
        RING_CONTEXT!.rotate((ring.angle * Math.PI) / 180)
        RING_CONTEXT!.translate(ORIGIN.x * -1, ORIGIN.y * -1)
        RING_CONTEXT!.beginPath()
        RING_CONTEXT!.arc(
          ORIGIN.x,
          ORIGIN.y,
          ring.id * (4 * DPI),
          0,
          (ring.spread * Math.PI) / 180
        )
        RING_CONTEXT!.stroke()
        RING_CONTEXT!.restore()
      }
      // Clear the context
      CONTEXT!.clearRect(0, 0, CANVAS!.width, CANVAS!.height)
      CONTEXT!.drawImage(TEXT_CANVAS, 0, 0)
      // Clip to the text
      CONTEXT!.globalCompositeOperation = 'source-in'
      // Draw out the rings
      CONTEXT!.drawImage(RING_CANVAS, 0, 0)
    }

    for (const ring of RINGS) {
      gsap.to(ring, {
        angle: 360,
        repeat: -1,
        ease: 'none',
        duration: () => gsap.utils.random(5, 20, 0.2),
        delay: () => gsap.utils.random(-5, -1, 0.1),
      })
    }
    gsap.ticker.add(DRAW)
  }

  goToContent() {
    document.getElementById("content")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  openRegisterForm() {
    if (this.isHandheld) {
      this.modalService.open(MultiStepFormComponent, this.modalService.drawerConfig)
    } else {
      this.modalService.open(MultiStepFormComponent, this.modalService.modalConfig);
    }
  }

}
