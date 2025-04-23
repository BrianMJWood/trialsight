import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrialsStore } from '@trialsight/trials-data-access';

@Component({
  selector: 'lib-favourites-list',
  imports: [CommonModule],
  templateUrl: './favourites-list.component.html',
  styleUrl: './favourites-list.component.css',
})
export class FavouritesListComponent {
  trialStore = inject(TrialsStore);
}
