export enum CurrencyTypes {
  eur = "eur",
  usd = "usd",
  cny = "cny",
}

export interface CurrencyDateWithCost {
  date: string;
  cost: string;
}

export interface Currency {
  type: CurrencyTypes.eur | CurrencyTypes.usd | CurrencyTypes.cny;
  trackedDays: CurrencyDateWithCost[];
}
export interface CurrenciesState {
  currencies: Currency[];
}

export enum CurreniesActionTypes {
  RESET_CURRENCIES = "RESET_CURRENCIES",
  FETCH_CURRENCY = "FETCH_CURRENCY",
}

interface ResetCurrenciesAction {
  type: CurreniesActionTypes.RESET_CURRENCIES;
}

interface FetchCurrencySuccessAction {
  type: CurreniesActionTypes.FETCH_CURRENCY;
  payload: {
    type: CurrencyTypes.eur | CurrencyTypes.usd | CurrencyTypes.cny;
    dateWithCost: {
      date: string;
      cost: string;
    };
  };
}

export type CurrencyAction = ResetCurrenciesAction | FetchCurrencySuccessAction;
