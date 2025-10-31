import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Shield, BarChart3 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-6">
            <TrendingUp className="h-12 w-12 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Portafolio Transparente
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Plataforma de gestión de inversiones con transparencia total. 
            Accede como inversionista o cliente para gestionar tu portafolio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <Card className="shadow-elevated hover:shadow-card transition-all duration-300 hover:scale-105 animate-fade-in bg-gradient-card">
            <CardContent className="p-8">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-primary/10">
                  <BarChart3 className="h-12 w-12 text-primary" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center mb-4">Panel de Inversionista</h2>
              <p className="text-muted-foreground text-center mb-6">
                Gestiona cuentas de clientes, registra movimientos financieros y genera reportes automáticos
              </p>
              <Link to="/investor" className="block">
                <Button className="w-full" size="lg">
                  Acceder como Inversionista
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-elevated hover:shadow-card transition-all duration-300 hover:scale-105 animate-fade-in bg-gradient-card" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-8">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-success/10">
                  <Users className="h-12 w-12 text-success" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center mb-4">Panel de Cliente</h2>
              <p className="text-muted-foreground text-center mb-6">
                Visualiza tu portafolio, ganancias, pérdidas y accede a tu cuenta fintech integrada
              </p>
              <Link to="/client" className="block">
                <Button className="w-full" size="lg" variant="outline">
                  Acceder como Cliente
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="shadow-card bg-card/50 backdrop-blur">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Transparencia Total</h3>
              <p className="text-sm text-muted-foreground">
                Visualiza todas tus inversiones y movimientos en tiempo real
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-card/50 backdrop-blur">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-success mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Gráficas Avanzadas</h3>
              <p className="text-sm text-muted-foreground">
                Análisis detallado de rendimiento con visualizaciones interactivas
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-card/50 backdrop-blur">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-accent mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Fintech Integrado</h3>
              <p className="text-sm text-muted-foreground">
                Accede a tu dinero cuando lo necesites con nuestra cuenta integrada
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
