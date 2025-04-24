import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrialsStore } from '@trialsight/trials-data-access';
import { TrialComponent } from '@trialsight/shared-ui';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-trials-list',
  imports: [CommonModule, TrialComponent, MatButtonModule],
  templateUrl: './trials-list.component.html',
  styleUrl: './trials-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrialsListComponent implements OnInit {
  trialsStore = inject(TrialsStore);

  ngOnInit(): void {
    if (this.trialsStore.display().length === 0) {
      this.trialsStore.loadTrials();
      this.trialsStore.startRotation();
    }
  }
}
