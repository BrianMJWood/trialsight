import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrialsListComponent } from './trials-list.component';
import { TrialsStore, TrialsService } from '@trialsight/trials-data-access';
import { of } from 'rxjs';
import { mockTrials } from '@trialsight/utils';

describe('TrialsListComponent', () => {
  let component: TrialsListComponent;
  let fixture: ComponentFixture<TrialsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrialsListComponent],
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

    fixture = TestBed.createComponent(TrialsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
