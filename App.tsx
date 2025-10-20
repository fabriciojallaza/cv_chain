import { useState } from "react";
import { SplashScreen } from "./components/SplashScreen";
import { AuthScreen } from "./components/AuthScreen";
import { EmployeeView } from "./components/EmployeeView";
import { CompanyView } from "./components/CompanyView";
import { DevMenu } from "./components/DevMenu";

type View = "splash" | "auth-employee" | "auth-company" | "employee" | "company";

// Mock data for development
const mockEmployeeData = {
  name: "Alex Hernández",
  email: "alex@web3labs.com",
  wallet: "SP2E4A8XKJQFWPZJN9T6V3H2K1M4X0H",
  profession: "Web3 Full Stack Developer",
  skills: "React, Solidity, UX Design, DAO Contributor, Clarity, Web3.js",
  bio: "Desarrollador Web3 con experiencia en DeFi y NFTs",
  type: "employee",
  work3Score: 84,
  nftExperiences: [],
};

const mockCompanyData = {
  companyName: "Web3 Labs DAO",
  email: "contact@web3labs.com",
  wallet: "SP3C5W2V23XBMV1P9WS1HP3TJMS6VJZZ",
  industry: "DeFi, NFT Marketplace",
  description: "Empresa líder en desarrollo de soluciones Web3",
  website: "https://web3labs.com",
  type: "company",
  verified: true,
  stats: {
    employeesAccredited: 24,
    bountiesCompleted: 18,
    averageReputation: 87,
  },
};

export default function App() {
  const [currentView, setCurrentView] = useState<View>("splash");
  const [userData, setUserData] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleSelectEmployee = () => {
    setCurrentView("auth-employee");
  };

  const handleSelectCompany = () => {
    setCurrentView("auth-company");
  };

  const handleBackToSplash = () => {
    setCurrentView("splash");
    setUserData(null);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleEmployeeLogin = (data: any) => {
    setUserData(data);
    setCurrentView("employee");
  };

  const handleCompanyLogin = (data: any) => {
    setUserData(data);
    setCurrentView("company");
  };

  const switchToEmployee = () => {
    setCurrentView("employee");
  };

  const switchToCompany = () => {
    setCurrentView("company");
  };

  // Dev Menu navigation with mock data
  const handleDevNavigate = (view: View) => {
    setCurrentView(view);
    
    // Auto-load mock data for main views
    if (view === "employee" && !userData) {
      setUserData(mockEmployeeData);
    } else if (view === "company" && !userData) {
      setUserData(mockCompanyData);
    }
  };

  return (
    <div className={`size-full ${isDarkMode ? 'dark' : ''}`}>
      {currentView === "splash" && (
        <SplashScreen 
          onSelectEmployee={handleSelectEmployee}
          onSelectCompany={handleSelectCompany}
        />
      )}
      {currentView === "auth-employee" && (
        <AuthScreen 
          userType="employee"
          onBack={handleBackToSplash}
          onLogin={handleEmployeeLogin}
        />
      )}
      {currentView === "auth-company" && (
        <AuthScreen 
          userType="company"
          onBack={handleBackToSplash}
          onLogin={handleCompanyLogin}
        />
      )}
      {currentView === "employee" && (
        <EmployeeView 
          onSwitchView={switchToCompany}
          userData={userData || mockEmployeeData}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
      )}
      {currentView === "company" && (
        <CompanyView 
          onSwitchView={switchToEmployee}
          userData={userData || mockCompanyData}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
      )}

      {/* Developer Menu - Always visible */}
      <DevMenu 
        currentView={currentView}
        onNavigate={handleDevNavigate}
      />
    </div>
  );
}
