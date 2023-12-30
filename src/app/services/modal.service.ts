import { ApplicationRef, ComponentRef, EnvironmentInjector, Injectable, TemplateRef, Type, ViewContainerRef, createComponent, Input } from '@angular/core';
import { ModalComponent } from '../shared/components/modals/generic-modal/modal.component';
import { ModalOptions } from '../models/modalOptions';
import { ConfirmationModalComponent } from '../shared/components/modals/confirmation-modal/confirmation-modal.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ManageListComponent } from '../app-sections/dashboard/components/manage-list/manage-list.component';
import { GenericDrawerComponent } from '../shared/components/drawers/generic-drawer/generic-drawer.component';
import { DrawerOptions } from '../models/drawerOptions';
import { ConfirmationDrawerComponent } from '../shared/components/drawers/confirmation-drawer/confirmation-drawer.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  // Create a reference to our modal component
  modalComponent!: ComponentRef<ModalComponent | GenericDrawerComponent>;
  confirmationModalComponent!: ComponentRef<ConfirmationModalComponent | ConfirmationDrawerComponent>;

  // Optional content passed at the creation : animation, size, ... 
  options!: ModalOptions | DrawerOptions | undefined;

  isHandheld = false;

  modalConfig: ModalOptions = {
    displayHeader: true,
    animations: {
      modal: {
        enter: 'enter-scaling 0.1s ease-out',
        leave: 'exit-scaling 0.1s ease-out',
      },
      overlay: {
        enter: 'fade-in 0.1s',
        leave: 'fade-out 0.1s forwards',
      },
    },
    size: {
      width: '80vw',
      height: 'fit-content',
    }
  };

  drawerConfig: DrawerOptions = {
    animations: {
      modal: {
        enter: 'drawer-open 0.2s ease-out',
        leave: 'drawer-close 0.1s ease-out',
      },
      overlay: {
        enter: 'fade-in 0.1s',
        leave: 'fade-out 0.1s forwards',
      },
    },
    size: {
      width: '80vw',
      height: 'fit-content',
    }
  };

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector,
    private responsive: BreakpointObserver
  ) {
    this.responsive.observe(['(max-width: 500px)']).subscribe((state) => {
      if (state.matches) {
        this.isHandheld = true;
      } else {
        this.isHandheld = false;
      }
    });
  }

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
    if (!this.isHandheld) {
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
    } else {
      if (vcrOrComponent instanceof ViewContainerRef) {
        // For the first approach, we know that the second param will be of type TemplateRef, so we have to cast it  
        this.openWithTemplate(vcrOrComponent, param2 as TemplateRef<Element>);
        this.options = options;
      } else {
        // For the second approach, we know that the second param will be of type ModalOptions, so we have to cast it
        this.options = param2 as DrawerOptions | undefined;

        // Then we pass it to the component by adding it to the arguments of the openWithComponent function
        this.openDrawerWithComponent(vcrOrComponent, this.options);

        // Same story here : for the second approach, the second param will be of type Options or undefined, since optional 
        this.modalComponent.instance.options = this.options;
      }
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

  private openDrawerWithComponent(component: Type<any>, options: DrawerOptions | undefined) {
    // create the desired component, the content of the modal box
    const newComponent = createComponent(component, {
      environmentInjector: this.injector,
    });

    // pass the data to the component if any
    if (options?.data) {
      newComponent.instance.data = options?.data;
    }

    // create the modal component and project the instance of the desired component in the ng-content

    this.modalComponent = createComponent(GenericDrawerComponent, {
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

  openConfirmationModal(options: ModalOptions | DrawerOptions | undefined) {
    if (!this.isHandheld) {
      // create the modal component and project the instance of the desired component in the ng-content
      this.confirmationModalComponent = createComponent(ConfirmationModalComponent, {
        environmentInjector: this.injector,
      });

      document.body.appendChild(this.confirmationModalComponent.location.nativeElement);

      // Attach views to the changeDetection cycle
      this.appRef.attachView(this.confirmationModalComponent.hostView);

      this.options = options;

      this.confirmationModalComponent.instance.options = this.options;
    } else {
      // create the modal component and project the instance of the desired component in the ng-content
      this.confirmationModalComponent = createComponent(ConfirmationDrawerComponent, {
        environmentInjector: this.injector,
      });

      document.body.appendChild(this.confirmationModalComponent.location.nativeElement);

      // Attach views to the changeDetection cycle
      this.appRef.attachView(this.confirmationModalComponent.hostView);

      this.options = options;

      this.confirmationModalComponent.instance.options = this.options;
    }
  }

  closeConfirmationModal() {
    this.confirmationModalComponent.instance.close();
  }
}
