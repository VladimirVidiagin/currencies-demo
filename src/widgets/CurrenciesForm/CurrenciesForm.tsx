import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CheckboxField } from "../../shared/CheckboxField/CheckboxField";
import { InputDateField } from "../../shared/InputDateField/InputDateField";
import { CurreniesActionTypes } from "../../app/types/currencies";
import Message from "../../shared/Message/Message";
import Button from "../../shared/Button/Button";

export const CurrenciesForm: React.FC = () => {
  const dispatch = useDispatch();

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

  const [requestCount, setRequestCount] = useState(0);
  const getDatesInRange = (startDate: string, endDate: string): string[] => {
    const dates = [];
    let currentDate = new Date(startDate);

    if (!endDate) {
      return [currentDate.toISOString().slice(0, 10)];
    }

    while (currentDate <= new Date(endDate)) {
      dates.push(currentDate.toISOString().slice(0, 10));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: CurreniesActionTypes.RESET_CURRENCIES });
      if (formValues.dateFrom) {
        const dates = getDatesInRange(formValues.dateFrom, formValues.dateTo);
        const selectedCurrencies = Object.keys(formValues).filter(
          (key) =>
            formValues[key as keyof FormValues] &&
            key !== "dateFrom" &&
            key !== "dateTo"
        );
        for (const date of dates) {
          try {
            setRequestCount((prevCount) => prevCount + 1);
            const response = await axios.get(
              `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/rub.json`
            );

            selectedCurrencies.map((currency: string) => {
              return dispatch({
                type: CurreniesActionTypes.FETCH_CURRENCY,
                payload: {
                  type: currency,
                  dateWithCost: {
                    date: response.data.date,
                    cost: 1 / response.data.rub[currency],
                  },
                },
              });
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
    } else {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: value,
      }));
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const areCheckboxesSelected =
    formValues.eur || formValues.usd || formValues.cny;

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
          disabled={!areCheckboxesSelected}
          minDate={getThirtyDaysAgoDate()}
          maxDate={formValues.dateTo || today}
        />
        <InputDateField
          name="dateTo"
          label="Дата по"
          value={formValues.dateTo}
          onChange={handleChange}
          disabled={!areCheckboxesSelected || !formValues.dateFrom}
          minDate={formValues.dateFrom}
          maxDate={today}
        />
        <Button onClick={handleClearDates}>Очистить даты</Button>
      </div>
      <Message>Число запросов в API: {requestCount}</Message>
    </form>
  );
};
