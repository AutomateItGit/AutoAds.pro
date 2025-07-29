"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Users,
  DollarSign,
  Image as ImageIcon,
  ArrowRight,
  ArrowLeft,
  Facebook,
  Chrome,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

const steps = [
  {
    id: "objective",
    title: "Campaign Objective",
    description: "What's your marketing objective?",
  },
  {
    id: "platform",
    title: "Choose Platform",
    description: "Where do you want to advertise?",
  },
  {
    id: "audience",
    title: "Define Audience",
    description: "Who do you want to reach?",
  },
  {
    id: "budget",
    title: "Budget & Schedule",
    description: "Set your budget and campaign duration",
  },
  {
    id: "creative",
    title: "Ad Creative",
    description: "Create your ad content",
  },
];

const objectives = [
  {
    id: "awareness",
    title: "Brand Awareness",
    description: "Increase awareness for your brand",
    icon: Users,
  },
  {
    id: "traffic",
    title: "Website Traffic",
    description: "Drive traffic to your website",
    icon: Target,
  },
  {
    id: "conversions",
    title: "Conversions",
    description: "Generate leads and sales",
    icon: DollarSign,
  },
];

const platforms = [
  {
    id: "facebook",
    title: "Facebook Ads",
    description: "Reach billions of Facebook users",
    icon: Facebook,
  },
  {
    id: "google",
    title: "Google Ads",
    description: "Advertise on Google Search and Display Network",
    icon: Chrome,
  },
];

export default function CreateCampaign() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    objective: "",
    platform: "",
    audience: {
      locations: "",
      ageRange: "",
      interests: "",
      gender: "all",
    },
    budget: {
      amount: "",
      duration: "30",
    },
    creative: {
      headline: "",
      description: "",
      image: null,
    },
  });

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form
      console.log("Form submitted:", formData);
      router.push("/dashboard/ads/campaigns");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {objectives.map((objective) => (
              <div
                key={objective.id}
                className={`cursor-pointer rounded-lg border-2 p-6 ${
                  formData.objective === objective.id
                    ? "border-primary-100 bg-primary-900"
                    : "border-gray-200 hover:border-primary-100"
                }`}
                onClick={() => updateFormData("objective", objective.id)}
              >
                <objective.icon className="h-8 w-8 mb-4 text-primary-100" />
                <h3 className="text-lg font-medium mb-2">{objective.title}</h3>
                <p className="text-gray-500">{objective.description}</p>
              </div>
            ))}
          </div>
        );

      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {platforms.map((platform) => (
              <div
                key={platform.id}
                className={`cursor-pointer rounded-lg border-2 p-6 ${
                  formData.platform === platform.id
                    ? "border-primary-100 bg-primary-900"
                    : "border-gray-200 hover:border-primary-100"
                }`}
                onClick={() => updateFormData("platform", platform.id)}
              >
                <platform.icon className="h-8 w-8 mb-4 text-primary-100" />
                <h3 className="text-lg font-medium mb-2">{platform.title}</h3>
                <p className="text-gray-500">{platform.description}</p>
              </div>
            ))}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="locations">Locations</Label>
                <Input
                  id="locations"
                  placeholder="Enter locations"
                  value={formData.audience.locations}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      audience: {
                        ...prev.audience,
                        locations: e.target.value,
                      },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ageRange">Age Range</Label>
                <Input
                  id="ageRange"
                  placeholder="e.g., 25-54"
                  value={formData.audience.ageRange}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      audience: {
                        ...prev.audience,
                        ageRange: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="interests">Interests</Label>
              <Input
                id="interests"
                placeholder="Enter interests"
                value={formData.audience.interests}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    audience: {
                      ...prev.audience,
                      interests: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={formData.audience.gender}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    audience: {
                      ...prev.audience,
                      gender: value,
                    },
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="budget">Daily Budget</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">$</span>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="50"
                    className="pl-8"
                    value={formData.budget.amount}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        budget: {
                          ...prev.budget,
                          amount: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (days)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="30"
                  value={formData.budget.duration}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      budget: {
                        ...prev.budget,
                        duration: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="headline">Ad Headline</Label>
              <Input
                id="headline"
                placeholder="Enter your headline"
                value={formData.creative.headline}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    creative: {
                      ...prev.creative,
                      headline: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Ad Description</Label>
              <Textarea
                id="description"
                placeholder="Enter your ad description"
                value={formData.creative.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    creative: {
                      ...prev.creative,
                      description: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Ad Image</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <ImageIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">
                  Drag and drop an image here, or click to select
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Progress Steps */}
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center ${
              index < steps.length - 1 ? "flex-1" : ""
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStep
                  ? "bg-primary-100 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-4 ${
                  index < currentStep ? "bg-primary-100" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-2xl font-bold mb-2">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-500 mb-6">
              {steps[currentStep].description}
            </p>
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleNext}>
          {currentStep === steps.length - 1 ? "Create Campaign" : "Next"}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
