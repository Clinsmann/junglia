interface TurbineDetailProps {
  unit?: boolean;
  value: string;
  color?: string;
  caption: string;
}

const TurbineDetail: React.FC<TurbineDetailProps> = ({ color, caption, value, unit = false }) => (
  <div className="text-white w-full mb-2 muted-text">
    {caption}: <span className={color || 'text-white'}>{value}</span> {unit && 'Mwh'}
  </div>
);

export default TurbineDetail;
