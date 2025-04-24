import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrialComponent } from './trial.component';
import { TrialsStore, TrialsService } from '@trialsight/trials-data-access';
import { mockTrials } from '@trialsight/utils';
import { of } from 'rxjs';

describe('TrialComponent', () => {
  let component: TrialComponent;
  let fixture: ComponentFixture<TrialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrialComponent],
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

    fixture = TestBed.createComponent(TrialComponent);
    fixture.componentRef.setInput('trial', 'test value');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
