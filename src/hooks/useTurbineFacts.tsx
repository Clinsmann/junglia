import _ from "underscore";
import { useQuery } from "react-query";
import { useCallback, useEffect, useState } from "react";

import { getAvailabilityDetails } from "../api";
import { ITurbineDetail } from "../utils/interfaces";

const useTurbineFacts = () => {
  const [endMonth, setEndMonth] = useState<number>(1);
  const [startMonth, setStartMonth] = useState<number>(1);
  const [availability, setAvailability] = useState<ITurbineDetail[]>();

  const [summary, setSummary] = useState<any>();

  const validateMonth = useCallback(() => {
    const isValid = +endMonth >= +startMonth;
    if (!isValid) console.error("End month must be after start month.");
    return isValid;
  }, [startMonth, endMonth]);

  const { isLoading, data, isSuccess } = useQuery<any>(
    ['availability', { startMonth, endMonth }],
    getAvailabilityDetails, {
    refetchOnWindowFocus: false,
    enabled: validateMonth()
  });

  const cleanData = useCallback(() => {
    const result: any[] = [];
    const groupedByMonth = _.groupBy(data?.data, ({ bucket }: any) => bucket.substring(0, 7));

    Object.values(groupedByMonth).forEach((groupValues) => {
      let totalEnergyLost = 0,
        totalEnergyProduced = 0,
        turbineAvailability = 100,
        worstTurbine = '';

      groupValues.forEach(({ energyLost, energyProduced, turbine }) => {
        totalEnergyLost = totalEnergyLost + energyLost;
        totalEnergyProduced = totalEnergyProduced + energyProduced;
        if ((energyProduced / (energyProduced + energyLost)) < turbineAvailability) {
          worstTurbine = turbine;
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
    updateSummary(result);
    return result;
  }, [data]);

  const updateSummary = useCallback((result) => {
    let energyLost = 0,
      energyProduced = 0,
      turbineAvailability = 100;
    // worstTurbine = '';

    result.forEach(({ totalEnergyLost, totalEnergyProduced, worstTurbine }: any) => {
      energyLost = totalEnergyLost + energyLost;
      energyProduced = totalEnergyProduced + energyProduced;
      if ((energyProduced / (energyProduced + energyLost)) < turbineAvailability) {
        // worstTurbine = turbine;
      }
    });

    const availability: any = (energyProduced / (energyProduced + energyLost)) * 100;

    setSummary({
      energyLost,
      energyProduced,
      worstTurbine: result[0].worstTurbine,
      availability: availability.toFixed(2),
    })
  }, [])

  useEffect(() => {
    if (isSuccess) {
      const result = cleanData();
      setAvailability(result);
    }
  }, [data, isSuccess, cleanData]);

  return {
    summary,
    endMonth,
    startMonth,
    setEndMonth,
    setStartMonth,
    isLoading,
    availability,
  }
};

export default useTurbineFacts;
