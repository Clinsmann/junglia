export interface ITurbineDetail {
  month: string;
  worstTurbine: string;
  availability: string;
  totalEnergyLost: number;
  totalEnergyProduced: number;
}

export interface TurbineCardProps extends ITurbineDetail { }