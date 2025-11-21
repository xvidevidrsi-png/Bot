import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Save } from 'lucide-react';

export default function Config() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">Gerencie as preferências do bot e do painel.</p>
        </div>

        <Card className="border-primary/20 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Configurações Gerais</CardTitle>
            <CardDescription>Ajustes básicos do funcionamento do bot.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Manutenção</Label>
                <p className="text-sm text-muted-foreground">
                  Ativar modo de manutenção (bloqueia novas filas)
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Logs Públicos</Label>
                <p className="text-sm text-muted-foreground">
                  Enviar logs de partidas em canais públicos
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="grid gap-2">
              <Label htmlFor="prefix">Prefixo do Bot</Label>
              <div className="flex gap-2">
                <Input id="prefix" defaultValue="!" className="max-w-[100px]" />
                <Button variant="outline">Resetar</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Economia</CardTitle>
            <CardDescription>Taxas e valores das filas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="taxa">Taxa Administrativa (%)</Label>
              <Input id="taxa" type="number" defaultValue="10" />
              <p className="text-[0.8rem] text-muted-foreground">
                Porcentagem retida pelo bot em cada partida. (Valor atual: 0.10)
              </p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="min-saque">Valor Mínimo de Saque (R$)</Label>
              <Input id="min-saque" type="number" defaultValue="5.00" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="coin-win">Coins por Vitória</Label>
              <Input id="coin-win" type="number" defaultValue="1" />
              <p className="text-[0.8rem] text-muted-foreground">
                Quantidade de coins recebidos ao vencer uma partida.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="ghost">Descartar</Button>
          <Button className="bg-primary text-white">
            <Save className="mr-2 h-4 w-4" />
            Salvar Alterações
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
