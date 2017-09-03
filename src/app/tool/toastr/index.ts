import {ApplicationRef, ComponentFactoryResolver, Injectable, NgZone} from '@angular/core';
import {ToastOptions, ToastsManager} from 'ng2-toastr';
@Injectable()
export class AppToastsManager extends ToastsManager {
  constructor(componentFactoryResolver: ComponentFactoryResolver, ngZone: NgZone, appRef: ApplicationRef, options: ToastOptions) {
    super(componentFactoryResolver, ngZone, appRef, Object.assign(options, {
      positionClass: 'toast-bottom-center',
      toastLife: 3000
    }));
  }
}
