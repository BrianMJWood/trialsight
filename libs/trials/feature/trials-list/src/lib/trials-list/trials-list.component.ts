import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrialsStore } from '@trialsight/trials-data-access';

@Component({
  selector: 'lib-trials-list',
  imports: [CommonModule],
  templateUrl: './trials-list.component.html',
  styleUrl: './trials-list.component.css',
})
export class TrialsListComponent implements OnInit {
  trialStore = inject(TrialsStore);

  ngOnInit(): void {
    if (this.trialStore.display().length === 0) {
      this.trialStore.loadTrials();
      this.trialStore.startRotation();
    }
  }
}
