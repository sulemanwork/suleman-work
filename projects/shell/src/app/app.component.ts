import { Component, ViewChild, ViewContainerRef, ɵrenderComponent as renderComponent, Inject, Injector, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { buildRoutes } from './services/buildRoutes';
import { Microfrontend } from './services/MicrofrontEnd';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'shell';

  microfrontends: Microfrontend[] = [];

  constructor(
    private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    let modules = (window as any).ln_modules;
    this.microfrontends = modules;
    const routes = buildRoutes(this.microfrontends);
    this.router.resetConfig(routes);
  }

}

