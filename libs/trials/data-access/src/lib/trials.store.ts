import { computed, inject } from '@angular/core';
import { pipe, switchMap, tap, interval, from } from 'rxjs';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Trial } from './models/trial.model';
import { TrialsService } from './trials.service';
import { tapResponse } from '@ngrx/operators';

interface TrialsState {
  trials: Trial[];
  display: Trial[];
  favourites: Trial[];
  loading: boolean;
  error: string | null;
}

const initialState: TrialsState = {
  trials: [],
  display: [],
  favourites: [],
  loading: false,
  error: null,
};

function pickRandom<T>(source: readonly T[], count: number): T[] {
  return [...source].sort(() => Math.random() - 0.5).slice(0, count);
}

export const TrialsStore = signalStore(
  { providedIn: 'root' },
  withState<TrialsState>(initialState),

  withComputed((store) => ({
    trialsWithFavourites: computed(() =>
      store.display().map((trial) => ({
        ...trial,
        favourite: store
          .favourites()
          .some((favourite) => favourite.id === trial.id),
      }))
    ),
  })),

  withMethods((store, trialsService = inject(TrialsService)) => ({
    loadTrials: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(() =>
          trialsService.fetchTrials().pipe(
            tapResponse({
              next: (trials: Trial[]) => {
                const initialDisplay = pickRandom(trials, 10);
                patchState(store, {
                  trials,
                  display: initialDisplay,
                });
              },
              error: (err: any) =>
                patchState(store, { error: err.message ?? 'Unexpected error' }),
              finalize: () => patchState(store, { loading: false }),
            })
          )
        )
      )
    ),

    startRotation: rxMethod<void>(
      pipe(
        switchMap(() => interval(5000)),
        tap(() => {
          const newTrial = pickRandom(store.trials(), 1)[0];
          const newDisplay = [...store.display().slice(1), newTrial];
          patchState(store, { display: newDisplay });
        })
      )
    ),

    toggleFavourite: (trial: Trial) => {
      const isFavorite = store.favourites().some((t) => t.id === trial.id);
      const newFavorites = isFavorite
        ? store.favourites().filter((t) => t.id !== trial.id)
        : [...store.favourites(), trial];

      patchState(store, { favourites: newFavorites });
    },
  }))
);
