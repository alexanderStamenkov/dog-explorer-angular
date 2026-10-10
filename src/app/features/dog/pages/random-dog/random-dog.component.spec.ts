import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomDogComponent } from './random-dog.component';

describe('RandomDogComponent', () => {
  let component: RandomDogComponent;
  let fixture: ComponentFixture<RandomDogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomDogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RandomDogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
