interface SelectProps {
  value: any;
  options: string[];
  onChange: (e: any) => any;
}

const Select: React.FC<SelectProps> = ({ options, onChange, value }) => (
  <select
    style={{ backgroundColor: "#363D4D" }}
    className="text-white px-1 py-2"
    value={value}
    onChange={onChange}>
    {options.map((value, index) => (<option key={value} value={index + 1}>{value}</option>))}
  </select>
);

export default Select;
