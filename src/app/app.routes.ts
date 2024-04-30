import { Routes } from '@angular/router';
import { CrudComponent } from './crud/crud.component';
import { PdfComponent } from './pdf/pdf.component';
import { crudRoutes } from './crud/crud.routes';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'crud',
    loadChildren: () => import('./crud/crud.routes').then((m) => m.crudRoutes),
  },
  {
    path: 'pdf',
    loadChildren: () => import('./pdf/pdf.routes').then((m) => m.pdfRoutes),
  },
];
