import { useState } from "react";
import { Code, X, Home, LogIn, UserCircle, Building, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

type View = "splash" | "auth-employee" | "auth-company" | "employee" | "company";

interface DevMenuProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const views = [
  {
    id: "splash" as View,
    name: "Splash Screen",
    icon: Home,
    color: "bg-gradient-to-r from-[#0E76FD] to-[#6C63FF]",
    description: "Pantalla de inicio",
  },
  {
    id: "auth-employee" as View,
    name: "Login Empleado",
    icon: LogIn,
    color: "bg-[#0E76FD]",
    description: "Autenticación para empleados",
  },
  {
    id: "auth-company" as View,
    name: "Login Empresa",
    icon: LogIn,
    color: "bg-[#6C63FF]",
    description: "Autenticación para empresas",
  },
  {
    id: "employee" as View,
    name: "Vista Empleado",
    icon: UserCircle,
    color: "bg-gradient-to-r from-[#0E76FD] to-[#6C63FF]",
    description: "Dashboard del empleado",
  },
  {
    id: "company" as View,
    name: "Vista Empresa",
    icon: Building,
    color: "bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6]",
    description: "Dashboard de la empresa",
  },
];

export function DevMenu({ currentView, onNavigate }: DevMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  if (!isOpen) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-[999]"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-[#0E76FD] to-[#6C63FF] hover:opacity-90 shadow-lg shadow-[#0E76FD]/20 rounded-full w-14 h-14 p-0"
        >
          <Code className="w-6 h-6" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-[999]"
    >
      <Card className="bg-card/95 backdrop-blur-xl border-[#0E76FD]/30 shadow-2xl shadow-[#0E76FD]/10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-[#0E76FD]/10 to-[#6C63FF]/10">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-[#0E76FD] to-[#6C63FF] p-2 rounded-lg">
              <Code className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm text-white font-semibold">Dev Menu</h3>
              <p className="text-xs text-gray-400">Navegación rápida</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8 p-0"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0 hover:bg-destructive/20 hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="p-3 space-y-2 max-h-[70vh] overflow-y-auto">
                {views.map((view) => {
                  const Icon = view.icon;
                  const isActive = currentView === view.id;

                  return (
                    <motion.button
                      key={view.id}
                      onClick={() => onNavigate(view.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-[#0E76FD]/20 to-[#6C63FF]/20 border-[#0E76FD] shadow-lg shadow-[#0E76FD]/10"
                          : "bg-card/50 border-border hover:border-[#0E76FD]/50 hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`${view.color} p-2 rounded-lg`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-white font-medium">{view.name}</span>
                            {isActive && (
                              <Badge
                                variant="outline"
                                className="text-xs bg-[#0E76FD]/20 border-[#0E76FD] text-white"
                              >
                                Activa
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 truncate">
                            {view.description}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-border bg-muted/30">
                <div className="text-xs text-gray-400 text-center">
                  <p className="mb-1 text-white">👨‍💻 Modo Desarrollador</p>
                  <p className="text-[10px]">
                    Vista actual: <code className="text-[#0E76FD] font-semibold">{currentView}</code>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
