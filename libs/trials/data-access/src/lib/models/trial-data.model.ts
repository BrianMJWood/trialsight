export interface TrialData {
  protocolSection: {
    identificationModule: { nctId: string; briefTitle: string };
    statusModule: { overallStatus: string };
  };
  hasResults: boolean;
}
