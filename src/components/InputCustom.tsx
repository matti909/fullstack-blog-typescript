import { FC, InputHTMLAttributes } from "react";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type: string;
  error?: string;
}

const InputCustom: FC<inputProps> = ({ label, name, ...rest }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        {...rest}
        className="block font-medium text-slate-900 rounded-md outline-1 -outline-offset-1 outline-slate-400 border p-2 "
      />
    </div>
  );
};

export default InputCustom;
