import Subheader from "../../shared/Subheader/Subheader";
import CurrenciesChart from "../../widgets/CurrenciesChart/CurrenciesChart";

import { CurrenciesForm } from "../../widgets/CurrenciesForm/CurrenciesForm";

export const CurrenciesPage: React.FC = () => {
  return (
    <div className="currencies-page">
      <Subheader>
        Отслеживайте динамику стоимости валют в рублях за последние 30 дней
      </Subheader>
      <main className="currencies-page__body">
        <CurrenciesForm />
        <CurrenciesChart />
      </main>
    </div>
  );
};
