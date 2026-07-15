import { YonoApp, RecentWinner } from './types';

export const INITIAL_APPS: YonoApp[] = [
  {
    id: 'yono-rummy',
    name: 'Yono Rummy Classic',
    category: 'Rummy',
    bonusAmount: 51,
    downloadUrl: 'https://yonogames.com/rummy-classic?ref=yono_bonus',
    rating: 4.8,
    playersCount: '2.5M+',
    isPopular: true
  },
  {
    id: 'yono-slots',
    name: 'Yono Slots Deluxe',
    category: 'Slots',
    bonusAmount: 75,
    downloadUrl: 'https://yonogames.com/slots-deluxe?ref=yono_bonus',
    rating: 4.9,
    playersCount: '1.8M+',
    isPopular: true
  },
  {
    id: 'yono-arcade',
    name: 'Yono Arcade',
    category: 'Arcade',
    bonusAmount: 100,
    downloadUrl: 'https://yonogames.com/arcade?ref=yono_bonus',
    rating: 4.7,
    playersCount: '980K+',
    isPopular: true
  },
  {
    id: 'yono-777',
    name: 'Yono 777 Jackpot',
    category: 'Slots',
    bonusAmount: 60,
    downloadUrl: 'https://yonogames.com/jackpot-777?ref=yono_bonus',
    rating: 4.6,
    playersCount: '1.2M+'
  },
  {
    id: 'yono-vip',
    name: 'Yono VIP Club',
    category: 'Card',
    bonusAmount: 85,
    downloadUrl: 'https://yonogames.com/vip-club?ref=yono_bonus',
    rating: 4.9,
    playersCount: '450K+'
  },
  {
    id: 'yono-gold',
    name: 'Yono Gold Predictor',
    category: 'Predict',
    bonusAmount: 99,
    downloadUrl: 'https://yonogames.com/gold-predict?ref=yono_bonus',
    rating: 4.5,
    playersCount: '670K+'
  }
];

export const RECENT_WINNERS: RecentWinner[] = [
  { id: 'w1', username: 'Rahul_S*', appName: 'Yono Arcade', bonus: 100, time: '2 min ago' },
  { id: 'w2', username: 'Amit_K*', appName: 'Yono Slots Deluxe', bonus: 75, time: '5 min ago' },
  { id: 'w3', username: 'Sonia_M*', appName: 'Yono Rummy Classic', bonus: 51, time: '8 min ago' },
  { id: 'w4', username: 'Vikas_G*', appName: 'Yono Gold Predictor', bonus: 99, time: '12 min ago' },
  { id: 'w5', username: 'Neha_P*', appName: 'Yono VIP Club', bonus: 85, time: '15 min ago' }
];
