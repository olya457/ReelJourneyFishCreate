export type TabName = 'Spots' | 'Map' | 'Sessions' | 'Game' | 'Draw';

export type RouteParams = {
  Home: undefined;
  SpotDetails: {id: string};
  AddSpot: undefined;
  NewSession: undefined;
  LiveSession: {
    name: string;
    location: string;
    weather: string;
    method: string;
    coordinates: [number, number];
  };
  GameSetup: undefined;
  GamePlay: {players: string[]; rounds: number};
  Gallery: undefined;
  Settings: undefined;
};

export type ScreenName = keyof RouteParams;
export type AppRoute<Name extends ScreenName = ScreenName> = {
  [Key in Name]: RouteParams[Key] extends undefined
    ? {name: Key; params?: undefined}
    : {name: Key; params: RouteParams[Key]};
}[Name];

export type Navigate = <Name extends ScreenName>(
  ...args: RouteParams[Name] extends undefined
    ? [name: Name]
    : [name: Name, params: RouteParams[Name]]
) => void;
