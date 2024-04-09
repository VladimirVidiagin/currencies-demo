import {
  CurrenciesState,
  CurrencyAction,
  CurrencyTypes,
  CurreniesActionTypes,
} from "../../app/types/currencies";

const initialState: CurrenciesState = {
  cachedCurrenciesData: [],
  selectedDates: [],
  selectedCurrencies: [
    { name: CurrencyTypes.eur, selected: false },
    { name: CurrencyTypes.usd, selected: false },
    { name: CurrencyTypes.cny, selected: false },
  ],
};

export const currenciesReducer = (
  state = initialState,
  action: CurrencyAction
): CurrenciesState => {
  switch (action.type) {
    case CurreniesActionTypes.FETCH_CURRENCY:
      return {
        ...state,
        cachedCurrenciesData: [
          ...state.cachedCurrenciesData,
          action.payload.dateWithCosts,
        ].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        ),
      };
    case CurreniesActionTypes.UPDATE_CURRENCY_SELECTION:
      return {
        ...state,
        selectedCurrencies: state.selectedCurrencies.map((currency) =>
          currency.name === action.payload.name ? action.payload : currency
        ),
      };
    case CurreniesActionTypes.UPDATE_DATE_SELECTION:
      return {
        ...state,
        selectedDates: action.payload,
      };
    default:
      return state;
  }
};
