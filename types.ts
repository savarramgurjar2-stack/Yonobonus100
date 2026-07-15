export interface YonoApp {
  id: string;
  name: string;
  category: string;
  bonusAmount: number; // 50 to 100
  downloadUrl: string;
  rating: number;
  playersCount: string;
  isPopular?: boolean;
}

export interface CustomYonoLink {
  id: string;
  originalUrl: string;
  referId: string;
  gameId: string;
  gameName: string;
  generatedLink: string;
  bonusAmount: number;
  clicks: number;
  createdAt: string;
}

export interface RecentWinner {
  id: string;
  username: string;
  appName: string;
  bonus: number;
  time: string;
}
