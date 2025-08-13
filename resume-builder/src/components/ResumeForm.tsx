
import InputField from "./InputField";

const ResumeForm = ({formData, setFormData} : any) => {
    const updateField = (field: string, value: string) => {
        setFormData((prev) => ({...prev, [field]: value}))
    };
    
    return (
        <form className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6">
            {/* Name */}
            <InputField 
                label="Full Name"
                id="fullName"
                value={formData.fullName}
                onChange={(val) => updateField("fullName", val)}
                placeholder="John Doe"
            />

            {/* Email */}
            <InputField
                label="Email"
                id="email"
                type="email"
                value={formData.email}
                onChange={(val) => updateField("email", val)}
                placeholder="john.doe567@gmail.com"
            />
        </form>
    );
}