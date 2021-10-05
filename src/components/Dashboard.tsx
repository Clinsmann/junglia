import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import _ from 'underscore';
import { getAvailabilityDetails } from '../api';

const Dashboard: React.FC = () => {
  const [endMonth, setEndMonth] = useState<number>(5);
  const [startMonth, setStartMonth] = useState<number>(1);
  const [availability, setAvailability] = useState<any>();

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
          availability: parseFloat("" + availability).toFixed(2) + "%"
        })

      });

      setAvailability(result);
    }
  }, [data, isSuccess]);

  return (
    <div>
      {isLoading ? (
        <span>loading...</span>
      ) : (
        availability && (
          <>
            {/* <div>
              username: {`${user.name.title} ${user.name.first} ${user.name.last}`}
            </div>
            <img src={user.picture.thumbnail} alt="" /> */}
          </>
        )
      )}
    </div>
  );
}

export default Dashboard;
