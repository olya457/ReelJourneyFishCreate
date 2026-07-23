import AsyncStorage from '@react-native-async-storage/async-storage';
import {Artwork, Session, Spot} from '../types';
import {TabName} from '../navigation/types';

export const APP_STORAGE_KEY = '@wavora_journey/app_state_v1';

export type PersistedAppState = {
  onboarded: boolean;
  tab: TabName;
  spots: Spot[];
  sessions: Session[];
  artworks: Artwork[];
};

const tabNames: TabName[] = ['Spots', 'Map', 'Sessions', 'Game', 'Draw'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function parsePersistedState(value: string): Partial<PersistedAppState> {
  const parsed: unknown = JSON.parse(value);
  if (!isRecord(parsed)) {
    throw new Error('Saved app state must be an object');
  }

  const result: Partial<PersistedAppState> = {};
  if (typeof parsed.onboarded === 'boolean') {
    result.onboarded = parsed.onboarded;
  }
  if (
    typeof parsed.tab === 'string' &&
    tabNames.includes(parsed.tab as TabName)
  ) {
    result.tab = parsed.tab as TabName;
  }
  if (Array.isArray(parsed.spots)) {
    result.spots = parsed.spots as Spot[];
  }
  if (Array.isArray(parsed.sessions)) {
    result.sessions = parsed.sessions as Session[];
  }
  if (Array.isArray(parsed.artworks)) {
    result.artworks = parsed.artworks as Artwork[];
  }
  return result;
}

export async function loadAppState(): Promise<Partial<PersistedAppState> | null> {
  const value = await AsyncStorage.getItem(APP_STORAGE_KEY);
  if (!value) {
    return null;
  }
  return parsePersistedState(value);
}

export async function saveAppState(state: PersistedAppState): Promise<void> {
  await AsyncStorage.setItem(APP_STORAGE_KEY, JSON.stringify(state));
}
