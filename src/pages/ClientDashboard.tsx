import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Wallet, DollarSign, ArrowUpRight, ArrowDownRight, CreditCard, Send, Download, Home, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const ClientDashboard = () => {
  // Mock data - Incluye pérdidas
  const portfolioData = [
    { month: "Ene", value: 98000, invested: 100000, gain: -2000 },
    { month: "Feb", value: 102000, invested: 100000, gain: 2000 },
    { month: "Mar", value: 97000, invested: 100000, gain: -3000 },
    { month: "Abr", value: 110000, invested: 100000, gain: 10000 },
    { month: "May", value: 115000, invested: 100000, gain: 15000 },
    { month: "Jun", value: 125000, invested: 100000, gain: 25000 },
  ];

  const assetDistribution = [
    { name: "Acciones Tech", value: 35, amount: 43750, return: 12.5 },
    { name: "Bonos Corporativos", value: 25, amount: 31250, return: 5.2 },
    { name: "Inmobiliario", value: 20, amount: 25000, return: -3.8 },
    { name: "Fondos Indexados", value: 15, amount: 18750, return: 8.9 },
    { name: "Cripto", value: 5, amount: 6250, return: -15.3 },
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--success))', 'hsl(var(--accent))', 'hsl(var(--warning))', 'hsl(var(--destructive))'];

  const transactions = [
    { id: 1, type: "Depósito", amount: 5000, date: "2025-10-30", status: "Completado" },
    { id: 2, type: "Ganancia", amount: 1250, date: "2025-10-25", status: "Completado" },
    { id: 3, type: "Pérdida", amount: -1500, date: "2025-10-22", status: "Completado" },
    { id: 4, type: "Inversión", amount: -3000, date: "2025-10-20", status: "Procesando" },
    { id: 5, type: "Retiro", amount: -500, date: "2025-10-15", status: "Completado" },
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
            <TabsTrigger value="reports">Reportes</TabsTrigger>
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
                        <TableCell className={asset.return >= 0 ? "text-success" : "text-destructive"}>
                          {asset.return >= 0 ? '+' : ''}{asset.return}%
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">Ver Detalles</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{asset.name}</DialogTitle>
                                <DialogDescription>
                                  Información detallada del activo
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 pt-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground">Valor Actual</p>
                                    <p className="text-2xl font-bold">${asset.amount.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Porcentaje</p>
                                    <p className="text-2xl font-bold">{asset.value}%</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Rendimiento</p>
                                    <p className={`text-2xl font-bold ${asset.return >= 0 ? 'text-success' : 'text-destructive'}`}>
                                      {asset.return >= 0 ? '+' : ''}{asset.return}%
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Ganancia/Pérdida</p>
                                    <p className={`text-2xl font-bold ${asset.return >= 0 ? 'text-success' : 'text-destructive'}`}>
                                      {asset.return >= 0 ? '+' : ''}${((asset.amount * asset.return) / 100).toFixed(0)}
                                    </p>
                                  </div>
                                </div>
                                <div className="pt-4 border-t">
                                  <p className="text-sm text-muted-foreground mb-2">Descripción</p>
                                  <p className="text-sm">
                                    {asset.name === "Acciones Tech" && "Inversión en empresas tecnológicas de alto crecimiento con potencial a largo plazo."}
                                    {asset.name === "Bonos Corporativos" && "Inversión en bonos de empresas sólidas con retorno estable y bajo riesgo."}
                                    {asset.name === "Inmobiliario" && "Inversión en bienes raíces y REITs con ingresos por rentas."}
                                    {asset.name === "Fondos Indexados" && "Fondos que replican índices del mercado para diversificación pasiva."}
                                    {asset.name === "Cripto" && "Inversión en criptomonedas de alta volatilidad y potencial especulativo."}
                                  </p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
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
                <CardDescription>Historial detallado de rendimiento mensual</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={portfolioData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                    <Line 
                      type="monotone" 
                      dataKey="gain" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3} 
                      name="Ganancia/Pérdida"
                      dot={(props) => {
                        const { cx, cy, payload } = props;
                        return (
                          <circle
                            cx={cx}
                            cy={cy}
                            r={5}
                            fill={payload.gain >= 0 ? "hsl(var(--success))" : "hsl(var(--destructive))"}
                          />
                        );
                      }}
                    />
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

          <TabsContent value="reports" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Reportes Mensuales</CardTitle>
                <CardDescription>Historial de reportes de tu cuenta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  {["Octubre 2025", "Septiembre 2025", "Agosto 2025", "Julio 2025", "Junio 2025"].map((month, index) => {
                    const isProfit = index % 2 === 0;
                    const amount = isProfit ? (2500 + index * 500) : -(1200 + index * 300);
                    const percentage = isProfit ? (2.5 + index * 0.5) : -(1.2 + index * 0.3);
                    
                    return (
                      <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className={`p-3 rounded-full ${isProfit ? 'bg-success/10' : 'bg-destructive/10'}`}>
                                <FileText className={`h-5 w-5 ${isProfit ? 'text-success' : 'text-destructive'}`} />
                              </div>
                              <div>
                                <h3 className="font-semibold">Reporte {month}</h3>
                                <p className="text-sm text-muted-foreground">Generado el {index + 1} de {month.split(' ')[0]}</p>
                              </div>
                            </div>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">Ver Reporte</Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Reporte Mensual - {month}</DialogTitle>
                                  <DialogDescription>
                                    Resumen detallado de tu portafolio
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-6 pt-4">
                                  <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center p-4 rounded-lg bg-secondary">
                                      <p className="text-sm text-muted-foreground">Balance Inicial</p>
                                      <p className="text-xl font-bold">${(100000 + index * 5000).toLocaleString()}</p>
                                    </div>
                                    <div className="text-center p-4 rounded-lg bg-secondary">
                                      <p className="text-sm text-muted-foreground">Balance Final</p>
                                      <p className="text-xl font-bold">${(100000 + index * 5000 + amount).toLocaleString()}</p>
                                    </div>
                                    <div className="text-center p-4 rounded-lg bg-secondary">
                                      <p className="text-sm text-muted-foreground">Cambio</p>
                                      <p className={`text-xl font-bold ${isProfit ? 'text-success' : 'text-destructive'}`}>
                                        {isProfit ? '+' : ''}${amount.toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <div className="border-t pt-4">
                                    <h4 className="font-semibold mb-3">Resumen de Operaciones</h4>
                                    <div className="space-y-2">
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Depósitos</span>
                                        <span className="font-medium">${(5000 + index * 1000).toLocaleString()}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Retiros</span>
                                        <span className="font-medium">-${(2000 + index * 500).toLocaleString()}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Ganancias de inversión</span>
                                        <span className="font-medium text-success">+${(3500 + index * 600).toLocaleString()}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Pérdidas de inversión</span>
                                        <span className="font-medium text-destructive">-${(1200 + index * 400).toLocaleString()}</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="border-t pt-4">
                                    <h4 className="font-semibold mb-3">Rendimiento</h4>
                                    <div className="flex items-center justify-center p-6 rounded-lg bg-secondary">
                                      <div className="text-center">
                                        <p className="text-sm text-muted-foreground mb-2">ROI del Mes</p>
                                        <p className={`text-4xl font-bold ${isProfit ? 'text-success' : 'text-destructive'}`}>
                                          {isProfit ? '+' : ''}{percentage.toFixed(1)}%
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex justify-end gap-2">
                                    <Button variant="outline">
                                      <Download className="h-4 w-4 mr-2" />
                                      Descargar PDF
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Rendimiento</p>
                              <p className={`font-semibold ${isProfit ? 'text-success' : 'text-destructive'}`}>
                                {isProfit ? '+' : ''}{percentage.toFixed(1)}%
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Cambio</p>
                              <p className={`font-semibold ${isProfit ? 'text-success' : 'text-destructive'}`}>
                                {isProfit ? '+' : ''}${Math.abs(amount).toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Estado</p>
                              <span className="px-2 py-1 rounded-full text-xs bg-success/10 text-success">
                                Completado
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
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
                          {transaction.type === "Pérdida" && "Pérdida en inversiones"}
                          {transaction.type === "Inversión" && "Compra de activos"}
                          {transaction.type === "Retiro" && "Transferencia a banco"}
                        </TableCell>
                        <TableCell className={transaction.amount > 0 ? "text-success" : transaction.type === "Pérdida" ? "text-destructive" : "text-foreground"}>
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
