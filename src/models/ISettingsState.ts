export default interface ISettingsState {
  loading: boolean;
  error: string;
  currencies: {};
  currency: string;
  periods: string[];
  onboarding: boolean;
}
