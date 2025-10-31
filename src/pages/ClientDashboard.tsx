import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Wallet, DollarSign, ArrowUpRight, ArrowDownRight, CreditCard, Send, Download, Home } from "lucide-react";
import { Link } from "react-router-dom";

const ClientDashboard = () => {
  // Mock data
  const portfolioData = [
    { month: "Ene", value: 98000, invested: 100000 },
    { month: "Feb", value: 102000, invested: 100000 },
    { month: "Mar", value: 105000, invested: 100000 },
    { month: "Abr", value: 110000, invested: 100000 },
    { month: "May", value: 115000, invested: 100000 },
    { month: "Jun", value: 125000, invested: 100000 },
  ];

  const assetDistribution = [
    { name: "Acciones Tech", value: 35, amount: 43750 },
    { name: "Bonos Corporativos", value: 25, amount: 31250 },
    { name: "Inmobiliario", value: 20, amount: 25000 },
    { name: "Fondos Indexados", value: 15, amount: 18750 },
    { name: "Cripto", value: 5, amount: 6250 },
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--success))', 'hsl(var(--accent))', 'hsl(var(--warning))', 'hsl(var(--destructive))'];

  const transactions = [
    { id: 1, type: "Depósito", amount: 5000, date: "2025-10-30", status: "Completado" },
    { id: 2, type: "Ganancia", amount: 1250, date: "2025-10-25", status: "Completado" },
    { id: 3, type: "Inversión", amount: -3000, date: "2025-10-20", status: "Procesando" },
    { id: 4, type: "Retiro", amount: -500, date: "2025-10-15", status: "Completado" },
  ];

  const currentBalance = 125000;
  const invested = 100000;
  const returns = 25000;
  const availableCash = 8500;
  const investedCash = currentBalance - availableCash;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wallet className="h-8 w-8 text-success" />
            <h1 className="text-2xl font-bold">Mi Portafolio</h1>
          </div>
          <Link to="/">
            <Button variant="outline" size="sm">
              <Home className="h-4 w-4 mr-2" />
              Inicio
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="shadow-card bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Balance Total</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${currentBalance.toLocaleString()}</div>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <ArrowUpRight className="h-3 w-3" />
                +25% vs inicial
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Rendimientos</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">+${returns.toLocaleString()}</div>
              <p className="text-xs text-success mt-1">
                +{((returns / invested) * 100).toFixed(1)}% ROI
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Invertido</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${investedCash.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {((investedCash / currentBalance) * 100).toFixed(0)}% del total
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Disponible</CardTitle>
              <Wallet className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${availableCash.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Efectivo listo para usar
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList>
            <TabsTrigger value="portfolio">Portafolio</TabsTrigger>
            <TabsTrigger value="performance">Rendimiento</TabsTrigger>
            <TabsTrigger value="fintech">Cuenta Fintech</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Evolución del Portafolio</CardTitle>
                  <CardDescription>Valor total vs inversión inicial</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={portfolioData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                      <Area type="monotone" dataKey="invested" stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" fill="none" />
                      <Area type="monotone" dataKey="value" stroke="hsl(var(--success))" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Distribución de Activos</CardTitle>
                  <CardDescription>Tu portafolio diversificado</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={assetDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {assetDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name, props) => [`$${props.payload.amount.toLocaleString()}`, name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Detalle de Activos</CardTitle>
                <CardDescription>Composición completa de tu portafolio</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Activo</TableHead>
                      <TableHead>Porcentaje</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Rendimiento</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assetDistribution.map((asset, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                            <span className="font-medium">{asset.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{asset.value}%</TableCell>
                        <TableCell>${asset.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-success">+{(Math.random() * 10 + 5).toFixed(1)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Rendimiento Mensual</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success">+8.7%</div>
                  <p className="text-sm text-muted-foreground mt-2">Octubre 2025</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Rendimiento Anual</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success">+25.0%</div>
                  <p className="text-sm text-muted-foreground mt-2">Últimos 12 meses</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Mejor Inversión</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success">+42.3%</div>
                  <p className="text-sm text-muted-foreground mt-2">Acciones Tech</p>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Gráfica de Ganancias y Pérdidas</CardTitle>
                <CardDescription>Historial detallado de rendimiento</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={portfolioData.map((d, i) => ({ 
                    ...d, 
                    gain: d.value - d.invested 
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                    <Line type="monotone" dataKey="gain" stroke="hsl(var(--success))" strokeWidth={3} name="Ganancia" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fintech" className="space-y-6">
            <Card className="shadow-elevated bg-gradient-primary text-primary-foreground">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Saldo Disponible</p>
                      <p className="text-4xl font-bold">${availableCash.toLocaleString()}</p>
                    </div>
                    <CreditCard className="h-12 w-12 opacity-80" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="opacity-90">**** **** **** 4789</span>
                    <span className="opacity-90">Válida hasta 12/28</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <Card className="shadow-card hover:shadow-elevated transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Send className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Transferir</h3>
                    <p className="text-sm text-muted-foreground">Envía dinero a otras cuentas</p>
                    <Button className="w-full">Transferir</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elevated transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 rounded-full bg-success/10">
                      <Download className="h-6 w-6 text-success" />
                    </div>
                    <h3 className="font-semibold">Retirar</h3>
                    <p className="text-sm text-muted-foreground">Retira a tu banco</p>
                    <Button variant="outline" className="w-full">Retirar</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elevated transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 rounded-full bg-accent/10">
                      <TrendingUp className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-semibold">Invertir Más</h3>
                    <p className="text-sm text-muted-foreground">Aumenta tu inversión</p>
                    <Button variant="outline" className="w-full">Invertir</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Últimas Transacciones</CardTitle>
                <CardDescription>Movimientos en tu cuenta fintech</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          transaction.amount > 0 ? "bg-success/10" : "bg-muted"
                        }`}>
                          {transaction.amount > 0 ? (
                            <ArrowDownRight className="h-4 w-4 text-success" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.type}</p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.amount > 0 ? "text-success" : "text-foreground"
                        }`}>
                          {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">{transaction.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Historial Completo</CardTitle>
                <CardDescription>Todas tus transacciones e inversiones</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Monto</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...transactions, ...transactions].map((transaction, index) => (
                      <TableRow key={index}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {transaction.type === "Depósito" && "Transferencia desde banco"}
                          {transaction.type === "Ganancia" && "Rendimiento de inversiones"}
                          {transaction.type === "Inversión" && "Compra de activos"}
                          {transaction.type === "Retiro" && "Transferencia a banco"}
                        </TableCell>
                        <TableCell className={transaction.amount > 0 ? "text-success" : "text-foreground"}>
                          {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            transaction.status === "Completado" 
                              ? "bg-success/10 text-success" 
                              : "bg-warning/10 text-warning"
                          }`}>
                            {transaction.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ClientDashboard;
