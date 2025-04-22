import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'trials', pathMatch: 'full' },
  {
    path: 'trials',
    data: { label: 'Trials' },
    loadChildren: () =>
      import('@trialsight/trials-list').then((m) => m.TRIALS_ROUTES),
  },
  {
    path: 'favourites',
    data: { label: 'Favourites' },
    loadChildren: () =>
      import('@trialsight/favourites-list').then((m) => m.FAV_ROUTES),
  },
];
