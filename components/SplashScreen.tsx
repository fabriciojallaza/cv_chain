import { motion } from "framer-motion";
import { Link2, User, Building2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface SplashScreenProps {
  onSelectEmployee: () => void;
  onSelectCompany: () => void;
}

export function SplashScreen({ onSelectEmployee, onSelectCompany }: SplashScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a0a0f 0%, #1a1a24 50%, #0a0a0f 100%)",
      }}
    >
      {/* Animated background elements */}
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
            background: "radial-gradient(circle, #0E76FD 0%, transparent 70%)",
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, #0E76FD, #6C63FF, #0E76FD)",
                filter: "blur(20px)",
                opacity: 0.5,
              }}
            />
            <div className="relative bg-gradient-to-br from-[#0E76FD] to-[#6C63FF] p-6 rounded-3xl">
              <Link2 className="w-16 h-16 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-6xl mb-4 bg-gradient-to-r from-[#0E76FD] via-[#6C63FF] to-[#8B5CF6] bg-clip-text text-transparent">
            CV Chain
          </h1>
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-2xl text-gray-300 mb-4"
        >
          Construye tu reputación on-chain 💫
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          Valida tu experiencia profesional con NFTs soulbound sobre blockchain.
          Transparencia, confianza y reputación descentralizada para el futuro del trabajo.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-lg text-gray-400 mb-6">¿Cómo quieres comenzar?</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <Card
              onClick={onSelectEmployee}
              className="p-6 bg-[#1a1a24]/90 backdrop-blur-sm border-white/20 hover:border-[#0E76FD] transition-all cursor-pointer group"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="bg-gradient-to-br from-[#0E76FD] to-[#6C63FF] p-4 rounded-2xl group-hover:scale-110 transition-transform">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-white font-semibold">Soy Empleado</h3>
                  <p className="text-sm text-gray-400">
                    Construye tu reputación profesional con NFTs verificables
                  </p>
                </div>
                <Button className="w-full bg-gradient-to-r from-[#0E76FD] to-[#6C63FF] hover:opacity-90 text-white">
                  Continuar como Empleado
                </Button>
              </div>
            </Card>

            <Card
              onClick={onSelectCompany}
              className="p-6 bg-[#1a1a24]/90 backdrop-blur-sm border-white/20 hover:border-[#6C63FF] transition-all cursor-pointer group"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="bg-gradient-to-br from-[#6C63FF] to-[#8B5CF6] p-4 rounded-2xl group-hover:scale-110 transition-transform">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-white font-semibold">Soy Empresa</h3>
                  <p className="text-sm text-gray-400">
                    Valida a tu equipo y emite acreditaciones on-chain
                  </p>
                </div>
                <Button className="w-full bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] hover:opacity-90 text-white">
                  Continuar como Empresa
                </Button>
              </div>
            </Card>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-16 flex items-center justify-center gap-8 text-sm text-gray-500"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#0E76FD]" />
            <span>Blockchain Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#6C63FF]" />
            <span>Soulbound NFTs</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
            <span>Web3 Native</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
