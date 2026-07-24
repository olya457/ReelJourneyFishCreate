export type Spot = {
  id: string;
  name: string;
  region: string;
  country: string;
  about: string;
  conditions: string;
  bestTime: string;
  species: string[];
  facilities: string[];
  rules: string;
  coordinates: [number, number];
  saved?: boolean;
  custom?: boolean;
};

export type Session = {
  id: string;
  name: string;
  location: string;
  duration: string;
  catches: number;
  weight: string;
};

export type ArtworkPoint = {x: number; y: number; color: string; size: number};
export type Artwork = {
  id: string;
  title: string;
  prompt: string;
  createdAt: string;
  points: ArtworkPoint[];
};

export type TripPlan = {
  id: string;
  spotId: string;
  title: string;
  date: string;
  timeWindow: string;
  technique: string;
  targetSpecies: string;
  readiness: number;
  checklist: {id: string; label: string; done: boolean}[];
  createdAt: string;
};
