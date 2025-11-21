// Mock Data for the Dashboard

export interface User {
  id: string;
  username: string;
  avatar: string;
  coins: number;
  wins: number;
  losses: number;
  rank: string;
  winRate: number;
}

export interface Queue {
  id: string;
  value: number;
  type: '1v1' | 'emulador';
  players: number;
  status: 'open' | 'closed';
}

export const mockUsers: User[] = [
  { id: '1', username: 'ZeusGod', avatar: 'https://github.com/shadcn.png', coins: 1500.50, wins: 142, losses: 12, rank: 'Admin', winRate: 92 },
  { id: '2', username: 'ProPlayer_BR', avatar: '', coins: 450.00, wins: 89, losses: 45, rank: 'Gold', winRate: 66 },
  { id: '3', username: 'MobileKing', avatar: '', coins: 120.00, wins: 56, losses: 50, rank: 'Silver', winRate: 52 },
  { id: '4', username: 'EmuMaster', avatar: '', coins: 890.00, wins: 112, losses: 30, rank: 'Diamond', winRate: 78 },
  { id: '5', username: 'NoobSlayer', avatar: '', coins: 50.00, wins: 10, losses: 5, rank: 'Bronze', winRate: 66 },
];

// Values from main.py: [100.00, 50.00, 40.00, 30.00, 20.00, 10.00, 5.00, 3.00, 2.00, 1.00, 0.80, 0.40]
export const mockQueues: Queue[] = [
  { id: 'q1', value: 0.40, type: '1v1', players: 0, status: 'open' },
  { id: 'q2', value: 0.80, type: '1v1', players: 1, status: 'open' },
  { id: 'q3', value: 1.00, type: '1v1', players: 2, status: 'closed' },
  { id: 'q4', value: 2.00, type: '1v1', players: 0, status: 'open' },
  { id: 'q5', value: 3.00, type: '1v1', players: 0, status: 'open' },
  { id: 'q6', value: 5.00, type: '1v1', players: 1, status: 'open' },
  { id: 'q7', value: 10.00, type: 'emulador', players: 1, status: 'open' },
  { id: 'q8', value: 20.00, type: 'emulador', players: 0, status: 'open' },
  { id: 'q9', value: 30.00, type: 'emulador', players: 0, status: 'open' },
  { id: 'q10', value: 40.00, type: 'emulador', players: 2, status: 'closed' },
  { id: 'q11', value: 50.00, type: '1v1', players: 0, status: 'open' },
  { id: 'q12', value: 100.00, type: '1v1', players: 0, status: 'open' },
];

export const mockLogs = [
  { id: 1, action: 'Partida Criada', details: 'Fila 0.40 Mob', time: '10:30', user: 'ZeusGod' },
  { id: 2, action: 'Vitória', details: 'ProPlayer_BR venceu MobileKing (1.00)', time: '10:35', user: 'System' },
  { id: 3, action: 'Pagamento', details: 'Pix confirmado R$ 5.00', time: '10:42', user: 'MediatorBot' },
];
