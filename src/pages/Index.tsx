import { useState } from "react";
import { SalaryPredictionForm } from "@/components/SalaryPredictionForm";
import { SalaryResult } from "@/components/SalaryResult";
import { simulateApiCall } from "@/utils/salaryCalculator";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Users, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-salary-prediction.jpg";

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

const Index = () => {
  const [prediction, setPrediction] = useState<SalaryPrediction | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = async (data: FormData) => {
    setIsLoading(true);
    setFormData(data);
    
    try {
      const result = await simulateApiCall(data);
      setPrediction(result);
      
      toast({
        title: "Prediction Complete!",
        description: `Estimated salary: $${result.avgSalary.toLocaleString()}`,
      });
    } catch (error) {
      toast({
        title: "Prediction Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetPrediction = () => {
    setPrediction(null);
    setFormData(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-subtle py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-success/5" />
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Salary
                  <span className="bg-gradient-primary bg-clip-text text-transparent"> Whisperer</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Get accurate salary predictions based on your experience, education, and market data. 
                  Make informed career decisions with AI-powered insights.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium">AI-Powered Analysis</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-success" />
                  </div>
                  <span className="font-medium">Market Insights</span>
                </div>
              </div>

              {!prediction && (
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground mb-4">Ready to discover your market value?</p>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-sm bg-muted px-3 py-2 rounded-full">
                      <Users className="w-4 h-4" />
                      500K+ Predictions
                    </div>
                    <div className="flex items-center gap-2 text-sm bg-muted px-3 py-2 rounded-full">
                      <MapPin className="w-4 h-4" />
                      Global Coverage
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Salary Analysis Dashboard" 
                className="w-full h-auto rounded-2xl shadow-elegant"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {!prediction ? (
            <SalaryPredictionForm onPredict={handlePredict} isLoading={isLoading} />
          ) : (
            <div className="space-y-8">
              <div className="text-center">
                <Button 
                  onClick={resetPrediction} 
                  variant="outline" 
                  className="mb-8"
                >
                  ← New Prediction
                </Button>
              </div>
              <SalaryResult prediction={prediction} formData={formData!} />
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8 px-4 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">
            Salary predictions are estimates based on market data and should be used as guidance only.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
