import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Observable, fromEvent, zip } from 'rxjs';
import { ModalOptions } from 'src/app/models/modalOptions';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements AfterViewInit, OnInit {

  @ViewChild('confirmationModal') confirmationModal!: ElementRef<HTMLDivElement>;
  @ViewChild('overlay') overlay!: ElementRef<HTMLDivElement>;

  title?: string;
  displayHeader: boolean = false;
  options?: ModalOptions | undefined;

  confirmationSentence!: string;
  confirmationLabel!: string;
  onConfirm!: () => void;

  modalAnimationEnd!: Observable<Event>;
  modalLeaveAnimation!: string;
  overlayLeaveAnimation!: string;
  overlayAnimationEnd!: Observable<Event>;
  modalLeaveTiming!: number;
  overlayLeaveTiming!: number;

  constructor(private modalService: ModalService,
    private element: ElementRef) { }

  @HostListener('document:keydown.escape')
  onEscape() {
    // closing modal on escape     
    this.modalService.closeConfirmationModal();
  }

  onClose() {
    // closing modal when clicking on the overlay
    this.modalService.closeConfirmationModal();
  }

  ngAfterViewInit() {
    this.options = this.modalService.options;
    this.addOptions();
    this.addEnterAnimations();
  }

  ngOnInit() {
    // Initializing variables from options passed to the modal
    if (!this.options) {
      return;
    }

    if (this.options?.title) {
      this.title = this.options?.title;
    }

    if (this.options?.confirmationSentence) {
      this.confirmationSentence = this.options?.confirmationSentence;
    }

    if (this.options?.confirmationLabel) {
      this.confirmationLabel = this.options?.confirmationLabel;
    }

    if (this.options?.onConfirm) {
      this.onConfirm = this.options?.onConfirm;
    }

    if (this.options?.displayHeader) {
      this.displayHeader = this.options?.displayHeader;
    }
  }

  addEnterAnimations() {
    this.confirmationModal.nativeElement.style.animation =
      this.options?.animations?.modal?.enter || '';
    this.overlay.nativeElement.style.animation =
      this.options?.animations?.overlay?.enter || '';
  }

  addOptions() {
    // Applying desired styles
    this.confirmationModal.nativeElement.style.minWidth =
      this.options?.size?.minWidth || 'auto';
    this.confirmationModal.nativeElement.style.width = this.options?.size?.width || 'auto';
    this.confirmationModal.nativeElement.style.maxWidth =
      this.options?.size?.maxWidth || 'auto';
    this.confirmationModal.nativeElement.style.minHeight =
      this.options?.size?.minHeight || 'auto';
    this.confirmationModal.nativeElement.style.height =
      this.options?.size?.height || 'auto';
    this.confirmationModal.nativeElement.style.maxHeight =
      this.options?.size?.maxHeight || 'auto';

    // Storing ending animation in variables
    this.modalLeaveAnimation = this.options?.animations?.modal?.leave || '';
    this.overlayLeaveAnimation = this.options?.animations?.overlay?.leave || '';
    // Adding an animationend event listener to know when animations ends     
    this.modalAnimationEnd = this.animationendEvent(this.confirmationModal.nativeElement);
    this.overlayAnimationEnd = this.animationendEvent(
      this.overlay.nativeElement
    );
    // Get to know how long animations are
    this.modalLeaveTiming = this.getAnimationTime(this.modalLeaveAnimation);
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
    this.confirmationModal.nativeElement.style.animation = this.modalLeaveAnimation;
    this.overlay.nativeElement.style.animation = this.overlayLeaveAnimation;

    // Goal here is to clean up the DOM to not keep unnecessary <app-modal> element
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
      this.confirmationModal.nativeElement,
      this.modalLeaveAnimation
    );
    this.removeElementIfNoAnimation(
      this.overlay.nativeElement,
      this.overlayLeaveAnimation
    );

    // Both elements are animated, remove modal as soon as longest one ends
    if (this.modalLeaveTiming > this.overlayLeaveTiming) {
      this.modalAnimationEnd.subscribe(() => {
        this.element.nativeElement.remove();
      });
    } else if (this.modalLeaveTiming < this.overlayLeaveTiming) {
      this.overlayAnimationEnd.subscribe(() => {
        this.element.nativeElement.remove();
      });
    } else {
      zip(this.modalAnimationEnd, this.overlayAnimationEnd).subscribe(() => {
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
