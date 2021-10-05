import { THRESHOLD } from "../utils/constants";
import { TurbineCardProps } from "../utils/interfaces";
import TurbineDetail from "./TurbineDetail";

const SummaryCard: React.FC<TurbineCardProps> = ({
  month,
  availability,
  worstTurbine,
  totalEnergyLost,
  totalEnergyProduced,
}) => (
  <div className="p-5 rounded-lg">
    <div className="text-white w-full text-center pb-5">{month}</div>
    <TurbineDetail caption="Energy produced" value={String(totalEnergyProduced)} unit={true} />
    <TurbineDetail caption="Energy lost" value={String(totalEnergyLost)} unit={true} />
    <TurbineDetail caption="Availability" value={availability + "%"}
      color={parseFloat(availability) > THRESHOLD ? 'text-green-500' : 'text-red-500'} />
    <TurbineDetail caption="Worst turbine" value={worstTurbine} />
  </div>
);

export default SummaryCard;
