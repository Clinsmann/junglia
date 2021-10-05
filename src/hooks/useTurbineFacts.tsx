import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import _ from "underscore";
import { getAvailabilityDetails } from "../api";
import { ITurbineDetail } from "../utils/interfaces";

const useTurbineFacts = () => {

  const [endMonth, setEndMonth] = useState<number>(5);
  const [startMonth, setStartMonth] = useState<number>(1);
  const [availability, setAvailability] = useState<ITurbineDetail[]>();
  const { isLoading, data, isSuccess } = useQuery<any>(['availability', { startMonth, endMonth }], getAvailabilityDetails);

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

  return {
    endMonth,
    startMonth,
    setEndMonth,
    setStartMonth,
    isLoading,
    availability,
  }
};

export default useTurbineFacts;
