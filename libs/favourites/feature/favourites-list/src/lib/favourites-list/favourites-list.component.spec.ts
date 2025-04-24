import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavouritesListComponent } from './favourites-list.component';
import { TrialsStore, TrialsService } from '@trialsight/trials-data-access';
import { of } from 'rxjs';
import { mockTrials } from '@trialsight/utils';

describe('FavouritesListComponent', () => {
  let component: FavouritesListComponent;
  let fixture: ComponentFixture<FavouritesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouritesListComponent],
      providers: [
        TrialsStore,
        {
          provide: TrialsService,
          useValue: {
            fetchTrials: () => of(mockTrials),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavouritesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
