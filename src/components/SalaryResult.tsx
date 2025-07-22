import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Award, MapPin, Building2 } from "lucide-react";

interface SalaryResultProps {
  prediction: {
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
  };
  formData: {
    yearsExperience: number;
    education: string;
    jobRole: string;
    location: string;
    companySize: string;
  };
}

export const SalaryResult = ({ prediction, formData }: SalaryResultProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "bg-success";
    if (confidence >= 60) return "bg-warning";
    return "bg-destructive";
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 80) return "High";
    if (confidence >= 60) return "Medium";
    return "Low";
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Main Prediction Card */}
      <Card className="shadow-elegant bg-gradient-subtle">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-success-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold text-foreground">
            {formatCurrency(prediction.avgSalary)}
          </CardTitle>
          <CardDescription className="text-lg">
            Estimated Annual Salary
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Salary Range */}
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">Salary Range</p>
            <div className="flex items-center justify-center gap-4 text-lg">
              <span className="font-semibold">{formatCurrency(prediction.minSalary)}</span>
              <span className="text-muted-foreground">—</span>
              <span className="font-semibold">{formatCurrency(prediction.maxSalary)}</span>
            </div>
          </div>

          {/* Confidence Score */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Prediction Confidence</span>
              <Badge className={`${getConfidenceColor(prediction.confidence)} text-white`}>
                {getConfidenceLabel(prediction.confidence)} ({prediction.confidence}%)
              </Badge>
            </div>
            <Progress value={prediction.confidence} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Factor Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Salary Factors
            </CardTitle>
            <CardDescription>
              How different factors influence your salary
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Experience Level</span>
                <span className="text-sm font-medium">{prediction.factors.experience}%</span>
              </div>
              <Progress value={prediction.factors.experience} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Education</span>
                <span className="text-sm font-medium">{prediction.factors.education}%</span>
              </div>
              <Progress value={prediction.factors.education} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Job Role</span>
                <span className="text-sm font-medium">{prediction.factors.role}%</span>
              </div>
              <Progress value={prediction.factors.role} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Location</span>
                <span className="text-sm font-medium">{prediction.factors.location}%</span>
              </div>
              <Progress value={prediction.factors.location} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Company Size</span>
                <span className="text-sm font-medium">{prediction.factors.company}%</span>
              </div>
              <Progress value={prediction.factors.company} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Profile Summary */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Your Profile
            </CardTitle>
            <CardDescription>
              Summary of your professional details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Award className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">
                  {formData.yearsExperience} {formData.yearsExperience === 1 ? 'Year' : 'Years'} Experience
                </p>
                <p className="text-sm text-muted-foreground capitalize">
                  {formData.education.replace('-', ' ')} • {formData.jobRole.replace('-', ' ')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium capitalize">
                  {formData.location.replace('-', ' ')}
                </p>
                <p className="text-sm text-muted-foreground capitalize">
                  {formData.companySize.replace('-', ' ')} Company
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};