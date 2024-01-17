export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  actualUser: string;
  token: string;
  role: string;
  team: string;
  redirectUrl: string;
}

export interface User {
  username: string;
  email: string;
  password: string;
  role: string;
  team: string;
  gender: string;
}
export interface Result {
  id?: number;
  event_id?: number;
  homeName: string;
  guestName: string;
  hsumpin: number;
  gsumpin: number;
  hsetpoints: number;
  gsetpoints: number;
}

export interface Event {
  id?: number;
  date: string;
  time: string;
  gender: string;
  place: string;
  team1: string;
  team2: string;
  turn: number;
  season: string;
  results?: Result[];
}

export interface AggregateResults {
  team: string;
  matches: number;
  wins: number;
  draws: number;
  losses: number;
  winSetPoints: number;
  lostSetPoints: number;
  winTeamPoints: number;
  lostTeamPoints: number;
  //penaltyPoints: number;
  points: number;
}

export interface NewsDetails {
  descriptionHtml: string;
  contentId?: number;
  title: string;
  publishedDate: string;
  coverUrl: string;
  leadText: string;
  isHighlighted: boolean;
  highlightingColorCode: string;
}
