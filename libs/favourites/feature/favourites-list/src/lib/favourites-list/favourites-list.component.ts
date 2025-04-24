import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrialsStore } from '@trialsight/trials-data-access';
import { TrialComponent } from '@trialsight/shared-ui';

@Component({
  selector: 'lib-favourites-list',
  imports: [CommonModule, TrialComponent],
  templateUrl: './favourites-list.component.html',
  styleUrl: './favourites-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouritesListComponent {
  trialStore = inject(TrialsStore);
}
