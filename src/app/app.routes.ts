import { Routes } from '@angular/router';
import { ShellComponent } from '@shell/shell.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'resources' },
      {
        path: 'resources',
        loadChildren: () =>
          import('./features/resources/resources.routes').then((m) => m.RESOURCES_ROUTES),
      },
    ],
  },

  // Fallback
  { path: '**', redirectTo: 'resources' },
];
