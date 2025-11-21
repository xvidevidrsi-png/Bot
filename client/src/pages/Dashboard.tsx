import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockUsers, mockLogs, mockQueues } from '@/lib/mockData';
import { Activity, Users, DollarSign, Swords, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

const data = [
  { name: '00h', total: 12 },
  { name: '04h', total: 5 },
  { name: '08h', total: 25 },
  { name: '12h', total: 45 },
  { name: '16h', total: 80 },
  { name: '20h', total: 110 },
  { name: '23h', total: 65 },
];

export default function Dashboard() {
  const totalJogadores = mockUsers.length * 124; // Mock multiplier
  const filasAtivas = mockQueues.filter(q => q.status === 'open').length;
  
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do servidor Zeus.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card/50 backdrop-blur border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Jogadores</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalJogadores}</div>
              <p className="text-xs text-muted-foreground flex items-center text-green-500">
                <ArrowUpRight className="mr-1 h-4 w-4" /> +20.1% este mês
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Filas Ativas</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filasAtivas}</div>
              <p className="text-xs text-muted-foreground flex items-center text-green-500">
                <ArrowUpRight className="mr-1 h-4 w-4" /> +4 novas agora
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Volume Diário</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 1,240.50</div>
              <p className="text-xs text-muted-foreground flex items-center text-red-500">
                <ArrowDownRight className="mr-1 h-4 w-4" /> -4% que ontem
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Partidas Hoje</CardTitle>
              <Swords className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground flex items-center text-green-500">
                <ArrowUpRight className="mr-1 h-4 w-4" /> +201 que a média
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Chart */}
          <Card className="col-span-4 border-border/50 bg-card/30">
            <CardHeader>
              <CardTitle>Atividade do Servidor</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#888888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="#888888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `${value}`} 
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="total" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorTotal)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Logs */}
          <Card className="col-span-3 border-border/50 bg-card/30">
            <CardHeader>
              <CardTitle>Logs Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {mockLogs.map((log) => (
                  <div key={log.id} className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary font-bold text-xs">
                      {log.user.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{log.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {log.details}
                      </p>
                    </div>
                    <div className="ml-auto font-medium text-xs text-muted-foreground">
                      {log.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
