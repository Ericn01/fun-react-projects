import type { InputFieldProps } from "../types/InputFieldProps"

// General input field class 
const InputField = ({
    label, 
    id,
    onChange, 
    value,
    type="text",
    placeholder,
}: InputFieldProps) => {
    const labelStyle = "block text-sm font-medium text-gray-700"
    const inputStyle = "w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition duration-200"

    return (
        <div className="space-y-1">
            <label htmlFor={id} className={labelStyle}>
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className={inputStyle}
            >
            
            </input>
        </div>
    )
}

export default InputField;