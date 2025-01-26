import { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, Save, ArrowLeft, Code, Briefcase, User, Settings } from "lucide-react";

const TECHNOLOGIES = [
  "HTML", "CSS", "JavaScript", "TypeScript", "React", "Vue", "Angular",
  "Node.js", "Express", "Next.js", "Tailwind CSS", "SASS", "Bootstrap"
];

const Admin = () => {
  const { portfolioData, updatePortfolio } = usePortfolio();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = () => {
    if (password === "admin") {
      setIsAuthenticated(true);
      toast({
        title: "Успешно",
        description: "Вы вошли в панель управления",
      });
    } else {
      toast({
        title: "Ошибка",
        description: "Неверный пароль",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Успешно",
      description: "Портфолио обновлено",
    });
  };

  const handleTechnologyToggle = (tech: string) => {
    const newTechnologies = portfolioData.technologies.includes(tech)
      ? portfolioData.technologies.filter(t => t !== tech)
      : [...portfolioData.technologies, tech];
    updatePortfolio({ technologies: newTechnologies });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 admin-panel">
        <Card className="w-full max-w-md admin-card fade-in">
          <div className="flex justify-center mb-6">
            <Lock className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Панель управления
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="admin-label">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-input"
                placeholder="Введите пароль"
              />
            </div>
            <Button className="admin-button w-full" onClick={handleAuth}>
              Войти
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen admin-panel py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
            className="admin-button flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Вернуться
          </Button>
          <h1 className="text-3xl font-bold text-white">Панель управления</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="admin-card">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-red-500" />
              <h2 className="text-xl font-semibold text-white">Основная информация</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="admin-label">Имя</Label>
                <Input
                  id="name"
                  value={portfolioData.name}
                  onChange={(e) => updatePortfolio({ name: e.target.value })}
                  className="admin-input"
                />
              </div>

              <div>
                <Label htmlFor="description" className="admin-label">Описание</Label>
                <Textarea
                  id="description"
                  value={portfolioData.description}
                  onChange={(e) => updatePortfolio({ description: e.target.value })}
                  className="admin-input min-h-[100px]"
                />
              </div>
            </div>
          </Card>

          <Card className="admin-card">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-red-500" />
              <h2 className="text-xl font-semibold text-white">Профессиональная информация</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="userType" className="admin-label">Тип пользователя</Label>
                <Select
                  value={portfolioData.userType}
                  onValueChange={(value: typeof portfolioData.userType) =>
                    updatePortfolio({ userType: value })
                  }
                >
                  <SelectTrigger className="admin-input">
                    <SelectValue placeholder="Выберите тип пользователя" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Частное лицо</SelectItem>
                    <SelectItem value="company">Компания</SelectItem>
                    <SelectItem value="freelancer">Фрилансер</SelectItem>
                    <SelectItem value="student">Студент</SelectItem>
                    <SelectItem value="agency">Агентство</SelectItem>
                    <SelectItem value="startup">Стартап</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="portfolioType" className="admin-label">Тип портфолио</Label>
                <Select
                  value={portfolioData.portfolioType}
                  onValueChange={(value: typeof portfolioData.portfolioType) =>
                    updatePortfolio({ portfolioType: value })
                  }
                >
                  <SelectTrigger className="admin-input">
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
            </div>
          </Card>

          <Card className="admin-card">
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-5 h-5 text-red-500" />
              <h2 className="text-xl font-semibold text-white">Технологии</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {TECHNOLOGIES.map((tech) => (
                <div key={tech} className="flex items-center space-x-2">
                  <Checkbox
                    id={tech}
                    checked={portfolioData.technologies.includes(tech)}
                    onCheckedChange={() => handleTechnologyToggle(tech)}
                    className="border-white/20"
                  />
                  <label
                    htmlFor={tech}
                    className="text-sm text-white/90 cursor-pointer"
                  >
                    {tech}
                  </label>
                </div>
              ))}
            </div>
          </Card>

          <Card className="admin-card">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-red-500" />
              <h2 className="text-xl font-semibold text-white">Дополнительные настройки</h2>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="earnings" className="admin-label">Месячный доход (₴)</Label>
                <Input
                  id="earnings"
                  type="number"
                  value={portfolioData.monthlyEarnings}
                  onChange={(e) =>
                    updatePortfolio({ monthlyEarnings: Number(e.target.value) })
                  }
                  className="admin-input"
                />
              </div>

              <div>
                <Label className="admin-label">
                  Уровень доверия ({portfolioData.trustLevel}%)
                </Label>
                <Slider
                  value={[portfolioData.trustLevel]}
                  onValueChange={(value) => updatePortfolio({ trustLevel: value[0] })}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>
            </div>
          </Card>

          <Button type="submit" className="admin-button w-full flex items-center justify-center gap-2">
            <Save className="w-4 h-4" />
            Сохранить изменения
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Admin;