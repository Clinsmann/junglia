import { ITurbineDetail } from "../api/utils/interfaces";
import TurbineDetail from "./TurbineDetail";

interface ITurbineCard extends ITurbineDetail { }

const threshold: number = parseInt(String(process.env.REACT_APP_GOOD_AVAILABILITY_THRESHOLD));

const TurbineCard: React.FC<ITurbineCard> = ({
  month,
  availability,
  worstTurbine,
  totalEnergyLost,
  totalEnergyProduced,
}) => (
  <div className="p-5 rounded-lg" style={{ backgroundColor: "#363D4D" }}>
    <div className="text-white w-full text-center pb-5">{month}</div>
    <TurbineDetail caption="Energy produced" value={String(totalEnergyProduced)} unit={true} />
    <TurbineDetail caption="Energy lost" value={String(totalEnergyLost)} unit={true} />
    <TurbineDetail caption="Availability" value={availability + "%"}
      color={parseFloat(availability) > threshold ? 'text-green-500' : 'text-red-500'} />
    <TurbineDetail caption="Worst turbine" value={worstTurbine} />
  </div>
);

export default TurbineCard;
