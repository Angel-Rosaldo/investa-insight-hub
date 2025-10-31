import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, DollarSign, ArrowUpRight, ArrowDownRight, Plus, FileText, Home } from "lucide-react";
import { Link } from "react-router-dom";

const InvestorDashboard = () => {
  const [selectedClient, setSelectedClient] = useState("all");

  // Mock data
  const clients = [
    { id: "1", name: "Juan Pérez", balance: 125000, invested: 100000, returns: 25000 },
    { id: "2", name: "María García", balance: 85000, invested: 80000, returns: 5000 },
    { id: "3", name: "Carlos López", balance: 200000, invested: 180000, returns: 20000 },
  ];

  const performanceData = [
    { month: "Ene", value: 280000 },
    { month: "Feb", value: 310000 },
    { month: "Mar", value: 295000 },
    { month: "Abr", value: 340000 },
    { month: "May", value: 370000 },
    { month: "Jun", value: 410000 },
  ];

  const distributionData = [
    { name: "Acciones", value: 45 },
    { name: "Bonos", value: 25 },
    { name: "Inmobiliario", value: 20 },
    { name: "Cripto", value: 10 },
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--success))', 'hsl(var(--accent))', 'hsl(var(--warning))'];

  const recentMovements = [
    { id: 1, client: "Juan Pérez", type: "Inversión", amount: 5000, date: "2025-10-30", status: "Completado" },
    { id: 2, client: "María García", type: "Retiro", amount: -2000, date: "2025-10-29", status: "Procesando" },
    { id: 3, client: "Carlos López", type: "Ganancia", amount: 3500, date: "2025-10-28", status: "Completado" },
  ];

  const totalBalance = clients.reduce((sum, client) => sum + client.balance, 0);
  const totalInvested = clients.reduce((sum, client) => sum + client.invested, 0);
  const totalReturns = clients.reduce((sum, client) => sum + client.returns, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Panel de Inversionista</h1>
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
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Balance Total</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalBalance.toLocaleString()}</div>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <ArrowUpRight className="h-3 w-3" />
                +12.5% vs mes anterior
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Invertido</CardTitle>
              <TrendingUp className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalInvested.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                En {clients.length} cuentas activas
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Rendimientos</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">${totalReturns.toLocaleString()}</div>
              <p className="text-xs text-success mt-1">
                +{((totalReturns / totalInvested) * 100).toFixed(1)}% ROI
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clients.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Total de cuentas gestionadas
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
            <TabsTrigger value="movements">Movimientos</TabsTrigger>
            <TabsTrigger value="reports">Reportes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Crecimiento del Portafolio</CardTitle>
                  <CardDescription>Últimos 6 meses</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                      <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Distribución de Activos</CardTitle>
                  <CardDescription>Cartera diversificada</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={distributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {distributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Gestión de Clientes</CardTitle>
                <CardDescription>Administra las cuentas de tus clientes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Cliente
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Balance Total</TableHead>
                      <TableHead>Invertido</TableHead>
                      <TableHead>Rendimientos</TableHead>
                      <TableHead>ROI</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell>${client.balance.toLocaleString()}</TableCell>
                        <TableCell>${client.invested.toLocaleString()}</TableCell>
                        <TableCell className="text-success">${client.returns.toLocaleString()}</TableCell>
                        <TableCell className="text-success">
                          +{((client.returns / client.invested) * 100).toFixed(1)}%
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Ver Detalles</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="movements" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Registrar Movimiento</CardTitle>
                <CardDescription>Añade un nuevo movimiento financiero</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <Label>Cliente</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo de movimiento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="investment">Inversión</SelectItem>
                        <SelectItem value="withdrawal">Retiro</SelectItem>
                        <SelectItem value="profit">Ganancia</SelectItem>
                        <SelectItem value="loss">Pérdida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Monto</Label>
                    <Input type="number" placeholder="$0.00" />
                  </div>
                  <div className="space-y-2 flex items-end">
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Registrar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Movimientos Recientes</CardTitle>
                <CardDescription>Últimas transacciones registradas</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Monto</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentMovements.map((movement) => (
                      <TableRow key={movement.id}>
                        <TableCell className="font-medium">{movement.client}</TableCell>
                        <TableCell>{movement.type}</TableCell>
                        <TableCell className={movement.amount > 0 ? "text-success" : "text-destructive"}>
                          {movement.amount > 0 ? "+" : ""}${Math.abs(movement.amount).toLocaleString()}
                        </TableCell>
                        <TableCell>{movement.date}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            movement.status === "Completado" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                          }`}>
                            {movement.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Generar Reportes</CardTitle>
                <CardDescription>Crea reportes automáticos para tus clientes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Cliente</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los clientes</SelectItem>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Período</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar período" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Mensual</SelectItem>
                        <SelectItem value="quarterly">Trimestral</SelectItem>
                        <SelectItem value="annual">Anual</SelectItem>
                        <SelectItem value="custom">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 flex items-end">
                    <Button className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Generar Reporte
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold">Reportes Recientes</h3>
                  <div className="space-y-2">
                    {["Reporte Mensual - Octubre 2025", "Reporte Trimestral Q3 2025", "Reporte Anual 2024"].map((report, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <span className="text-sm">{report}</span>
                        </div>
                        <Button variant="ghost" size="sm">Descargar</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default InvestorDashboard;
