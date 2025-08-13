export interface InputFieldProps {
    label: string,
    id: string,
    onChange: (value: string) => void;
    value: string,
    type?: string;
    placeholder?: string;
};