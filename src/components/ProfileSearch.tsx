import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePortfolio } from "@/context/PortfolioContext";
import { Card } from "@/components/ui/card";

interface ProfileSearchProps {
  onSearchResults: (results: any[]) => void;
}

const ProfileSearch = ({ onSearchResults }: ProfileSearchProps) => {
  const { searchProfiles, filterProfiles } = usePortfolio();
  const [searchQuery, setSearchQuery] = useState("");
  const [portfolioType, setPortfolioType] = useState("all");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const results = searchProfiles(query);
    onSearchResults(results);
  };

  const handleFilter = (type: string) => {
    setPortfolioType(type);
    const results = type === "all" ? searchProfiles(searchQuery) : filterProfiles(type);
    onSearchResults(results);
  };

  return (
    <Card className="relative z-10 p-4 space-y-4 rid grid-cols-1 md:grid-cols-2 gap-6 slide-up glass-card hover-scale glow">
      <div className="space-y-2">
        <Input
          placeholder="Search by name, description or technologies..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="relative z-10 w-full px-4 py-2 bg-gradient-to-r from-red-700/30 to-red-600/30 text-white rounded-full text-sm border border-white/20 hover:border-white/40 transition-colors duration-300"
        />
      </div>
      <div className="relative z-10 space-y-2 px-4 py-2 bg-gradient-to-r from-red-700/30 to-red-600/30 text-black rounded-full text-sm border border-white/20 hover:border-white/40 transition-colors duration-300">
        <Select value={portfolioType} onValueChange={handleFilter}>
          <SelectTrigger className="relative z-10 space-y-2 px-4 py-2 bg-gradient-to-r from-red to-red-600/30 text-black rounded-full text-sm border border-white/20 transition-colors duration-300">
            <SelectValue placeholder="Filter by portfolio type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="frontend">Frontend</SelectItem>
            <SelectItem value="backend">Backend</SelectItem>
            <SelectItem value="fullstack">Fullstack</SelectItem>
            <SelectItem value="mobile">Mobile</SelectItem>
            <SelectItem value="design">Design</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
};

export default ProfileSearch;