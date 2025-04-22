import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrialsStore } from '@trialsight/trials-data-access';

@Component({
  selector: 'lib-trials-list',
  imports: [CommonModule],
  templateUrl: './trials-list.component.html',
  styleUrl: './trials-list.component.css',
  providers: [TrialsStore],
})
export class TrialsListComponent {
  trialStore = inject(TrialsStore);
  constructor() {
    this.trialStore.loadTrials();
    this.trialStore.startRotation();
  }
}
