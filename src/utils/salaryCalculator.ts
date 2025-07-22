interface FormData {
  yearsExperience: number;
  education: string;
  jobRole: string;
  location: string;
  companySize: string;
}

interface SalaryPrediction {
  minSalary: number;
  maxSalary: number;
  avgSalary: number;
  confidence: number;
  factors: {
    experience: number;
    education: number;
    role: number;
    location: number;
    company: number;
  };
}

// Base salary data by job role
const baseSalaries: Record<string, number> = {
  'software-engineer': 95000,
  'data-scientist': 110000,
  'product-manager': 120000,
  'designer': 80000,
  'marketing': 75000,
  'sales': 70000,
  'hr': 68000,
  'finance': 78000,
  'operations': 82000,
  'other': 70000,
};

// Education multipliers
const educationMultipliers: Record<string, number> = {
  'high-school': 0.85,
  'bachelor': 1.0,
  'master': 1.15,
  'phd': 1.25,
  'other': 0.95,
};

// Location multipliers (cost of living adjustments)
const locationMultipliers: Record<string, number> = {
  'san-francisco': 1.4,
  'new-york': 1.3,
  'seattle': 1.25,
  'boston': 1.2,
  'los-angeles': 1.15,
  'austin': 1.1,
  'chicago': 1.05,
  'denver': 1.0,
  'remote': 0.95,
  'other': 1.0,
};

// Company size multipliers
const companySizeMultipliers: Record<string, number> = {
  'startup': 0.9,
  'small': 0.95,
  'medium': 1.0,
  'large': 1.1,
  'enterprise': 1.2,
};

export const calculateSalary = (formData: FormData): SalaryPrediction => {
  const baseSalary = baseSalaries[formData.jobRole] || baseSalaries['other'];
  
  // Experience factor - significant impact
  const experienceMultiplier = Math.min(1 + (formData.yearsExperience * 0.06), 2.5);
  
  // Education factor
  const educationMultiplier = educationMultipliers[formData.education] || 1.0;
  
  // Location factor
  const locationMultiplier = locationMultipliers[formData.location] || 1.0;
  
  // Company size factor
  const companyMultiplier = companySizeMultipliers[formData.companySize] || 1.0;
  
  // Calculate final salary
  const calculatedSalary = Math.round(
    baseSalary * experienceMultiplier * educationMultiplier * locationMultiplier * companyMultiplier
  );
  
  // Create salary range (±15%)
  const minSalary = Math.round(calculatedSalary * 0.85);
  const maxSalary = Math.round(calculatedSalary * 1.15);
  
  // Calculate confidence based on data completeness and experience
  let confidence = 75; // Base confidence
  
  // Boost confidence for moderate experience (sweet spot for predictions)
  if (formData.yearsExperience >= 2 && formData.yearsExperience <= 15) {
    confidence += 10;
  }
  
  // High-demand locations increase confidence
  if (['san-francisco', 'new-york', 'seattle', 'boston'].includes(formData.location)) {
    confidence += 5;
  }
  
  // Tech roles have more reliable data
  if (['software-engineer', 'data-scientist', 'product-manager'].includes(formData.jobRole)) {
    confidence += 5;
  }
  
  // Cap confidence at 95%
  confidence = Math.min(confidence, 95);
  
  // Calculate factor contributions (as percentages)
  const totalMultiplier = experienceMultiplier * educationMultiplier * locationMultiplier * companyMultiplier;
  
  const factors = {
    experience: Math.round(((experienceMultiplier - 1) / (totalMultiplier - 1)) * 100),
    education: Math.round(((educationMultiplier - 1) / (totalMultiplier - 1)) * 100),
    role: Math.round((baseSalary / (baseSalary * totalMultiplier)) * 100),
    location: Math.round(((locationMultiplier - 1) / (totalMultiplier - 1)) * 100),
    company: Math.round(((companyMultiplier - 1) / (totalMultiplier - 1)) * 100),
  };
  
  // Normalize factors to ensure they're realistic percentages
  const normalizedFactors = {
    experience: Math.max(20, Math.min(40, 20 + formData.yearsExperience * 0.8)),
    education: Math.round(((educationMultiplier - 0.85) / 0.4) * 15) + 10,
    role: 25,
    location: Math.round(((locationMultiplier - 0.95) / 0.45) * 15) + 10,
    company: Math.round(((companyMultiplier - 0.9) / 0.3) * 10) + 8,
  };
  
  return {
    minSalary,
    maxSalary,
    avgSalary: calculatedSalary,
    confidence,
    factors: normalizedFactors,
  };
};

// Simulate API delay for more realistic experience
export const simulateApiCall = (formData: FormData): Promise<SalaryPrediction> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(calculateSalary(formData));
    }, 2000); // 2 second delay
  });
};