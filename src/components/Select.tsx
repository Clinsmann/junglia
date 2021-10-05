interface SelectProps {
  value: any;
  options: string[];
  onChange: (e: any) => any;
}

const Select: React.FC<SelectProps> = ({ options, onChange, value }) => (
  <select
    value={value}
    onChange={onChange}>
    {options.map((value, index) => (<option key={value} value={index + 1}>{value}</option>))}
  </select>
);

export default Select;
