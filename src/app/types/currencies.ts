export enum CurrencyTypes {
  eur = "eur",
  usd = "usd",
  cny = "cny",
}

export interface CurrencyDateWithCost {
  date: string;
  cost: string;
}

interface SelectedCurrency {
  name: CurrencyTypes.eur | CurrencyTypes.usd | CurrencyTypes.cny;
  selected: boolean;
}

export interface Currency {
  type: CurrencyTypes.eur | CurrencyTypes.usd | CurrencyTypes.cny;
  trackedDays: CurrencyDateWithCost[];
}
export interface CurrenciesState {
  cachedCurrenciesData: any[];
  selectedDates: string[];
  selectedCurrencies: SelectedCurrency[];
}

export enum CurreniesActionTypes {
  RESET_CURRENCIES = "RESET_CURRENCIES",
  FETCH_CURRENCY = "FETCH_CURRENCY",
  UPDATE_CURRENCY_SELECTION = "UPDATE_CURRENCY_SELECTION",
  UPDATE_DATE_SELECTION = "UPDATE_DATE_SELECTION",
}

interface ResetCurrenciesAction {
  type: CurreniesActionTypes.RESET_CURRENCIES;
}

interface FetchCurrenciesAction {
  type: CurreniesActionTypes.FETCH_CURRENCY;
  payload: {
    dateWithCosts: {
      date: string;
      eur: string;
      usd: string;
      cny: string;
    };
  };
}

interface UpdateCurrencySelectionAction {
  type: CurreniesActionTypes.UPDATE_CURRENCY_SELECTION;
  payload: {
    name: CurrencyTypes.eur | CurrencyTypes.usd | CurrencyTypes.cny;
    selected: boolean;
  };
}

interface UpdateDateSelectionAction {
  type: CurreniesActionTypes.UPDATE_DATE_SELECTION;
  payload: string[];
}

export type CurrencyAction =
  | ResetCurrenciesAction
  | FetchCurrenciesAction
  | UpdateCurrencySelectionAction
  | UpdateDateSelectionAction;
