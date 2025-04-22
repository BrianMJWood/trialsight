import { inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { Trial } from './models/trial.model';
import { TrialsService } from './trials.service';
import { tapResponse } from '@ngrx/operators';

interface TrialsState {
  trials: Trial[];
  display: Trial[];
  loading: boolean;
  error: string | null;
}

const initialState: TrialsState = {
  trials: [],
  display: [],
  loading: false,
  error: null,
};

function pickRandom<T>(source: readonly T[], count = 10): T[] {
  return [...source].sort(() => Math.random() - 0.5).slice(0, count);
}

export const TrialsStore = signalStore(
  withState<TrialsState>(initialState),

  withMethods((store, trialsService = inject(TrialsService)) => ({
    loadTrials: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(() =>
          trialsService.fetchTrials().pipe(
            tapResponse({
              next: (trials: Trial[]) =>
                patchState(store, {
                  trials,
                  display: pickRandom(trials),
                }),
              error: (err: any) =>
                patchState(store, {
                  error: err.message ?? 'Unexpected error',
                }),
              finalize: () => patchState(store, { loading: false }),
            })
          )
        )
      )
    ),
  }))
);
