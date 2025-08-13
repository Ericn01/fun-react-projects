// Contact information section
export interface ContactInfo {
    fullName: string,
    location: string,
    phone: string,
    email: string,
    linkedIn?: string, // URL
    gitHub?: string // URL
}

export interface WorkExperience {
    workplace: string,
    jobTitle: string,
    jobDuties: string[], // For bullet points 
    startDate: string,
    endDate?: string, 
}

export interface Education {
    place: string, 
    educationTitle: string,
    gpa?: number,
    startDate: string,
    endDate?: string,
}


export interface ResumeForm {
    contact: ContactInfo,
    summary: string,
    workExperience: WorkExperience[],
    education: Education[],
    skills?: string[],
    certifications?: string[],
}