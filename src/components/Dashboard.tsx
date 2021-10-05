import _ from 'underscore';

import Select from './Select';
import Loader from './Loader';
import TurbineCard from './TurbineCard';
import { MONTHS } from '../utils/constants';
import useTurbineFacts from '../hooks/useTurbineFacts';
import { ITurbineDetail } from '../utils/interfaces';

const Dashboard: React.FC = () => {
  const {
    endMonth,
    startMonth,
    setEndMonth,
    setStartMonth,
    isLoading,
    availability,
  } = useTurbineFacts();

  return (
    <div>
      <div className="pt-5 text-center ">
        <div className="border border-gray-500 mt-5 pt-3 pb-5 px-5 inline-block rounded-lg">
          <div className="muted-text m-0 pb-3">Show data between</div>
          <Select options={MONTHS} value={startMonth} onChange={(e: any) => setStartMonth(e.target.value)} />
          <span className="muted-text px-5">and</span>
          <Select options={MONTHS} value={endMonth} onChange={(e: any) => setEndMonth(e.target.value)} />
        </div>
      </div>
      <h1 className="text-white px-10 pt-10 font-semibold uppercase">Monthly Metrics:</h1>

      {isLoading ? (
        <div className="px-16 py-16 flex justify-center ">
          <Loader />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4 pt-6 pb-16 px-10">
          {availability && (
            availability.map(({
              month,
              availability,
              worstTurbine,
              totalEnergyLost,
              totalEnergyProduced, }: ITurbineDetail) => (
              <TurbineCard
                key={month}
                month={month}
                worstTurbine={worstTurbine}
                availability={availability}
                totalEnergyLost={totalEnergyLost}
                totalEnergyProduced={totalEnergyProduced} />
            ))
          )}
        </div>
      )}
    </div >
  );
}

export default Dashboard;
