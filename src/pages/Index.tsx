import { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import UserCard from "@/components/UserCard";
import ProfileSearch from "@/components/ProfileSearch";
import CreateProfileForm from "@/components/CreateProfileForm";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarHeader,
  SidebarProvider 
} from "@/components/ui/sidebar";
import { useToast } from "@/components/ui/use-toast";
import { ChevronRight, Sparkles, TrendingUp, Users } from "lucide-react";

const Index = () => {
  const { portfolioData, savedProfiles } = usePortfolio();
  const navigate = useNavigate();
  const [filteredProfiles, setFilteredProfiles] = useState(savedProfiles);
  const { toast } = useToast();

  const handleSubscribe = async (plan: 'monthly' | 'yearly') => {
    try {
      // Здесь будет логика подписки
      toast({
        title: "Subscription",
        description: `Successfully subscribed to ${plan} plan!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process subscription. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your data is being prepared for export.",
    });
    // Здесь будет логика экспорта
  };



  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Left Sidebar */}
        <Sidebar className="w-72">
          <SidebarHeader className="p-6">
            <h2 className="text-2xl font-bold text-white mb-2">Developer Hires</h2>
            <p className="text-white/70 text-sm">Manage your professional presence</p>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <div className="p-6 space-y-4">
                <Button
                  variant="outline"
                  className="relative z-10 w-full bg-white/10 text-white hover:bg-white/20 border-white/20 hover:border-white/30 transition-all duration-300"
                  onClick={() => navigate("/admin")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Control Panel
                </Button>
                <CreateProfileForm />
                <Card className="p-4 glass-card hover-scale glow">
                  <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="relative z-10 w-full bg-gradient-to-r from-red-800/50 to-red-700/50 text-white hover:from-red-700/60 hover:to-red-600/60 border-white/20"
                      size="sm"
                      onClick={handleExportData}
                    >
                      Export Data
                    </Button>
                  </div>
                </Card>
              </div>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Main Portfolio Section */}
            <div className="text-center space-y-4 fade-in">
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                {portfolioData.name}
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                {portfolioData.description}
              </p>
            </div>

            {/* Portfolio Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 slide-up">
              <Card className="p-6 glass-card hover-scale glow">
                <h2 className="text-lg font-semibold text-white mb-2 flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
                  Monthly Income
                </h2>
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                  {portfolioData.monthlyEarnings.toLocaleString()} ₴
                </p>
              </Card>

              <Card className="p-6 glass-card hover-scale glow">
                <h2 className="text-lg font-semibold text-white mb-2">
                  Trust Level
                </h2>
                <Progress value={portfolioData.trustLevel} className="mb-2" />
                <p className="text-sm text-white/80">
                  {portfolioData.trustLevel}% of 100%
                </p>
              </Card>
            </div>

            {/* Technologies Section */}
            <Card className="p-6 glass-card slide-up hover-scale glow">
              <h2 className="text-lg font-semibold text-white mb-4">
                Technologies
              </h2>
              <div className="flex flex-wrap gap-2">
                {portfolioData.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-gradient-to-r from-red-700/30 to-red-600/30 text-white rounded-full text-sm border border-white/20 hover:border-white/40 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Card>

            {/* Search and Profiles Section */}
            <div className="space-y-4">
              <ProfileSearch onSearchResults={setFilteredProfiles} />
            </div>

            {/* Profiles Grid */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-8">
                All Profiles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(filteredProfiles.length > 0 ? filteredProfiles : savedProfiles).map((profile, index) => (
                  <UserCard
                    key={index}
                    {...profile}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Subscriptions */}
        <Sidebar className="w-64" side="right">
          <SidebarHeader className="p-4">
            <h2 className="text-lg font-semibold text-white">Premium Plans</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <div className="p-4 space-y-4">
                <Card className="p-3 glass-card hover-scale glow">
                  <h3 className="text-base font-semibold text-white mb-3 flex items-center">
                    <Sparkles className="mr-2 h-4 w-4 text-yellow-500" />
                    Subscription Plans
                  </h3>
                  <Button 
                    variant="outline" 
                    className="relative z-10 w-full mb-2 bg-gradient-to-r from-red-700/50 to-red-600/50 text-white hover:from-red-600/60 hover:to-red-500/60 border-white/20"
                    onClick={() => handleSubscribe('monthly')}
                  >
                    <div className="w-full text-left">
                      <span className="block text-sm font-semibold">Monthly Pro</span>
                      <span className="block text-base font-bold mt-1">200 UAH</span>
                      <span className="text-xs text-white/70">Billed monthly</span>
                    </div>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="relative z-10 w-full bg-gradient-to-r from-red-700/50 to-red-600/50 text-white hover:from-red-600/60 hover:to-red-500/60 border-white/20"
                    onClick={() => handleSubscribe('yearly')}
                  >
                    <div className="w-full text-left">
                      <span className="block text-sm font-semibold">Yearly Pro</span>
                      <span className="block text-base font-bold mt-1">1200 UAH</span>
                      <span className="text-xs text-white/70">Save 1200 UAH yearly</span>
                    </div>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Card>
                <Card className="p-3 glass-card hover-scale glow">
                  <h3 className="text-white font-semibold mb-2">Statistics</h3>
                  <p className="text-base text-white/80">
                    Total Profiles: {savedProfiles.length}
                  </p>
                </Card>
              </div>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </div>
    </SidebarProvider>
  );
};

export default Index;