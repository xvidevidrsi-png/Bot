import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockUsers } from '@/lib/mockData';
import { Wallet, Trophy, TrendingDown, Share2, Edit } from 'lucide-react';

export default function Profile() {
  // Using the first mock user as the "logged in" user
  const user = mockUsers[0];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Profile */}
        <div className="relative">
          {/* Banner */}
          <div className="h-48 w-full bg-gradient-to-r from-primary/20 via-primary/10 to-background rounded-xl border border-border/50 overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&q=80')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
          </div>
          
          {/* User Info */}
          <div className="px-8 flex flex-col md:flex-row items-end -mt-12 gap-6">
            <Avatar className="h-32 w-32 border-4 border-background shadow-2xl">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-4xl bg-secondary">{user.username[0]}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 mb-4 space-y-1">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                {user.username} 
                <Badge variant="default" className="ml-2 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20">
                  {user.rank}
                </Badge>
              </h1>
              <p className="text-muted-foreground">Membro desde Nov 2025 • ID: {user.id}</p>
            </div>

            <div className="flex gap-2 mb-4">
              <Button variant="outline" size="sm"><Share2 className="mr-2 h-4 w-4"/> Compartilhar</Button>
              <Button size="sm"><Edit className="mr-2 h-4 w-4"/> Editar Perfil</Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card/50 backdrop-blur border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Saldo Atual</CardTitle>
              <Wallet className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {user.coins.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">Disponível para saque</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Vitórias</CardTitle>
              <Trophy className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{user.wins}</div>
              <p className="text-xs text-muted-foreground mt-1">Winrate: {user.winRate}%</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-red-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Derrotas</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{user.losses}</div>
              <p className="text-xs text-muted-foreground mt-1">Total de partidas: {user.wins + user.losses}</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent History */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Histórico de Partidas</CardTitle>
            <CardDescription>Suas últimas 10 partidas no servidor.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border/40 hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`h-2 w-2 rounded-full ${i % 2 === 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                    <div>
                      <div className="font-medium">vs. Player_Test_{i}</div>
                      <div className="text-xs text-muted-foreground">1v1 Mobile • R$ 10.00</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${i % 2 === 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {i % 2 === 0 ? '+R$ 10.00' : '-R$ 10.00'}
                    </div>
                    <div className="text-xs text-muted-foreground">Hoje, 14:30</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
