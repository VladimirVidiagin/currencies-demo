import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import { useTypedSelector } from "../../app/hooks/useTypedSelector";
import { CurrencyTypes } from "../../app/types/currencies";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

export const CurrenciesChart: React.FC = () => {
  const { selectedDates, selectedCurrencies, cachedCurrenciesData } =
    useTypedSelector((state) => state.currencies);

  function getColor(
    currencyType: CurrencyTypes.eur | CurrencyTypes.usd | CurrencyTypes.cny
  ) {
    switch (currencyType) {
      case CurrencyTypes.eur:
        return "orange";
      case CurrencyTypes.usd:
        return "green";
      case CurrencyTypes.cny:
        return "red";
      default:
        return "grey";
    }
  }

  const datasets = selectedCurrencies.map((currency) => {
    return {
      label: currency?.name.toLocaleUpperCase(),
      data: currency.selected
        ? cachedCurrenciesData?.map((day) => day[currency.name])
        : [],
      backgroundColor: getColor(currency.name),
      borderColor: getColor(currency.name),
      pointBorderColor: getColor(currency.name),
      tension: 0.4,
    };
  });

  function formatDate(inputDate: string) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}.${formattedMonth}.${year}`;
  }

  const labels = selectedDates?.map((day) => formatDate(day));

  const data = {
    labels,
    datasets,
  };

  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="currencies-chart-block">
      <Line data={data} options={options}></Line>
    </div>
  );
};

export default CurrenciesChart;
