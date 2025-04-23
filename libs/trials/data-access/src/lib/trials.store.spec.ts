import { TestBed } from '@angular/core/testing';
import { TrialsStore } from './trials.store';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { TrialsService } from './trials.service';
import { Trial } from './models/trial.model';
import { of, throwError } from 'rxjs';
import 'zone.js';

TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

const mockTrials: Trial[] = Array.from({ length: 100 }, (_, i) => ({
  id: `test-trial-${i}`,
  title: `Test Trial ${i}`,
  status: 'Active',
  hasResults: false,
  favourite: false,
}));

describe('TrialsStore', () => {
  let store: InstanceType<typeof TrialsStore>;
  let trialsService: TrialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TrialsStore,
        {
          provide: TrialsService,
          useValue: {
            fetchTrials: () => of(mockTrials),
          },
        },
      ],
    });

    store = TestBed.inject(TrialsStore);
    trialsService = TestBed.inject(TrialsService);
  });

  it('should initialize with default state', () => {
    expect(store.trials()).toEqual([]);
    expect(store.display()).toEqual([]);
    expect(store.favourites()).toEqual([]);
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
  });

  describe('when loadTrails is called', () => {
    it('should update state properly on success', () => {
      jest.spyOn(trialsService, 'fetchTrials').mockReturnValue(of(mockTrials));

      store.loadTrials();

      expect(trialsService.fetchTrials).toHaveBeenCalled();
      expect(store.trials()).toEqual(mockTrials);
      expect(store.display()).toHaveLength(10);
      expect(store.loading()).toBe(false);
    });

    it('should handle errors', () => {
      const error = new Error('Test error');
      jest
        .spyOn(trialsService, 'fetchTrials')
        .mockReturnValue(throwError(() => error));

      store.loadTrials();

      expect(store.error()).toBe('Unexpected error');
      expect(store.loading()).toBe(false);
    });
  });
});
