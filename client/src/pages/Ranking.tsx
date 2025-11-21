import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockUsers } from '@/lib/mockData';
import { Trophy, Medal, Crown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Ranking() {
  const sortedUsers = [...mockUsers].sort((a, b) => b.wins - a.wins);
  const top3 = sortedUsers.slice(0, 3);
  const rest = sortedUsers.slice(3);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Crown className="h-6 w-6 text-yellow-500 fill-yellow-500/20" />;
      case 1: return <Medal className="h-6 w-6 text-gray-400 fill-gray-400/20" />;
      case 2: return <Medal className="h-6 w-6 text-amber-700 fill-amber-700/20" />;
      default: return <span className="text-muted-foreground font-bold">#{index + 1}</span>;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Ranking Global</h1>
          <p className="text-muted-foreground">Os melhores jogadores do servidor Zeus.</p>
        </div>

        <Tabs defaultValue="geral" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-[400px]">
            <TabsTrigger value="geral">Geral</TabsTrigger>
            <TabsTrigger value="1v1">1v1 Mobile</TabsTrigger>
            <TabsTrigger value="emu">Emulador</TabsTrigger>
          </TabsList>
          
          <TabsContent value="geral" className="space-y-6 mt-6">
            {/* Top 3 Podium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {top3.map((user, index) => (
                <Card key={user.id} className={`border-primary/20 bg-card/50 backdrop-blur relative overflow-hidden ${index === 0 ? 'md:-mt-4 border-primary/50 shadow-lg shadow-primary/10' : ''}`}>
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                  <CardHeader className="flex flex-col items-center pb-2">
                    <div className="mb-2">{getRankIcon(index)}</div>
                    <Avatar className="h-20 w-20 border-4 border-background shadow-xl">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="text-xl bg-secondary">{user.username[0]}</AvatarFallback>
                    </Avatar>
                  </CardHeader>
                  <CardContent className="text-center space-y-1">
                    <div className="font-bold text-lg">{user.username}</div>
                    <Badge variant="secondary" className="mb-2">{user.rank}</Badge>
                    <div className="grid grid-cols-2 gap-2 text-sm mt-4">
                      <div className="bg-background/50 p-2 rounded">
                        <div className="text-muted-foreground text-xs uppercase">Vitórias</div>
                        <div className="font-bold text-primary">{user.wins}</div>
                      </div>
                      <div className="bg-background/50 p-2 rounded">
                        <div className="text-muted-foreground text-xs uppercase">WinRate</div>
                        <div className="font-bold text-green-500">{user.winRate}%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Rest of the list */}
            <Card className="border-border/50 bg-card/30">
              <CardContent className="p-0">
                {rest.map((user, index) => (
                  <div key={user.id} className="flex items-center p-4 border-b border-border/50 last:border-0 hover:bg-white/5 transition-colors">
                    <div className="w-12 flex justify-center font-mono font-bold text-muted-foreground">
                      #{index + 4}
                    </div>
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{user.username}</div>
                      <div className="text-xs text-muted-foreground">Nível 42 • {user.rank}</div>
                    </div>
                    <div className="text-right px-4">
                      <div className="font-bold">{user.wins} W</div>
                      <div className="text-xs text-muted-foreground">{user.losses} L</div>
                    </div>
                    <div className="w-20 text-right font-mono text-primary">
                      {user.winRate}%
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="1v1">
            <div className="p-8 text-center text-muted-foreground border border-dashed border-border rounded-lg">
              Ranking Mobile em breve...
            </div>
          </TabsContent>
          <TabsContent value="emu">
             <div className="p-8 text-center text-muted-foreground border border-dashed border-border rounded-lg">
              Ranking Emulador em breve...
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
