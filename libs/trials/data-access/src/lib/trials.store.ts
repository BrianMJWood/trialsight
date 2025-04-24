import { computed, inject } from '@angular/core';
import { pipe, switchMap, tap, interval } from 'rxjs';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Trial } from '@trialsight/utils';
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
    isFavourite: computed(() => {
      const favourites = store.favourites();
      return (id: string) =>
        favourites.some((favourite) => favourite.id === id);
    }),
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
              error: () => patchState(store, { error: 'Unexpected error' }),
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
      const favourites = store.favourites();
      const isFavourite = favourites.some((t) => t.id === trial.id);

      patchState(store, {
        favourites: isFavourite
          ? favourites.filter((t) => t.id !== trial.id)
          : [...favourites, trial],
      });
    },

    clearFavourites: () => {
      patchState(store, { favourites: [] });
    },

    addCurrentViewToFavourites: () => {
      const trialsToAdd = store
        .display()
        .filter(
          (trial) => !store.favourites().some((fav) => fav.id === trial.id)
        );

      patchState(store, {
        favourites: [...store.favourites(), ...trialsToAdd],
      });
    },
  }))
);
