jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(() => Promise.resolve(null)),
    setItem: jest.fn(() => Promise.resolve()),
    removeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
  },
}));

jest.mock('react-native-maps', () => {
  const React = require('react');
  const {View} = require('react-native');
  const Map = React.forwardRef((props, ref) => React.createElement(View, {...props, ref}));
  Map.Marker = View;
  Map.Callout = View;
  return {__esModule: true, default: Map, Marker: View, Callout: View, PROVIDER_DEFAULT: undefined};
});
