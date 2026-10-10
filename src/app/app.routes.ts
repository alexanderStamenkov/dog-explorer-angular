import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'random-dog',
    loadComponent: () =>
      import('./features/dog/pages/random-dog/random-dog.component').then(
        (m) => m.RandomDogComponent,
      ),
  },
  {
    path: 'breeds',
    loadComponent: () =>
      import('./features/dog/pages/breeds/breeds.component').then((m) => m.BreedsComponent),
  },
  {
    path: 'breeds/:breed',
    loadComponent: () =>
      import('./features/dog/pages/breed-details/breed-details.component').then(
        (m) => m.BreedDetailsComponent,
      ),
  },
  {
    path: '',
    redirectTo: 'random-dog',
    pathMatch: 'full',
  },
];
