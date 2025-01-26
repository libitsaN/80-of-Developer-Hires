import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePortfolio } from "@/context/PortfolioContext";
import { useToast } from "@/components/ui/use-toast";
import { User, Briefcase } from "lucide-react";

interface UserCardProps {
  name: string;
  description: string;
  userType: string;
  technologies: string[];
  monthlyEarnings?: number;
  trustLevel?: number;
  portfolioType?: "frontend" | "backend" | "fullstack" | "mobile" | "design";
}

const UserCard = ({ 
  name, 
  description, 
  userType, 
  technologies,
  monthlyEarnings = 120000,
  trustLevel = 85,
  portfolioType = "frontend"
}: UserCardProps) => {
  const { setSelectedPortfolio } = usePortfolio();
  const { toast } = useToast();

  const handleClick = () => {
    setSelectedPortfolio({
      name,
      description,
      userType: userType as any,
      technologies,
      monthlyEarnings,
      trustLevel,
      portfolioType,
    });
    
    toast({
      title: "Portfolio Updated",
      description: `Now showing ${name}'s portfolio`,
    });
  };

  return (
    <Card 
      className="w-full hover:shadow-2xl transition-all duration-300 cursor-pointer glass-card hover-scale glow" 
      onClick={handleClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-white/80" />
            <CardTitle className="text-white">{name}</CardTitle>
          </div>
          <Badge variant="outline" className="bg-gradient-to-r from-red-700/30 to-red-600/30 text-white border-white/20">
            <Briefcase className="h-3 w-3 mr-1" />
            {userType}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4 text-white/80">{description}</CardDescription>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge 
              key={tech} 
              variant="outline" 
              className="bg-gradient-to-r from-red-700/30 to-red-600/30 text-white border-white/20 hover:border-white/40 transition-colors duration-300"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;