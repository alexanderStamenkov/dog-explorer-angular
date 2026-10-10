import { Component, inject, signal } from '@angular/core';
import { DogService } from '../../services/dog';
import { DogResponse } from '../../models/dog-response';

@Component({
  selector: 'app-random-dog',
  imports: [],
  templateUrl: './random-dog.component.html',
  styleUrl: './random-dog.component.scss',
})
export class RandomDogComponent {
  private dogServivce = inject(DogService);
  response = signal<DogResponse | null>(null);
  loading = signal(false);

  loadRandomDog() {
    this.loading.set(true);

    this.dogServivce.getRandomDog().subscribe({
      next: (dog) => {
        this.response.set(dog);
        this.loading.set(false);
      },
      error: (err: Error) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }
}
