import { Trial } from './models/trial.model';
export const mockTrials: Trial[] = Array.from({ length: 100 }, (_, i) => ({
  id: `test-trial-${i}`,
  title: `Test Trial ${i}`,
  status: 'Active',
  hasResults: false,
  favourite: false,
}));
