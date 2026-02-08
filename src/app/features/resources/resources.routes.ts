import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { resourcesFeature } from './+state/resources.reducer';
import { ResourcesEffects } from './+state/resources.effects';
import { ResourcesFacade } from './+state/resources.facade';

export const RESOURCES_ROUTES: Routes = [
  {
    path: '',
    providers: [
      provideState(resourcesFeature),
      provideEffects(ResourcesEffects),
      ResourcesFacade,
    ],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/resource-list/resource-list').then((m) => m.ResourceList),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./pages/resource-detail/resource-detail').then((m) => m.ResourceDetail),
      },
    ],
  },
]