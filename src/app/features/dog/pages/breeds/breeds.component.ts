import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DogService } from '../../services/dog';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-breeds',
  imports: [TitleCasePipe, RouterLink],
  templateUrl: './breeds.component.html',
  styleUrl: './breeds.component.scss',
})
export class BreedsComponent implements OnInit {
  private dogService = inject(DogService);
  breeds = signal<string[]>([]);
  searchTerm = signal('');

  filteredBreeds = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    return this.breeds().filter((breed) => breed.toLowerCase().includes(search));
  });

  ngOnInit(): void {
    this.dogService.getBreeds().subscribe({
      next: (res) => {
        this.breeds.set(Object.keys(res.message));
      },
      error: (err) => console.log(err),
    });
  }
}
