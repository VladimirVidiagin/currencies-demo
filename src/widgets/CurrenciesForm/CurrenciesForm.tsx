import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CheckboxField } from "../../shared/CheckboxField/CheckboxField";
import { InputDateField } from "../../shared/InputDateField/InputDateField";
import { CurreniesActionTypes } from "../../app/types/currencies";
import Message from "../../shared/Message/Message";
import Button from "../../shared/Button/Button";
import { useTypedSelector } from "../../app/hooks/useTypedSelector";

export const CurrenciesForm: React.FC = () => {
  const dispatch = useDispatch();

  const { cachedCurrenciesData } = useTypedSelector(
    (state) => state.currencies
  );

  interface FormValues {
    eur: boolean;
    usd: boolean;
    cny: boolean;
    dateFrom: string;
    dateTo: string;
  }

  const [formValues, setFormValues] = useState<FormValues>({
    eur: false,
    usd: false,
    cny: false,
    dateFrom: "",
    dateTo: "",
  });

  const allCurrenciesUnchecked =
    !formValues.eur && !formValues.usd && !formValues.cny;

  const cachedDates = cachedCurrenciesData.map((day) => day.date);

  const [requestCount, setRequestCount] = useState(0);

  const getDatesInRange = (
    startDate: string,
    endDate: string,
    dispatch: Function
  ): string[] => {
    const datesForRequest = [];
    const selectedDates = [];

    let currentDate = new Date(startDate);

    const formatDate = (date: Date): string => date.toISOString().slice(0, 10);

    const hasBothDates = startDate !== "" && endDate !== "";

    const hasOnlyNewStartDate =
      endDate === "" &&
      !cachedDates.includes(currentDate.toISOString().slice(0, 10));

    const hasOnlyCashedStartDate =
      endDate === "" &&
      cachedDates.includes(currentDate.toISOString().slice(0, 10));

    switch (true) {
      case hasBothDates:
        while (currentDate <= new Date(endDate)) {
          if (!cachedDates.includes(currentDate.toISOString().slice(0, 10))) {
            datesForRequest.push(formatDate(currentDate));
          }
          selectedDates.push(formatDate(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
        dispatch({
          type: "UPDATE_DATE_SELECTION",
          payload: selectedDates,
        });
        return datesForRequest;

      case hasOnlyNewStartDate:
        dispatch({
          type: "UPDATE_DATE_SELECTION",
          payload: [currentDate.toISOString().slice(0, 10)],
        });
        return [currentDate.toISOString().slice(0, 10)];

      case hasOnlyCashedStartDate:
        dispatch({
          type: "UPDATE_DATE_SELECTION",
          payload: [currentDate.toISOString().slice(0, 10)],
        });
    }
    return [];
  };

  useEffect(() => {
    const fetchData = async () => {
      if (formValues.dateFrom) {
        const newSelectedDates = getDatesInRange(
          formValues.dateFrom,
          formValues.dateTo,
          dispatch
        );
        for (const date of newSelectedDates) {
          try {
            setRequestCount((prevCount) => prevCount + 1);
            const response = await axios.get(
              `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/rub.json`
            );
            dispatch({
              type: CurreniesActionTypes.FETCH_CURRENCY,
              payload: {
                dateWithCosts: {
                  date: response.data.date,
                  eur: 1 / response.data.rub.eur,
                  usd: 1 / response.data.rub.usd,
                  cny: 1 / response.data.rub.cny,
                },
              },
            });
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      }
    };

    fetchData();
  }, [dispatch, formValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;

    if (type === "checkbox") {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: checked,
        dateFrom: allCurrenciesUnchecked ? "" : prevFormValues.dateFrom,
        dateTo: allCurrenciesUnchecked ? "" : prevFormValues.dateTo,
      }));

      dispatch({
        type: "UPDATE_CURRENCY_SELECTION",
        payload: { name, selected: checked },
      });
    } else {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: value,
      }));
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const getThirtyDaysAgoDate = (): string => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 29);
    return thirtyDaysAgo.toISOString().split("T")[0];
  };

  const handleClearDates = (e: React.FormEvent) => {
    e.preventDefault();
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      dateFrom: "",
      dateTo: "",
    }));
    dispatch({
      type: "UPDATE_DATE_SELECTION",
      payload: [],
    });
  };

  return (
    <form className="currencies-form">
      <div className="currencies-form__fields-block">
        <CheckboxField
          name="eur"
          label="Евро"
          checked={formValues.eur}
          onChange={handleChange}
        />
        <CheckboxField
          name="usd"
          label="Доллар"
          checked={formValues.usd}
          onChange={handleChange}
        />
        <CheckboxField
          name="cny"
          label="Юань"
          checked={formValues.cny}
          onChange={handleChange}
        />
        <InputDateField
          name="dateFrom"
          label="Дата с"
          value={formValues.dateFrom}
          onChange={handleChange}
          minDate={getThirtyDaysAgoDate()}
          maxDate={formValues.dateTo || today}
        />
        <InputDateField
          name="dateTo"
          label="Дата по"
          value={formValues.dateTo}
          onChange={handleChange}
          disabled={!formValues.dateFrom}
          minDate={formValues.dateFrom}
          maxDate={today}
        />
        <Button onClick={handleClearDates}>Очистить даты</Button>
      </div>
      <Message>Число запросов в API: {requestCount}</Message>
    </form>
  );
};
