import { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

const TECHNOLOGIES = [
  "HTML", "CSS", "JavaScript", "TypeScript", "React", "Vue", "Angular",
  "Node.js", "Express", "Next.js", "Tailwind CSS", "SASS", "Bootstrap"
];

const CreateProfileForm = () => {
  const { saveProfile } = usePortfolio();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    userType: "individual",
    technologies: [] as string[],
    monthlyEarnings: 100000,
    trustLevel: 80,
    portfolioType: "frontend",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfile(formData as any);
    toast({
      title: "Профиль сохранен",
      description: "Ваш профиль был успешно создан и сохранен",
    });
    setOpen(false);
    setFormData({
      name: "",
      description: "",
      userType: "individual",
      technologies: [],
      monthlyEarnings: 100000,
      trustLevel: 80,
      portfolioType: "frontend",
    });
  };

  const handleTechnologyToggle = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter(t => t !== tech)
        : [...prev.technologies, tech]
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">New Profile</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Тип пользователя</Label>
            <Select
              value={formData.userType}
              onValueChange={(value: any) => setFormData(prev => ({ ...prev, userType: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose type user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="company">Company</SelectItem>
                <SelectItem value="freelancer">Freelancer</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="agency">Agency</SelectItem>
                <SelectItem value="startup">Startup</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Type portfolio</Label>
            <Select
              value={formData.portfolioType}
              onValueChange={(value: any) => setFormData(prev => ({ ...prev, portfolioType: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип портфолио" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="frontend">Frontend</SelectItem>
                <SelectItem value="backend">Backend</SelectItem>
                <SelectItem value="fullstack">Fullstack</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
                <SelectItem value="design">Design</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Технологии</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {TECHNOLOGIES.map((tech) => (
                <div key={tech} className="flex items-center space-x-2">
                  <Checkbox
                    id={tech}
                    checked={formData.technologies.includes(tech)}
                    onCheckedChange={() => handleTechnologyToggle(tech)}
                  />
                  <label
                    htmlFor={tech}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {tech}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="earnings">Monthly Income (₴)</Label>
            <Input
              id="earnings"
              type="number"
              value={formData.monthlyEarnings}
              onChange={(e) => setFormData(prev => ({ ...prev, monthlyEarnings: Number(e.target.value) }))}
            />
          </div>

          <div className="space-y-2">
            <Label>Уровень доверия ({formData.trustLevel}%)</Label>
            <Slider
              value={[formData.trustLevel]}
              onValueChange={(value) => setFormData(prev => ({ ...prev, trustLevel: value[0] }))}
              max={100}
              step={1}
            />
          </div>

          <Button type="submit" className="w-full">
            Save profile
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProfileForm;