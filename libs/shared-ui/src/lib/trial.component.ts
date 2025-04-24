import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trial } from '@trialsight/utils';
import { TrialsStore } from '@trialsight/trials-data-access';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-trial',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './trial.component.html',
  styleUrl: './trial.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrialComponent {
  trialStore = inject(TrialsStore);

  trial = input.required<Trial>();
  toggleFavourite = output<Trial>();
}
