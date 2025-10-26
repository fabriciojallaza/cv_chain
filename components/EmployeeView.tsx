import { useState } from "react";
import { Wallet, Award, Briefcase, TrendingUp, ExternalLink, CheckCircle, Plus, Moon, Sun, User, Settings, LogOut, Share2, GraduationCap, Sparkles, Copy, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface EmployeeViewProps {
  onSwitchView: () => void;
  userData: any;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const nftExperiences = [
  {
    id: 1,
    company: "Web3 Labs DAO",
    role: "Frontend Developer",
    startDate: "Ene 2024",
    endDate: "Presente",
    verified: true,
    nftId: "NFT-2024-001",
    description: "Desarrollé interfaces de usuario para aplicaciones descentralizadas usando React y Web3.js. Implementé integración con wallets de Stacks y diseñé componentes reutilizables para NFT marketplaces. Lideré la migración del stack frontend a TypeScript mejorando la calidad del código en un 40%.",
    technologies: ["React", "TypeScript", "Web3.js", "Tailwind CSS", "Stacks.js"]
  },
  {
    id: 2,
    company: "Stacks Foundation",
    role: "Smart Contract Developer",
    startDate: "Jun 2023",
    endDate: "Dic 2023",
    verified: true,
    nftId: "NFT-2023-045",
    description: "Diseñé y desplegué smart contracts en Clarity para protocolos DeFi. Realicé auditorías de seguridad y optimización de gas. Contribuí a la documentación técnica de la comunidad y mentoreé a desarrolladores junior en mejores prácticas de blockchain.",
    technologies: ["Clarity", "Solidity", "Smart Contracts", "DeFi", "Security Audits"]
  },
  {
    id: 3,
    company: "DeFi Protocol Inc",
    role: "UX Designer",
    startDate: "Ene 2023",
    endDate: "May 2023",
    verified: true,
    nftId: "NFT-2023-012",
    description: "Diseñé experiencias de usuario intuitivas para aplicaciones Web3. Creé flujos de onboarding que redujeron la fricción para nuevos usuarios en un 60%. Colaboré con desarrolladores para implementar diseños responsivos y accesibles.",
    technologies: ["Figma", "UI/UX", "Design Systems", "User Research", "Prototyping"]
  },
];

const education = [
  {
    id: 1,
    institution: "Universidad Nacional de Blockchain",
    degree: "Máster en Tecnologías Blockchain",
    startDate: "2022",
    endDate: "2024",
    verified: true,
    nftId: "EDU-2024-089",
    description: "Especialización en desarrollo de smart contracts, criptografía avanzada y arquitecturas descentralizadas. Proyecto final: Plataforma de gobernanza DAO con token economics.",
  },
  {
    id: 2,
    institution: "Instituto Tecnológico Web3",
    degree: "Certificación en Desarrollo DeFi",
    startDate: "2023",
    endDate: "2023",
    verified: true,
    nftId: "EDU-2023-156",
    description: "Programa intensivo de 6 meses cubriendo protocolos DeFi, AMMs, lending protocols y yield farming. Implementación práctica de contratos en testnets.",
  }
];

const bounties = [
  {
    id: 1,
    title: "Frontend Web3 Developer",
    company: "Crypto Startup",
    reward: "300 STX",
    description: "Desarrollar interfaz para marketplace NFT con integración de wallets múltiples",
    requirements: ["React", "Web3.js", "Tailwind"],
    minWork3Score: 70,
    aiRecommended: true,
  },
  {
    id: 2,
    title: "Smart Contract Auditor",
    company: "Security DAO",
    reward: "500 STX",
    description: "Auditoría de seguridad para contratos Clarity de protocolo DeFi",
    requirements: ["Solidity", "Clarity", "Security"],
    minWork3Score: 85,
    aiRecommended: false,
  },
  {
    id: 3,
    title: "DAO Contributor",
    company: "Community Protocol",
    reward: "0.002 sBTC",
    description: "Contribuir a gobernanza y propuestas de mejora del protocolo",
    requirements: ["DAO Experience", "Governance"],
    minWork3Score: 60,
    aiRecommended: true,
  },
];

const skills = ["React", "Solidity", "UX Design", "DAO Contributor", "Clarity", "Web3.js"];

export function EmployeeView({ onSwitchView, userData, isDarkMode, toggleTheme }: EmployeeViewProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);
  
  // Use userData or fallback to default
  const userName = userData?.name || "Alex Hernández";
  const userProfession = userData?.profession || "Web3 Full Stack Developer";
  const userWallet = userData?.wallet || "SP2E4A8XKJQFWPZJN9T6V3H2K1M4X0H";
  const userBio = userData?.bio || "Desarrollador Web3 con experiencia en DeFi y NFTs";
  const userSkills = userData?.skills 
    ? userData.skills.split(',').map((s: string) => s.trim()) 
    : skills;
  const work3Score = userData?.work3Score || 84;

  const publicProfileUrl = `cvchain.io/user/${userName.toLowerCase().replace(' ', '')}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`https://${publicProfileUrl}`);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2000);
  };

  return (
    <div className="min-h-screen w-full" style={{ background: "linear-gradient(135deg, #0a0a0f 0%, #1a1a24 50%, #0a0a0f 100%)" }}>
      {/* Header */}
      <header className="border-b border-white/10 bg-[#1a1a24]/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-[#0E76FD] to-[#6C63FF] p-2 rounded-xl">
              <Award className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl text-white font-semibold bg-gradient-to-r from-[#0E76FD] to-[#6C63FF] bg-clip-text text-transparent">
              CV Chain
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm"
              className="border-[#0E76FD]/30"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Connected
            </Button>

            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              className="rounded-lg"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Avatar className="w-10 h-10 border-2 border-[#0E76FD] cursor-pointer">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
                    <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-[#1a1a24]/95 backdrop-blur-xl border-white/20">
                <div className="px-2 py-2">
                  <p className="text-sm text-white">{userName}</p>
                  <p className="text-xs text-gray-400">{userWallet.slice(0, 12)}...</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-white">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-white" onClick={onSwitchView}>
                  Vista Empresa
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Profile Section */}
        <Card className="p-8 mb-8 bg-[#1a1a24]/90 backdrop-blur-sm border-white/20">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <Avatar className="w-32 h-32 border-4 border-[#0E76FD] shadow-lg shadow-[#0E76FD]/20">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" />
                <AvatarFallback>AH</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl text-white font-bold mb-2">{userName}</h2>
                  <p className="text-gray-400 mb-2">{userProfession}</p>
                  <p className="text-sm text-gray-400 mb-3">{userBio}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Wallet className="w-4 h-4" />
                    <code className="bg-muted px-2 py-1 rounded text-white">{userWallet}</code>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="border-[#6C63FF]/30 text-white"
                  onClick={() => setShareDialogOpen(true)}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Profile
                </Button>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#0E76FD]" />
                    <span className="text-white">Work3Score</span>
                  </div>
                  <span className="text-2xl text-white font-semibold bg-gradient-to-r from-[#0E76FD] to-[#6C63FF] bg-clip-text text-transparent">
                    {work3Score}/100
                  </span>
                </div>
                <Progress value={work3Score} className="h-3" />
              </div>

              <div>
                <h4 className="mb-3 text-white font-semibold">Habilidades</h4>
                <div className="flex flex-wrap gap-2">
                  {userSkills.map((skill: string, index: number) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-gradient-to-r from-[#0E76FD]/30 to-[#6C63FF]/30 border border-[#0E76FD]/50 hover:border-[#0E76FD]/70 text-white"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8 bg-muted/30 p-1 w-full justify-start">
            <TabsTrigger value="profile" className="data-[state=active]:bg-card">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="education" className="data-[state=active]:bg-card">
              <GraduationCap className="w-4 h-4 mr-2" />
              Education
            </TabsTrigger>
            <TabsTrigger value="opportunities" className="data-[state=active]:bg-card">
              <Sparkles className="w-4 h-4 mr-2" />
              Web3 Opportunities
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-card">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab - Work Experience */}
          <TabsContent value="profile" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl text-white font-semibold">Work Experience</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[#6C63FF] hover:bg-[#6C63FF]/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Experience
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#1a1a24]/95 backdrop-blur-xl border-white/20">
                  <DialogHeader>
                    <DialogTitle>Add New Experience</DialogTitle>
                    <DialogDescription>Request validation for a new work experience from the company.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label>Company</Label>
                      <Input placeholder="Company name" className="bg-input-background" />
                    </div>
                    <div>
                      <Label>Role</Label>
                      <Input placeholder="Your position" className="bg-input-background" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Start Date</Label>
                        <Input type="month" className="bg-input-background" />
                      </div>
                      <div>
                        <Label>End Date</Label>
                        <Input type="month" className="bg-input-background" />
                      </div>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea placeholder="Describe your experience..." className="bg-input-background" />
                    </div>
                    <div>
                      <Label>Technologies</Label>
                      <Input placeholder="React, Solidity, Web3..." className="bg-input-background" />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-[#0E76FD] to-[#6C63FF]">
                      Request Validation
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-6">
              {nftExperiences.map((exp) => (
                <Card 
                  key={exp.id} 
                  className="p-6 bg-[#1a1a24]/80 backdrop-blur-sm border-white/20 hover:border-[#0E76FD]/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-[#0E76FD]/20 to-[#6C63FF]/20 p-3 rounded-lg">
                      <Briefcase className="w-6 h-6 text-[#0E76FD]" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="mb-1 text-white font-semibold">{exp.role}</h4>
                          <p className="text-sm text-gray-400">{exp.company}</p>
                        </div>
                        {exp.verified && (
                          <div className="flex items-center gap-1 text-green-500 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            <span>Verified</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-sm text-gray-400 mb-4">
                        {exp.startDate} - {exp.endDate}
                      </div>

                      <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      <div className="mb-4">
                        <div className="text-sm text-gray-400 mb-2">Technologies:</div>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, index) => (
                            <Badge key={index} variant="outline" className="text-xs text-white">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-border flex items-center justify-between">
                        <code className="text-xs text-gray-400">NFT ID: {exp.nftId}</code>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-[#0E76FD] hover:text-[#0E76FD]/80"
                        >
                          View on Blockchain
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl text-white font-semibold">Education & Certifications</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[#6C63FF] hover:bg-[#6C63FF]/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Education
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#1a1a24]/95 backdrop-blur-xl border-white/20">
                  <DialogHeader>
                    <DialogTitle>Add Education</DialogTitle>
                    <DialogDescription>Add your education or certifications and request verification.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label>Institution</Label>
                      <Input placeholder="University or institution" className="bg-input-background" />
                    </div>
                    <div>
                      <Label>Degree / Certificate</Label>
                      <Input placeholder="Your degree" className="bg-input-background" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Start Year</Label>
                        <Input type="number" placeholder="2020" className="bg-input-background" />
                      </div>
                      <div>
                        <Label>End Year</Label>
                        <Input type="number" placeholder="2024" className="bg-input-background" />
                      </div>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea placeholder="Brief description..." className="bg-input-background" />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-[#0E76FD] to-[#6C63FF]">
                      Request Validation
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-6">
              {education.map((edu) => (
                <Card 
                  key={edu.id} 
                  className="p-6 bg-[#1a1a24]/80 backdrop-blur-sm border-white/20 hover:border-[#6C63FF]/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-[#6C63FF]/20 to-[#8B5CF6]/20 p-3 rounded-lg">
                      <GraduationCap className="w-6 h-6 text-[#6C63FF]" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="mb-1 text-white font-semibold">{edu.degree}</h4>
                          <p className="text-sm text-gray-400">{edu.institution}</p>
                        </div>
                        {edu.verified && (
                          <div className="flex items-center gap-1 text-green-500 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            <span>Verified by CV Chain</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-sm text-gray-400 mb-4">
                        {edu.startDate} - {edu.endDate}
                      </div>

                      <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                        {edu.description}
                      </p>

                      <div className="pt-4 border-t border-border flex items-center justify-between">
                        <code className="text-xs text-gray-400">NFT ID: {edu.nftId}</code>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-[#6C63FF] hover:text-[#6C63FF]/80"
                        >
                          View on Blockchain
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Web3 Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-6">
            <div className="mb-6">
              <h3 className="text-2xl text-white font-semibold mb-2">Web3 Opportunities</h3>
              <p className="text-gray-400">Browse bounties and job offers matched to your Work3Score</p>
            </div>

            <div className="space-y-6">
              {bounties.map((bounty) => (
                <Card key={bounty.id} className="p-6 bg-[#1a1a24]/80 backdrop-blur-sm border-white/20 hover:border-[#6C63FF]/50 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-white font-semibold">{bounty.title}</h4>
                        {bounty.aiRecommended && (
                          <Badge className="bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] border-0">
                            <Sparkles className="w-3 h-3 mr-1" />
                            AI Recommended
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{bounty.company}</p>
                    </div>
                    <div className="bg-gradient-to-r from-[#0E76FD] to-[#6C63FF] px-4 py-2 rounded-lg text-sm">
                      {bounty.reward}
                    </div>
                  </div>

                  <p className="text-sm text-white mb-4">{bounty.description}</p>

                  <div className="mb-4">
                    <div className="text-sm text-gray-400 mb-2">Requirements:</div>
                    <div className="flex flex-wrap gap-2">
                      {bounty.requirements.map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs text-white">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="text-sm text-gray-400">
                      Minimum Work3Score: <span className="text-white">{bounty.minWork3Score}</span>
                    </div>
                    <Button className="bg-[#6C63FF] hover:bg-[#6C63FF]/90">
                      Apply using Work3Score
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h3 className="text-2xl text-white font-semibold mb-6">Settings</h3>
            
            <Card className="p-6 bg-[#1a1a24]/80 backdrop-blur-sm border-white/20">
              <h4 className="mb-4 text-white font-semibold">Profile Visibility</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white">Public Profile</p>
                    <p className="text-xs text-gray-400">Allow others to view your on-chain CV</p>
                  </div>
                  <Button variant="outline" size="sm">Enabled</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white">Show Wallet Address</p>
                    <p className="text-xs text-gray-400">Display your wallet on public profile</p>
                  </div>
                  <Button variant="outline" size="sm">Enabled</Button>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-[#1a1a24]/80 backdrop-blur-sm border-white/20">
              <h4 className="mb-4 text-white font-semibold">Notifications</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white">New Bounty Matches</p>
                    <p className="text-xs text-gray-400">Get notified when bounties match your skills</p>
                  </div>
                  <Button variant="outline" size="sm">Enabled</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white">NFT Verifications</p>
                    <p className="text-xs text-gray-400">Alerts when companies verify your credentials</p>
                  </div>
                  <Button variant="outline" size="sm">Enabled</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Share Profile Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="bg-[#1a1a24]/95 backdrop-blur-xl border-white/20 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Share Your On-Chain Profile</DialogTitle>
            <DialogDescription>Share your verified credentials and Work3Score with potential employers.</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 pt-4">
            <div>
              <Label className="mb-2">Public Profile URL</Label>
              <div className="flex gap-2">
                <Input 
                  value={`https://${publicProfileUrl}`}
                  readOnly
                  className="bg-input-background font-mono text-sm text-white"
                />
                <Button 
                  variant="outline" 
                  onClick={handleCopyUrl}
                  className="flex-shrink-0"
                >
                  {urlCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-white font-semibold">Public Profile Preview</h4>
              <Card className="p-6 bg-[#1a1a24]/70 backdrop-blur-sm border-white/20">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-16 h-16 border-2 border-[#0E76FD]">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
                    <AvatarFallback>AH</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="mb-1 text-white font-semibold">{userName}</h4>
                    <p className="text-sm text-gray-400 mb-2">{userProfession}</p>
                    <code className="text-xs text-gray-400 bg-muted px-2 py-1 rounded">
                      {userWallet}
                    </code>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400 mb-1">Work3Score</div>
                    <div className="text-2xl text-white font-semibold bg-gradient-to-r from-[#0E76FD] to-[#6C63FF] bg-clip-text text-transparent">
                      {work3Score}/100
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-2">Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {userSkills.slice(0, 4).map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-gradient-to-r from-[#0E76FD]/30 to-[#6C63FF]/30 border border-[#0E76FD]/50 text-white">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-gray-400 mb-2">
                  {nftExperiences.length} Verified Experiences · {education.length} Education Credentials
                </div>

                <Button variant="outline" size="sm" className="w-full mt-4">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Blockchain
                </Button>
              </Card>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm text-gray-400">
                💡 Share this link on social media or with potential employers. They'll see your verified on-chain credentials and Work3Score.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
