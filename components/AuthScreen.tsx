import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, Building2, User, Mail, Briefcase, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface AuthScreenProps {
  userType: "employee" | "company";
  onBack: () => void;
  onLogin: (userData: any) => void;
}

export function AuthScreen({ userType, onBack, onLogin }: AuthScreenProps) {
  // Login state
  const [loginWallet, setLoginWallet] = useState("");
  
  // Employee registration state
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    wallet: "",
    profession: "",
    skills: "",
    bio: "",
  });
  
  // Company registration state
  const [companyData, setCompanyData] = useState({
    companyName: "",
    email: "",
    wallet: "",
    industry: "",
    description: "",
    website: "",
  });

  const validateWallet = (wallet: string): boolean => {
    // Validar formato de wallet Stacks (SP...)
    return /^SP[A-Z0-9]{39,41}$/i.test(wallet.trim());
  };

  const handleLogin = () => {
    if (!validateWallet(loginWallet)) {
      alert("Por favor ingresa una wallet válida de Stacks (formato: SP...)");
      return;
    }
    
    // Simular login exitoso
    onLogin({
      wallet: loginWallet,
      type: userType,
      // En producción, estos datos vendrían de la blockchain
      ...(userType === "employee" ? {
        name: "Alex Hernández",
        profession: "Web3 Full Stack Developer",
      } : {
        name: "Web3 Labs DAO",
        verified: true,
      })
    });
  };

  const handleEmployeeRegister = () => {
    if (!employeeData.name || !employeeData.email || !employeeData.wallet || !employeeData.profession) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }
    
    if (!validateWallet(employeeData.wallet)) {
      alert("Por favor ingresa una wallet válida de Stacks (formato: SP...)");
      return;
    }
    
    onLogin({
      ...employeeData,
      type: "employee",
      work3Score: 0,
      nftExperiences: [],
    });
  };

  const handleCompanyRegister = () => {
    if (!companyData.companyName || !companyData.email || !companyData.wallet || !companyData.industry) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }
    
    if (!validateWallet(companyData.wallet)) {
      alert("Por favor ingresa una wallet válida de Stacks (formato: SP...)");
      return;
    }
    
    onLogin({
      ...companyData,
      type: "company",
      verified: false, // Pendiente de verificación
      stats: {
        employeesAccredited: 0,
        bountiesCompleted: 0,
        averageReputation: 0,
      }
    });
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a0a0f 0%, #1a1a24 50%, #0a0a0f 100%)",
      }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: `radial-gradient(circle, ${userType === "employee" ? "#0E76FD" : "#6C63FF"} 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl px-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>

        <Card className="p-8 bg-[#1a1a24]/95 backdrop-blur-xl border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className={`bg-gradient-to-br ${userType === "employee" ? "from-[#0E76FD] to-[#6C63FF]" : "from-[#6C63FF] to-[#8B5CF6]"} p-3 rounded-2xl`}>
                {userType === "employee" ? (
                  <User className="w-8 h-8 text-white" />
                ) : (
                  <Building2 className="w-8 h-8 text-white" />
                )}
              </div>
            </div>
            <h2 className="text-3xl mb-2 text-white font-semibold">
              {userType === "employee" ? "Empleado Web3" : "Empresa Verificada"}
            </h2>
            <p className="text-gray-400">
              {userType === "employee"
                ? "Construye tu reputación profesional on-chain"
                : "Valida a tu equipo y publica oportunidades"}
            </p>
          </div>

          {/* Login/Register Tabs */}
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-6">
              <div className="bg-[#1a1a24]/50 p-4 rounded-lg border border-white/10 mb-6">
                <div className="flex items-start gap-3">
                  <Wallet className="w-5 h-5 text-[#0E76FD] mt-0.5" />
                  <div className="text-sm text-gray-300">
                    <p className="mb-2">
                      Conecta tu wallet de Stacks para acceder a tu cuenta on-chain.
                    </p>
                    <p className="text-gray-400 text-xs">
                      Las wallets de Stacks comienzan con "SP" seguido de caracteres alfanuméricos.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-gray-300">Wallet Address de Stacks</Label>
                  <div className="relative">
                    <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="SP..."
                      value={loginWallet}
                      onChange={(e) => setLoginWallet(e.target.value)}
                      className="pl-10 bg-input-background font-mono text-white"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Ejemplo: SP2E4A8XKJQFWPZJN9T6V3H2K1M4X0H
                  </p>
                </div>

                <Button
                  onClick={handleLogin}
                  className={`w-full text-white ${userType === "employee" ? "bg-gradient-to-r from-[#0E76FD] to-[#6C63FF]" : "bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6]"}`}
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Conectar Wallet
                </Button>
              </div>
            </TabsContent>

            {/* Register Tab - Employee */}
            {userType === "employee" && (
              <TabsContent value="register" className="space-y-4">
                <div>
                  <Label className="text-gray-300">Nombre Completo *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Tu nombre"
                      value={employeeData.name}
                      onChange={(e) => setEmployeeData({...employeeData, name: e.target.value})}
                      className="pl-10 bg-input-background text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="tu@email.com"
                      value={employeeData.email}
                      onChange={(e) => setEmployeeData({...employeeData, email: e.target.value})}
                      className="pl-10 bg-input-background text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Wallet Address de Stacks *</Label>
                  <div className="relative">
                    <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="SP..."
                      value={employeeData.wallet}
                      onChange={(e) => setEmployeeData({...employeeData, wallet: e.target.value})}
                      className="pl-10 bg-input-background font-mono text-white"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Tu identidad profesional on-chain
                  </p>
                </div>

                <div>
                  <Label className="text-gray-300">Profesión / Rol *</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Ej: Full Stack Developer, Smart Contract Developer"
                      value={employeeData.profession}
                      onChange={(e) => setEmployeeData({...employeeData, profession: e.target.value})}
                      className="pl-10 bg-input-background text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Habilidades principales</Label>
                  <Input
                    placeholder="React, Solidity, Web3.js, Clarity"
                    value={employeeData.skills}
                    onChange={(e) => setEmployeeData({...employeeData, skills: e.target.value})}
                    className="bg-input-background text-white"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Separa las habilidades con comas
                  </p>
                </div>

                <div>
                  <Label className="text-gray-300">Bio / Descripción</Label>
                  <Textarea
                    placeholder="Cuéntanos sobre tu experiencia en Web3..."
                    value={employeeData.bio}
                    onChange={(e) => setEmployeeData({...employeeData, bio: e.target.value})}
                    className="bg-input-background min-h-24 text-white"
                  />
                </div>

                <div className="bg-[#1a1a24]/50 p-4 rounded-lg border border-white/10">
                  <p className="text-sm text-gray-300">
                    ⚠️ Al registrarte, tu perfil será asociado a tu wallet de Stacks y se creará tu Work3Score inicial.
                  </p>
                </div>

                <Button
                  onClick={handleEmployeeRegister}
                  className="w-full text-white bg-gradient-to-r from-[#0E76FD] to-[#6C63FF]"
                >
                  Crear Perfil On-Chain
                </Button>
              </TabsContent>
            )}

            {/* Register Tab - Company */}
            {userType === "company" && (
              <TabsContent value="register" className="space-y-4">
                <div>
                  <Label className="text-gray-300">Nombre de la Empresa *</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Nombre de tu empresa"
                      value={companyData.companyName}
                      onChange={(e) => setCompanyData({...companyData, companyName: e.target.value})}
                      className="pl-10 bg-input-background text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Email Corporativo *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="contacto@empresa.com"
                      value={companyData.email}
                      onChange={(e) => setCompanyData({...companyData, email: e.target.value})}
                      className="pl-10 bg-input-background text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Wallet Address de Stacks *</Label>
                  <div className="relative">
                    <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="SP..."
                      value={companyData.wallet}
                      onChange={(e) => setCompanyData({...companyData, wallet: e.target.value})}
                      className="pl-10 bg-input-background font-mono text-white"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Wallet corporativa para emitir acreditaciones
                  </p>
                </div>

                <div>
                  <Label className="text-gray-300">Industria / Sector *</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Ej: DeFi, NFT Marketplace, DAO Infrastructure"
                      value={companyData.industry}
                      onChange={(e) => setCompanyData({...companyData, industry: e.target.value})}
                      className="pl-10 bg-input-background text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Sitio Web</Label>
                  <Input
                    placeholder="https://empresa.com"
                    value={companyData.website}
                    onChange={(e) => setCompanyData({...companyData, website: e.target.value})}
                    className="bg-input-background text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Descripción de la Empresa *</Label>
                  <Textarea
                    placeholder="Describe tu empresa y su enfoque en Web3..."
                    value={companyData.description}
                    onChange={(e) => setCompanyData({...companyData, description: e.target.value})}
                    className="bg-input-background min-h-24 text-white"
                  />
                </div>

                <div className="bg-[#1a1a24]/50 p-4 rounded-lg border border-white/10">
                  <p className="text-sm text-gray-300 mb-2">
                    ⚠️ Tu empresa será revisada para obtener el estado "Verificado" que te permitirá emitir acreditaciones NFT válidas.
                  </p>
                  <p className="text-xs text-gray-400">
                    El proceso de verificación puede tomar 24-48 horas.
                  </p>
                </div>

                <Button
                  onClick={handleCompanyRegister}
                  className="w-full text-white bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6]"
                >
                  Registrar Empresa
                </Button>
              </TabsContent>
            )}
          </Tabs>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>
            {userType === "employee"
              ? "Tu reputación profesional quedará registrada permanentemente en la blockchain"
              : "Todas las acreditaciones emitidas serán NFTs soulbound verificables"}
          </p>
        </div>
      </div>
    </div>
  );
}
