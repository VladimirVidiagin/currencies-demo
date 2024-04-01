import {
  CurrenciesState,
  Currency,
  CurrencyAction,
  CurrencyTypes,
  CurreniesActionTypes,
} from "../../app/types/currencies";

const initialState: CurrenciesState = {
  currencies: [
    { type: CurrencyTypes.eur, trackedDays: [] },
    { type: CurrencyTypes.usd, trackedDays: [] },
    { type: CurrencyTypes.cny, trackedDays: [] },
  ],
};

export const currenciesReducer = (
  state = initialState,
  action: CurrencyAction
): CurrenciesState => {
  switch (action.type) {
    case CurreniesActionTypes.RESET_CURRENCIES:
      return { ...state, currencies: initialState.currencies };
    case CurreniesActionTypes.FETCH_CURRENCY:
      return {
        currencies: state.currencies.map((currency: Currency) =>
          currency.type === action.payload.type
            ? {
                ...currency,
                trackedDays: [
                  ...currency.trackedDays,
                  action.payload.dateWithCost,
                ],
              }
            : currency
        ),
      };
    default:
      return state;
  }
};
