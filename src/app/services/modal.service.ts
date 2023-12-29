import { ApplicationRef, Component, ComponentRef, EnvironmentInjector, Injectable, TemplateRef, Type, ViewContainerRef, createComponent, Input } from '@angular/core';
import { ModalComponent } from '../shared/components/modals/generic-modal/modal.component';
import { ModalOptions } from '../models/modalOptions';
import { ConfirmationModalComponent } from '../shared/components/modals/confirmation-modal/confirmation-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  // Create a reference to our modal component
  modalComponent!: ComponentRef<ModalComponent>;
  confirmationModalComponent!: ComponentRef<ConfirmationModalComponent>;

  // Optional content passed at the creation : animation, size, ... 
  options!: ModalOptions | undefined;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) { }

  // To get clean function call signatures, I will use typescript function overloading
  // Signature of the first approach  
  open(
    vcrOrComponent: ViewContainerRef,
    content: TemplateRef<Element>,
    options?: ModalOptions
  ): void;

  // Signature of the second approach
  open<C>(vcrOrComponent: Type<C>, options?: ModalOptions): void;

  // Function implementation
  open<C>(
    vcrOrComponent: ViewContainerRef | Type<C>,
    param2?: TemplateRef<Element> | ModalOptions,
    options?: ModalOptions
  ) {
    if (vcrOrComponent instanceof ViewContainerRef) {
      // For the first approach, we know that the second param will be of type TemplateRef, so we have to cast it  
      this.openWithTemplate(vcrOrComponent, param2 as TemplateRef<Element>);
      this.options = options;
    } else {
      // For the second approach, we know that the second param will be of type ModalOptions, so we have to cast it
      this.options = param2 as ModalOptions | undefined;

      // Then we pass it to the component by adding it to the arguments of the openWithComponent function
      this.openWithComponent(vcrOrComponent, this.options);
      
      // Same story here : for the second approach, the second param will be of type Options or undefined, since optional 
      this.modalComponent.instance.options = this.options;
    }
  }

  private openWithTemplate(vcr: ViewContainerRef, content: TemplateRef<Element>) {
    // We first start to clear previous views
    vcr.clear();
    // We create a view with the template content 
    const innerContent = vcr.createEmbeddedView(content);

    // We create the modal component, and project the template content in the ng-content of the modal component 
    this.modalComponent = vcr.createComponent(ModalComponent, {
      environmentInjector: this.injector,
      projectableNodes: [innerContent.rootNodes],
    });
  }

  private openWithComponent(component: Type<any>, options: ModalOptions | undefined) {
    // create the desired component, the content of the modal box
    const newComponent = createComponent(component, {
      environmentInjector: this.injector,
    });

    // pass the data to the component if any
    if (options?.data) {
      newComponent.instance.data = options?.data;
    }

    // create the modal component and project the instance of the desired component in the ng-content
    this.modalComponent = createComponent(ModalComponent, {
      environmentInjector: this.injector,
      projectableNodes: [[newComponent.location.nativeElement]]
    });

    document.body.appendChild(this.modalComponent.location.nativeElement);

    // Attach views to the changeDetection cycle
    this.appRef.attachView(newComponent.hostView);
    this.appRef.attachView(this.modalComponent.hostView);
  }

  close() {
    this.modalComponent.instance.close();
  }

  closeConfirmationModal() {
    this.confirmationModalComponent.instance.close();
  }

  openConfirmationModal(options: ModalOptions | undefined) {
    // create the modal component and project the instance of the desired component in the ng-content
    this.confirmationModalComponent = createComponent(ConfirmationModalComponent, {
      environmentInjector: this.injector,
    });

    document.body.appendChild(this.confirmationModalComponent.location.nativeElement);

    // Attach views to the changeDetection cycle
    this.appRef.attachView(this.confirmationModalComponent.hostView);

    this.options = options;

    this.confirmationModalComponent.instance.options = this.options;
  }
}
