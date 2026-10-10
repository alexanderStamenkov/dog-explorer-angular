import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { DogResponse } from '../models/dog-response';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { BreedsResponse } from '../models/breeds-response';
import { DogImagesResponse } from '../models/dog-images-response';

@Injectable({
  providedIn: 'root',
})
export class DogService {
  private http = inject(HttpClient);
  private dogs = signal<DogResponse | null>(null);

  getRandomDog(): Observable<DogResponse> {
    return this.http.get<DogResponse>('https://dog.ceo/api/breeds/image/random').pipe(
      tap((res) => this.dogs.set(res)),
      catchError(() => {
        return throwError(() => new Error('Something went wrong fetching the data'));
      }),
    );
  }

  getBreeds(): Observable<BreedsResponse> {
    return this.http.get<BreedsResponse>('https://dog.ceo/api/breeds/list/all').pipe(
      catchError(() => {
        return throwError(() => new Error('Something went wrong fetching the breeds'));
      }),
    );
  }

  dogBreedImages(breed: string): Observable<DogImagesResponse> {
    return this.http.get<DogImagesResponse>(
      `https://dog.ceo/api/breed/${encodeURIComponent(breed)}/images`,
    );
  }
}
