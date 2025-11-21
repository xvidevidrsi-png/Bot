import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockUsers } from '@/lib/mockData';
import { Trophy, Medal, Crown, User as UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function Ranking() {
  const sortedUsers = [...mockUsers].sort((a, b) => b.wins - a.wins);
  const currentUser = mockUsers[0]; // Simulating logged user

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Ranking</h1>
        </div>

        {/* PERFIL (EMBED) */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider ml-1">Perfil</h2>
          <Card className="border-l-4 border-l-primary bg-card/80 backdrop-blur">
            <CardContent className="p-6 flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback>{currentUser.username[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">{currentUser.username}</h3>
                  <Badge variant="secondary">{currentUser.rank}</Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Vitórias</p>
                    <p className="font-mono font-bold text-green-500">{currentUser.wins}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Derrotas</p>
                    <p className="font-mono font-bold text-red-500">{currentUser.losses}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Saldo</p>
                    <p className="font-mono font-bold text-primary">R$ {currentUser.coins.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RANK (EMBED) */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider ml-1">Rank Global</h2>
          <Card className="bg-card/50 backdrop-blur border-primary/20">
            <CardContent className="p-0">
              {sortedUsers.map((user, index) => (
                <div 
                  key={user.id} 
                  className={`flex items-center p-4 border-b border-border/50 last:border-0 transition-colors hover:bg-white/5 ${index === 0 ? 'bg-primary/5' : ''}`}
                >
                  <div className="w-12 flex justify-center font-mono font-bold text-lg">
                    {index === 0 && <Crown className="h-6 w-6 text-yellow-500" />}
                    {index === 1 && <Medal className="h-6 w-6 text-gray-400" />}
                    {index === 2 && <Medal className="h-6 w-6 text-amber-700" />}
                    {index > 2 && <span className="text-muted-foreground">#{index + 1}</span>}
                  </div>
                  
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.username[0]}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="font-medium flex items-center gap-2">
                      {user.username}
                      {index === 0 && <Badge className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 border-0 text-[10px] px-1 py-0">TOP 1</Badge>}
                    </div>
                    <div className="text-xs text-muted-foreground">WinRate: {user.winRate}%</div>
                  </div>
                  
                  <div className="text-right px-4">
                    <div className="font-bold text-foreground">{user.wins}</div>
                    <div className="text-xs text-muted-foreground">Vitórias</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
