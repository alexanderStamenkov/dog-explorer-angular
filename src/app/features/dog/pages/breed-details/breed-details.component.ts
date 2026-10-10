import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DogService } from '../../services/dog';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-breeds',
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './breed-details.component.html',
  styleUrl: './breed-details.component.scss',
})
export class BreedDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private dogService = inject(DogService);

  breed = signal('');
  images = signal<string[]>([]);
  loading = signal(true);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    const breed = this.route.snapshot.paramMap.get('breed');

    if (!breed) {
      this.errorMessage.set('No breed specified.');
      this.loading.set(false);
      return;
    }

    this.breed.set(breed);

    this.dogService.dogBreedImages(breed).subscribe({
      next: (res) => {
        this.images.set(res.message);
        this.loading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Could not load breed images.');
        this.loading.set(false);
      },
    });
  }
}
