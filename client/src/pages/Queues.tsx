import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { mockQueues } from '@/lib/mockData';
import { Users, Gamepad2, Smartphone, AlertCircle } from 'lucide-react';
import { Link } from 'wouter';

export default function Queues() {
  // Simulating the config state requested by user
  // "Filas nao podem ser criadas se o comando /aux_config se nao estiver configurado"
  const isConfigured = false; // Mocking this as false to show the restriction

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Filas Disponíveis</h1>
            <p className="text-muted-foreground">Escolha uma fila para entrar e aguarde um oponente.</p>
          </div>
          
          {isConfigured ? (
             <Button className="bg-primary hover:bg-primary/90">
              Criar Nova Fila
            </Button>
          ) : (
            <Button disabled variant="secondary" className="opacity-50 cursor-not-allowed">
              Criar Nova Fila (Bloqueado)
            </Button>
          )}
        </div>

        {!isConfigured && (
          <Alert variant="destructive" className="bg-destructive/10 border-destructive/50 text-destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Configuração Necessária</AlertTitle>
            <AlertDescription>
              As filas não podem ser criadas pois o comando <strong>/aux_config</strong> e <strong>/topico</strong> não estão configurados.
              <Link href="/config" className="underline ml-2 font-bold hover:text-white">Configurar agora</Link>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockQueues.map((queue) => (
            <Card key={queue.id} className="group relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-all" />
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={queue.type === '1v1' ? 'default' : 'secondary'} className="uppercase">
                    {queue.type === '1v1' ? <Smartphone className="mr-1 h-3 w-3" /> : <Gamepad2 className="mr-1 h-3 w-3" />}
                    {queue.type}
                  </Badge>
                  <div className="flex items-center text-muted-foreground text-xs font-mono bg-background/50 px-2 py-1 rounded">
                    <Users className="mr-1 h-3 w-3" /> {queue.players}/2
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold flex items-baseline gap-1">
                  <span className="text-sm font-normal text-muted-foreground">R$</span>
                  {queue.value.toFixed(2)}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500" 
                    style={{ width: `${(queue.players / 2) * 100}%` }} 
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {queue.players === 0 ? 'Fila vazia, seja o primeiro!' : 'Aguardando oponente...'}
                </p>
              </CardContent>

              <CardFooter>
                <Button className="w-full font-bold" disabled={queue.status === 'closed'}>
                  {queue.status === 'closed' ? 'Fila Fechada' : 'Entrar na Fila'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
