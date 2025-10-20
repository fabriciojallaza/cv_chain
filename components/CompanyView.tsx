import { useState } from "react";
import { Building2, Award, Users, TrendingUp, CheckCircle, Plus, Send, FileText, Upload, Globe, Mail, MapPin, Sparkles, ExternalLink, Filter, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface CompanyViewProps {
  onSwitchView: () => void;
  userData: any;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const accreditedEmployees = [
  {
    id: 1,
    name: "Alex Hernández",
    wallet: "SP2E4A8XKJQFWPZJN9T6V3H2K1M4X0H",
    role: "Frontend Developer",
    period: "Ene 2024 - Presente",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    nftIssued: "NFT-2024-001",
    verified: true,
    status: "Active"
  },
  {
    id: 2,
    name: "María González",
    wallet: "SP3F8B2C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T",
    role: "Smart Contract Developer",
    period: "Mar 2024 - Presente",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    nftIssued: "NFT-2024-015",
    verified: true,
    status: "Active"
  },
  {
    id: 3,
    name: "Carlos Ruiz",
    wallet: "SP1C9D8E7F6G5H4I3J2K1L0M9N8O7P6Q5R4S3T2U1V",
    role: "UX Designer",
    period: "Feb 2024 - Jul 2024",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    nftIssued: "NFT-2024-008",
    verified: true,
    status: "Expired"
  },
  {
    id: 4,
    name: "Ana Silva",
    wallet: "SP4E2F1G0H9I8J7K6L5M4N3O2P1Q0R9S8T7U6V5W4X",
    role: "Product Manager",
    period: "Ene 2024 - Presente",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    nftIssued: "NFT-2024-022",
    verified: true,
    status: "Active"
  },
];

const applications = [
  {
    id: 1,
    bountyTitle: "Frontend Web3 Developer",
    applicantName: "Diego Martínez",
    applicantWallet: "SP5X3Y2Z1A0B9C8D7E6F5G4H3I2J1K0L9M8N7O6P5Q",
    work3Score: 78,
    appliedDate: "15 Oct 2025",
    status: "pending"
  },
  {
    id: 2,
    bountyTitle: "Smart Contract Auditor",
    applicantName: "Laura Pérez",
    applicantWallet: "SP6Q4R3S2T1U0V9W8X7Y6Z5A4B3C2D1E0F9G8H7I6J",
    work3Score: 92,
    appliedDate: "14 Oct 2025",
    status: "pending"
  },
];

const companyStats = {
  employeesAccredited: 24,
  bountiesCompleted: 18,
  averageReputation: 87,
};

export function CompanyView({ onSwitchView, userData, isDarkMode, toggleTheme }: CompanyViewProps) {
  const [kybVerified, setKybVerified] = useState(userData?.verified !== false);
  const [kybFormData, setKybFormData] = useState({
    companyName: "",
    website: "",
    registrationId: "",
    country: "",
    businessEmail: "",
    agreedToTerms: false,
  });
  
  // Use userData or fallback to default
  const companyName = userData?.companyName || "Web3 Labs DAO";
  const companyWebsite = userData?.website || "https://web3labs.com";
  const companyWallet = userData?.wallet || "SP3C5W2V23XBMV1P9WS1HP3TJMS6VJZZ";
  const stats = userData?.stats || companyStats;

  const handleKybSubmit = () => {
    // In a real app, this would submit to blockchain/backend
    setKybVerified(true);
  };

  // KYB Verification Screen
  if (!kybVerified) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full p-8 bg-card border-border">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#0E76FD] to-[#6C63FF] rounded-2xl mb-4">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl mb-2">Company Verification (KYB)</h2>
            <p className="text-muted-foreground">
              Verify your company to issue NFT credentials and publish bounties
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <Label>Company Name *</Label>
              <Input 
                placeholder="Web3 Labs DAO"
                className="bg-input-background"
                value={kybFormData.companyName}
                onChange={(e) => setKybFormData({...kybFormData, companyName: e.target.value})}
              />
            </div>

            <div>
              <Label>Website *</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="https://yourcompany.com"
                  className="bg-input-background pl-10"
                  value={kybFormData.website}
                  onChange={(e) => setKybFormData({...kybFormData, website: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Registration ID *</Label>
                <Input 
                  placeholder="Tax ID / Registry number"
                  className="bg-input-background"
                  value={kybFormData.registrationId}
                  onChange={(e) => setKybFormData({...kybFormData, registrationId: e.target.value})}
                />
              </div>
              <div>
                <Label>Country *</Label>
                <Select>
                  <SelectTrigger className="bg-input-background">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="mx">Mexico</SelectItem>
                    <SelectItem value="es">Spain</SelectItem>
                    <SelectItem value="ar">Argentina</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Business Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input 
                  type="email"
                  placeholder="contact@yourcompany.com"
                  className="bg-input-background pl-10"
                  value={kybFormData.businessEmail}
                  onChange={(e) => setKybFormData({...kybFormData, businessEmail: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label>Company Logo</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-[#0E76FD]/50 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
              <Checkbox 
                id="terms"
                checked={kybFormData.agreedToTerms}
                onCheckedChange={(checked) => setKybFormData({...kybFormData, agreedToTerms: checked as boolean})}
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                I verify that this information is true and accurate. I understand that providing false information may result in permanent ban from the platform and legal consequences.
              </label>
            </div>

            <div className="bg-[#0E76FD]/10 border border-[#0E76FD]/20 rounded-lg p-4">
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-[#0E76FD] flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="mb-2">After verification, you will receive:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• "Verified Company" NFT badge on blockchain</li>
                    <li>• Ability to issue soulbound NFT credentials</li>
                    <li>• Access to publish bounties and job offers</li>
                    <li>• Priority visibility in the Web3 talent marketplace</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-[#0E76FD] to-[#6C63FF]"
              onClick={handleKybSubmit}
              disabled={!kybFormData.agreedToTerms}
            >
              <Send className="w-4 h-4 mr-2" />
              Submit for Verification
            </Button>

            <div className="text-center">
              <Button variant="ghost" onClick={onSwitchView}>
                View Employee Dashboard
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Main Dashboard (Post-Verification)
  return (
    <div className="min-h-screen w-full bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-[#0E76FD] to-[#6C63FF] p-2 rounded-xl">
              <Award className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl bg-gradient-to-r from-[#0E76FD] to-[#6C63FF] bg-clip-text text-transparent">
              CV Chain
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              className="rounded-lg"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            
            <Button variant="ghost" onClick={onSwitchView}>
              Vista Empleado
            </Button>
            <div className="flex items-center gap-3 bg-muted px-4 py-2 rounded-lg">
              <div className="bg-gradient-to-br from-[#0E76FD] to-[#6C63FF] p-2 rounded-lg">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-2">
                  <span>{companyName}</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <div className="text-muted-foreground">Verified Company</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Company Info Banner */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-card to-[#0E76FD]/5 border-[#0E76FD]/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0E76FD] to-[#6C63FF] rounded-xl flex items-center justify-center">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3>{companyName}</h3>
                  <Badge className="bg-green-500/20 text-green-500 border-0">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    {companyWebsite}
                  </span>
                  <span className="flex items-center gap-1">
                    <Wallet className="w-4 h-4" />
                    <code className="bg-muted px-2 py-0.5 rounded">{companyWallet.slice(0, 16)}...</code>
                  </span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="border-[#0E76FD]/30">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Company Profile
            </Button>
          </div>
        </Card>

        {/* Company Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-card to-[#0E76FD]/5 border-[#0E76FD]/20">
            <div className="flex items-center gap-4">
              <div className="bg-[#0E76FD]/20 p-3 rounded-xl">
                <Users className="w-6 h-6 text-[#0E76FD]" />
              </div>
              <div>
                <div className="text-3xl">{stats.employeesAccredited}</div>
                <div className="text-sm text-muted-foreground">Verified Employees</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-card to-[#6C63FF]/5 border-[#6C63FF]/20">
            <div className="flex items-center gap-4">
              <div className="bg-[#6C63FF]/20 p-3 rounded-xl">
                <Award className="w-6 h-6 text-[#6C63FF]" />
              </div>
              <div>
                <div className="text-3xl">{stats.bountiesCompleted}</div>
                <div className="text-sm text-muted-foreground">Bounties Completed</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-card to-[#8B5CF6]/5 border-[#8B5CF6]/20">
            <div className="flex items-center gap-4">
              <div className="bg-[#8B5CF6]/20 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6 text-[#8B5CF6]" />
              </div>
              <div>
                <div className="text-3xl">{stats.averageReputation}</div>
                <div className="text-sm text-muted-foreground">Reputation Score</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-[#0E76FD] to-[#6C63FF] hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                Issue Accreditation NFT
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border max-w-2xl">
              <DialogHeader>
                <DialogTitle>Issue Soulbound NFT Accreditation</DialogTitle>
                <DialogDescription>Create a permanent on-chain credential for an employee's work experience.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label>Employee Wallet Address *</Label>
                  <Input placeholder="SP..." className="bg-input-background font-mono" />
                </div>
                <div>
                  <Label>Role / Position *</Label>
                  <Input placeholder="e.g. Frontend Developer" className="bg-input-background" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date *</Label>
                    <Input type="month" className="bg-input-background" />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input type="month" placeholder="Leave empty if current" className="bg-input-background" />
                  </div>
                </div>
                <div>
                  <Label>Work Description *</Label>
                  <Textarea 
                    placeholder="Describe responsibilities, achievements, and technologies used..."
                    className="bg-input-background min-h-24"
                  />
                </div>
                <div>
                  <Label>Skills Demonstrated</Label>
                  <Input placeholder="React, Web3, Solidity, Design Systems..." className="bg-input-background" />
                </div>
                <div className="bg-muted/30 p-4 rounded-lg border border-border">
                  <div className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-[#0E76FD] flex-shrink-0" />
                    <div className="text-sm text-muted-foreground">
                      This NFT will be soulbound (non-transferable) and permanently recorded on the Stacks blockchain. The employee's Work3Score will be automatically updated.
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-[#0E76FD] to-[#6C63FF]">
                  <Send className="w-4 h-4 mr-2" />
                  Issue Soulbound NFT
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-[#6C63FF]/30 hover:border-[#6C63FF]">
                <Plus className="w-4 h-4 mr-2" />
                Create Bounty
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border max-w-2xl">
              <DialogHeader>
                <DialogTitle>Publish Web3 Bounty</DialogTitle>
                <DialogDescription>Create a new bounty or job offer for the Web3 talent marketplace.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label>Bounty Title *</Label>
                  <Input placeholder="e.g. Frontend Web3 Developer" className="bg-input-background" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Payment Amount *</Label>
                    <Input type="number" placeholder="300" className="bg-input-background" />
                  </div>
                  <div>
                    <Label>Currency *</Label>
                    <Select>
                      <SelectTrigger className="bg-input-background">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="stx">STX</SelectItem>
                        <SelectItem value="sbtc">sBTC</SelectItem>
                        <SelectItem value="usda">USDA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Description *</Label>
                  <Textarea 
                    placeholder="Describe the work to be done..."
                    className="bg-input-background min-h-24"
                  />
                  <Button variant="ghost" size="sm" className="mt-2 text-[#6C63FF]">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate with AI
                  </Button>
                </div>
                <div>
                  <Label>Requirements *</Label>
                  <Input placeholder="React, Solidity, UX Design..." className="bg-input-background" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Estimated Duration</Label>
                    <Input placeholder="e.g. 2-4 weeks" className="bg-input-background" />
                  </div>
                  <div>
                    <Label>Minimum Work3Score</Label>
                    <Input type="number" placeholder="70" className="bg-input-background" />
                  </div>
                </div>
                <Button className="w-full bg-[#6C63FF] hover:bg-[#6C63FF]/90">
                  <Send className="w-4 h-4 mr-2" />
                  Publish Bounty
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Manage Applications
          </Button>
        </div>

        {/* Pending Applications */}
        {applications.length > 0 && (
          <Card className="p-6 mb-8 bg-card border-border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl mb-1">Pending Applications</h3>
                <p className="text-sm text-muted-foreground">{applications.length} new applications to review</p>
              </div>
              <Badge className="bg-[#6C63FF]/20 text-[#6C63FF] border-0">
                {applications.length} New
              </Badge>
            </div>

            <div className="space-y-4">
              {applications.map((app) => (
                <Card key={app.id} className="p-4 bg-muted/20 border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="w-10 h-10 border-2 border-[#0E76FD]">
                          <AvatarFallback>{app.applicantName.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="text-sm">{app.applicantName}</h4>
                          <p className="text-xs text-muted-foreground">Applied for: {app.bountyTitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Work3Score: <span className="text-foreground">{app.work3Score}/100</span></span>
                        <span>Applied: {app.appliedDate}</span>
                        <code className="bg-muted px-2 py-0.5 rounded">{app.applicantWallet.slice(0, 16)}...</code>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Accept
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        )}

        {/* Accredited Employees Table */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl">Accredited Employees</h3>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-32 bg-input-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card className="border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border">
                  <TableHead>Employee</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>NFT ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accreditedEmployees.map((employee) => (
                  <TableRow key={employee.id} className="border-border">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border-2 border-[#0E76FD]">
                          <AvatarImage src={employee.avatar} />
                          <AvatarFallback>{employee.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm">{employee.name}</p>
                          <code className="text-xs text-muted-foreground">{employee.wallet.slice(0, 12)}...</code>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-gradient-to-r from-[#0E76FD]/10 to-[#6C63FF]/10">
                        {employee.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {employee.period}
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded">{employee.nftIssued}</code>
                    </TableCell>
                    <TableCell>
                      {employee.status === "Active" ? (
                        <Badge className="bg-green-500/20 text-green-500 border-0">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          Expired
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-[#0E76FD]">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        View on-chain
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <button className="hover:text-[#0E76FD] transition-colors">
            View On-Chain Reputation
          </button>
          <span>·</span>
          <button className="hover:text-[#6C63FF] transition-colors">
            Payment Management
          </button>
          <span>·</span>
          <button className="hover:text-[#8B5CF6] transition-colors">
            API Documentation
          </button>
        </div>
      </div>
    </div>
  );
}

// Missing import (add this at the top with other imports)
import { Wallet } from "lucide-react";
