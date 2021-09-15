import { loadRemoteModule } from "@angular-architects/module-federation";
import { Routes } from "@angular/router";
import { APP_ROUTES } from "../app.routes";
import { Microfrontend } from "./MicrofrontEnd";

export function buildRoutes(options: Microfrontend[]): Routes {

    const lazyRoutes: Routes = options.map(o => ({
        path: o.routePath,
        loadChildren: () => loadRemoteModule(o).then(m => m[o.ngModuleName])
    }));

    return [...APP_ROUTES, ...lazyRoutes];
}