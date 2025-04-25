import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { Trial } from '@trialsight/utils';
import { TrialData } from '@trialsight/utils';

@Injectable({ providedIn: 'root' })
export class TrialsService {
  private readonly http = inject(HttpClient);
  private readonly url =
    'https://clinicaltrials.gov/api/v2/studies' +
    '?fields=NCTId|BriefTitle|OverallStatus|HasResults' +
    '&pageSize=100&format=json';

  fetchTrials() {
    return this.http
      .get<{ studies: TrialData[] }>(this.url)
      .pipe(map(({ studies }) => studies.map(this.mapStudyToTrial)));
  }

  private mapStudyToTrial(study: TrialData): Trial {
    return {
      id: study.protocolSection.identificationModule.nctId,
      title: study.protocolSection.identificationModule.briefTitle,
      status: study.protocolSection.statusModule.overallStatus,
      hasResults: study.hasResults,
    } as Trial;
  }
}
