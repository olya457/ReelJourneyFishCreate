import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  APP_STORAGE_KEY,
  loadAppState,
  parsePersistedState,
  PersistedAppState,
  saveAppState,
} from '../src/storage/appStorage';

const storage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

const state: PersistedAppState = {
  onboarded: true,
  tab: 'Sessions',
  spots: [],
  sessions: [],
  artworks: [],
  tripPlans: [],
};

beforeEach(() => {
  jest.clearAllMocks();
});

test('parses a complete saved state', () => {
  expect(parsePersistedState(JSON.stringify(state))).toEqual(state);
});

test('rejects malformed JSON', () => {
  expect(() => parsePersistedState('{broken')).toThrow();
});

test('rejects a non-object state', () => {
  expect(() => parsePersistedState('null')).toThrow(
    'Saved app state must be an object',
  );
});

test('ignores an unknown tab without discarding valid fields', () => {
  expect(
    parsePersistedState(JSON.stringify({onboarded: true, tab: 'Unknown'})),
  ).toEqual({onboarded: true});
});

test('returns null when no state has been saved', async () => {
  storage.getItem.mockResolvedValueOnce(null);
  await expect(loadAppState()).resolves.toBeNull();
});

test('loads state using the versioned storage key', async () => {
  storage.getItem.mockResolvedValueOnce(JSON.stringify(state));
  await expect(loadAppState()).resolves.toEqual(state);
  expect(storage.getItem).toHaveBeenCalledWith(APP_STORAGE_KEY);
});

test('serializes state using the versioned storage key', async () => {
  await saveAppState(state);
  expect(storage.setItem).toHaveBeenCalledWith(
    APP_STORAGE_KEY,
    JSON.stringify(state),
  );
});

test('propagates storage write failures', async () => {
  storage.setItem.mockRejectedValueOnce(new Error('disk full'));
  await expect(saveAppState(state)).rejects.toThrow('disk full');
});
