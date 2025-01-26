import React, { createContext, useContext, useState, useEffect } from "react";

interface PortfolioData {
  name: string;
  description: string;
  monthlyEarnings: number;
  trustLevel: number;
  userType: "individual" | "company" | "freelancer" | "student" | "agency" | "startup";
  technologies: string[];
  portfolioType: "frontend" | "backend" | "fullstack" | "mobile" | "design";
}

interface PortfolioContextType {
  portfolioData: PortfolioData;
  savedProfiles: PortfolioData[];
  updatePortfolio: (data: Partial<PortfolioData>) => void;
  setSelectedPortfolio: (data: PortfolioData) => void;
  saveProfile: (profile: PortfolioData) => void;
  searchProfiles: (query: string) => PortfolioData[];
  filterProfiles: (type: string) => PortfolioData[];
}

const defaultPortfolioData: PortfolioData = {
  name: "Иван Иванов",
  description: "Опытный веб-разработчик с фокусом на создании современных веб-приложений",
  monthlyEarnings: 150000,
  trustLevel: 95,
  userType: "individual",
  technologies: ["HTML", "CSS", "JavaScript"],
  portfolioType: "frontend",
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultPortfolioData);
  const [savedProfiles, setSavedProfiles] = useState<PortfolioData[]>(() => {
    const saved = localStorage.getItem('savedProfiles');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedProfiles', JSON.stringify(savedProfiles));
  }, [savedProfiles]);

  const updatePortfolio = (newData: Partial<PortfolioData>) => {
    setPortfolioData((prev) => ({ ...prev, ...newData }));
  };

  const setSelectedPortfolio = (data: PortfolioData) => {
    setPortfolioData(data);
  };

  const saveProfile = (profile: PortfolioData) => {
    setSavedProfiles((prev) => [...prev, profile]);
  };

  const searchProfiles = (query: string) => {
    return savedProfiles.filter((profile) =>
      profile.name.toLowerCase().includes(query.toLowerCase()) ||
      profile.description.toLowerCase().includes(query.toLowerCase()) ||
      profile.technologies.some(tech => tech.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const filterProfiles = (type: string) => {
    return savedProfiles.filter((profile) => profile.portfolioType === type);
  };

  return (
    <PortfolioContext.Provider 
      value={{ 
        portfolioData, 
        savedProfiles, 
        updatePortfolio, 
        setSelectedPortfolio, 
        saveProfile,
        searchProfiles,
        filterProfiles
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};