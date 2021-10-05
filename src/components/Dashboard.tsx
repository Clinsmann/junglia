import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import _ from 'underscore';
import { getAvailabilityDetails } from '../api';
import { ITurbineDetail } from '../api/utils/interfaces';
import TurbineCard from './TurbineCard';


const Dashboard: React.FC = () => {
  const [endMonth, setEndMonth] = useState<number>(5);
  const [startMonth, setStartMonth] = useState<number>(1);
  const [availability, setAvailability] = useState<ITurbineDetail[]>();

  const query = useQuery<any>(['availability', { startMonth, endMonth }], getAvailabilityDetails);
  const { isLoading, data, isSuccess } = query;

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
      {isLoading ? (
        <span>loading...</span>
      ) : (
        <>
          <h1 className="text-white px-10 pt-10 font-semibold uppercase">Monthly Metrics:</h1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4 pt-6 pb-16 px-10">
            {availability && (
              availability.map(({ worstTurbine, totalEnergyLost, totalEnergyProduced, availability, month }: ITurbineDetail) => (
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
