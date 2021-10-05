import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import _ from 'underscore';
import { getAvailabilityDetails } from '../api';
import { MONTHS } from '../utils/constants';
import { ITurbineDetail } from '../utils/interfaces';
import Loader from './Loader';
import Select from './Select';
import TurbineCard from './TurbineCard';

const Dashboard: React.FC = () => {
  const [endMonth, setEndMonth] = useState<number>(5);
  const [startMonth, setStartMonth] = useState<number>(1);
  const [availability, setAvailability] = useState<ITurbineDetail[]>();

  const query = useQuery<any>(['availability', { startMonth, endMonth }], getAvailabilityDetails);
  const { isLoading, data, isSuccess } = query;

  console.log({ endMonth, startMonth });

  useEffect(() => {
    if (isSuccess) {
      const groupedByMonth = _.groupBy(data?.data, ({ bucket }: any) => {
        return bucket.substring(0, 7);
      });

      const result: any[] = [];

      Object.values(groupedByMonth).forEach((groupValues) => {
        let totalEnergyLost = 0,
          totalEnergyProduced = 0,
          turbineAvailability = 100,
          worstTurbine = '';

        groupValues.forEach(({ energyLost, energyProduced, turbine }) => {
          totalEnergyLost = totalEnergyLost + energyLost;
          totalEnergyProduced = totalEnergyProduced + energyProduced;
          if ((energyProduced / (energyProduced + energyLost)) < turbineAvailability) {
            worstTurbine = turbine
          }
        });

        const availability: any = (totalEnergyProduced / (totalEnergyProduced + totalEnergyLost)) * 100;
        result.push({
          worstTurbine,
          totalEnergyLost,
          totalEnergyProduced,
          availability: availability.toFixed(2),
          month: new Date(groupValues[0].bucket).toLocaleString('en-us', { month: 'long' }),
        });

      });

      setAvailability(result);
    }
  }, [data, isSuccess]);

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
        <>

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
        </>
      )}
    </div >
  );
}

export default Dashboard;
