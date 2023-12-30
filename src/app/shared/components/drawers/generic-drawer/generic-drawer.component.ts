import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Observable, fromEvent, zip } from 'rxjs';
import { DrawerOptions } from 'src/app/models/drawerOptions';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-generic-drawer',
  templateUrl: './generic-drawer.component.html',
  styleUrls: ['./generic-drawer.component.scss']
})
export class GenericDrawerComponent implements AfterViewInit, OnInit {

  @ViewChild('drawer') drawer!: ElementRef<HTMLDivElement>;
  @ViewChild('overlay') overlay!: ElementRef<HTMLDivElement>;

  options: DrawerOptions | undefined;

  title?: string;

  drawerAnimationEnd!: Observable<Event>;
  drawerLeaveAnimation!: string;
  overlayLeaveAnimation!: string;
  overlayAnimationEnd!: Observable<Event>;
  drawerLeaveTiming!: number;
  overlayLeaveTiming!: number;

  constructor(
    private modalService: ModalService,
    private element: ElementRef
  ) { }

  @HostListener('document:keydown.escape')
  onEscape() {
    // closing drawer on escape     
    this.modalService.close();
  }

  onClose() {
    // closing drawer when clicking on the overlay
    this.modalService.close();
  }

  ngAfterViewInit() {
    this.options = this.modalService.options;
    this.addOptions();
    this.addEnterAnimations();
  }

  ngOnInit() {
    // Initializing variables from options passed to the drawer
    if (!this.options) {
      return;
    }

    if (this.options?.title) {
      this.title = this.options?.title;
    }
  }

  addEnterAnimations() {
    this.drawer.nativeElement.style.animation =
      this.options?.animations?.modal?.enter || '';
    this.overlay.nativeElement.style.animation =
      this.options?.animations?.overlay?.enter || '';
  }

  addOptions() {
    // Applying desired styles
    this.drawer.nativeElement.style.minHeight =
      this.options?.size?.minHeight || 'auto';
    this.drawer.nativeElement.style.height =
      this.options?.size?.height || 'auto';
    this.drawer.nativeElement.style.maxHeight =
      this.options?.size?.maxHeight || 'auto';

    // Storing ending animation in variables
    this.drawerLeaveAnimation = this.options?.animations?.modal?.leave || '';
    this.overlayLeaveAnimation = this.options?.animations?.overlay?.leave || '';
    // Adding an animationend event listener to know when animations ends     
    this.drawerAnimationEnd = this.animationendEvent(this.drawer.nativeElement);
    this.overlayAnimationEnd = this.animationendEvent(
      this.overlay.nativeElement
    );
    // Get to know how long animations are
    this.drawerLeaveTiming = this.getAnimationTime(this.drawerLeaveAnimation);
    this.overlayLeaveTiming = this.getAnimationTime(this.overlayLeaveAnimation);
  }

  animationendEvent(element: HTMLDivElement) {
    return fromEvent(element, 'animationend');
  }

  removeElementIfNoAnimation(element: HTMLDivElement, animation: string) {
    if (!animation) {
      element.remove();
    }
  }

  close() {
    this.drawer.nativeElement.style.animation = this.drawerLeaveAnimation;
    this.overlay.nativeElement.style.animation = this.overlayLeaveAnimation;

    // Goal here is to clean up the DOM to not keep unnecessary <app-drawer> element
    // No animations on both elements:
    if (
      !this.options?.animations?.modal?.leave &&
      !this.options?.animations?.overlay?.leave
    ) {
      this.modalService.options = undefined;
      this.element.nativeElement.remove();
      return;
    }

    // Remove element if not animated
    this.removeElementIfNoAnimation(
      this.drawer.nativeElement,
      this.drawerLeaveAnimation
    );
    this.removeElementIfNoAnimation(
      this.overlay.nativeElement,
      this.overlayLeaveAnimation
    );

    // Both elements are animated, remove drawer as soon as longest one ends
    if (this.drawerLeaveTiming > this.overlayLeaveTiming) {
      this.drawerAnimationEnd.subscribe(() => {
        this.element.nativeElement.remove();
      });
    } else if (this.drawerLeaveTiming < this.overlayLeaveTiming) {
      this.overlayAnimationEnd.subscribe(() => {
        this.element.nativeElement.remove();
      });
    } else {
      zip(this.drawerAnimationEnd, this.overlayAnimationEnd).subscribe(() => {
        this.element.nativeElement.remove();
      });
    }

    this.modalService.options = undefined;
  }

  getAnimationTime(animation: string) {
    // Example animation = 'fade-in 0.8s'    
    let animationTime = 0;
    const splittedAnimation = animation.split(' ');
    for (const expression of splittedAnimation) {
      const currentValue = +expression.replace(/s$/, '');
      if (!isNaN(currentValue)) {
        animationTime = currentValue;
        break;
      }
    }

    return animationTime;
  }

}
