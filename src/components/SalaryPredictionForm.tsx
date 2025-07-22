import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, TrendingUp } from "lucide-react";

interface FormData {
  yearsExperience: number;
  education: string;
  jobRole: string;
  location: string;
  companySize: string;
}

interface SalaryPredictionFormProps {
  onPredict: (formData: FormData) => void;
  isLoading?: boolean;
}

export const SalaryPredictionForm = ({ onPredict, isLoading = false }: SalaryPredictionFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    yearsExperience: 0,
    education: "",
    jobRole: "",
    location: "",
    companySize: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (formData.yearsExperience < 0 || formData.yearsExperience > 50) {
      newErrors.yearsExperience = 0;
    }
    if (!formData.education) newErrors.education = "";
    if (!formData.jobRole) newErrors.jobRole = "";
    if (!formData.location) newErrors.location = "";
    if (!formData.companySize) newErrors.companySize = "";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onPredict(formData);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-card">
      <CardHeader className="text-center bg-gradient-subtle">
        <div className="mx-auto mb-4 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
          <Calculator className="w-6 h-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold">Salary Prediction</CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter your professional details to get an estimated salary range
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                value={formData.yearsExperience}
                onChange={(e) =>
                  setFormData({ ...formData, yearsExperience: parseInt(e.target.value) || 0 })
                }
                className={errors.yearsExperience !== undefined ? "border-destructive" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label>Education Level</Label>
              <Select 
                value={formData.education} 
                onValueChange={(value) => setFormData({ ...formData, education: value })}
              >
                <SelectTrigger className={errors.education !== undefined ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high-school">High School</SelectItem>
                  <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                  <SelectItem value="master">Master's Degree</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Job Role</Label>
              <Select 
                value={formData.jobRole} 
                onValueChange={(value) => setFormData({ ...formData, jobRole: value })}
              >
                <SelectTrigger className={errors.jobRole !== undefined ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select job role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="software-engineer">Software Engineer</SelectItem>
                  <SelectItem value="data-scientist">Data Scientist</SelectItem>
                  <SelectItem value="product-manager">Product Manager</SelectItem>
                  <SelectItem value="designer">UX/UI Designer</SelectItem>
                  <SelectItem value="marketing">Marketing Manager</SelectItem>
                  <SelectItem value="sales">Sales Representative</SelectItem>
                  <SelectItem value="hr">HR Manager</SelectItem>
                  <SelectItem value="finance">Financial Analyst</SelectItem>
                  <SelectItem value="operations">Operations Manager</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Select 
                value={formData.location} 
                onValueChange={(value) => setFormData({ ...formData, location: value })}
              >
                <SelectTrigger className={errors.location !== undefined ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="san-francisco">San Francisco, CA</SelectItem>
                  <SelectItem value="new-york">New York, NY</SelectItem>
                  <SelectItem value="seattle">Seattle, WA</SelectItem>
                  <SelectItem value="austin">Austin, TX</SelectItem>
                  <SelectItem value="chicago">Chicago, IL</SelectItem>
                  <SelectItem value="boston">Boston, MA</SelectItem>
                  <SelectItem value="los-angeles">Los Angeles, CA</SelectItem>
                  <SelectItem value="denver">Denver, CO</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Company Size</Label>
              <Select 
                value={formData.companySize} 
                onValueChange={(value) => setFormData({ ...formData, companySize: value })}
              >
                <SelectTrigger className={errors.companySize !== undefined ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="startup">Startup (1-50 employees)</SelectItem>
                  <SelectItem value="small">Small (51-200 employees)</SelectItem>
                  <SelectItem value="medium">Medium (201-1000 employees)</SelectItem>
                  <SelectItem value="large">Large (1001-5000 employees)</SelectItem>
                  <SelectItem value="enterprise">Enterprise (5000+ employees)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:opacity-90 transition-smooth"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Predicting Salary...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Predict Salary
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};