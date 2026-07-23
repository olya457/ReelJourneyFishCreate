import {ImageSourcePropType} from 'react-native';
const onboardingJourneyImages = [
  require('./onboarding-scenic-spots.png'),
  require('./onboarding-map.png'),
  require('./onboarding-sessions.png'),
  require('./onboarding-friends-game.png'),
  require('./onboarding-draw-create.png'),
] satisfies ImageSourcePropType[];
const fishingSpotPhotography = {
  emerald: require('./emerald-bay.png'),
  minnewanka: require('./lake-minnewanka.png'),
  jenny: require('./jenny-lake.png'),
  mcdonald: require('./lake-mcdonald.png'),
  yellowstone: require('./yellowstone-lake.png'),
  crater: require('./crater-lake.png'),
  crescent: require('./lake-crescent.png'),
  wahweap: require('./wahweap-bay.png'),
  taupo: require('./lake-taupo.png'),
  jindabyne: require('./lake-jindabyne.png'),
  nahuelHuapi: require('./lake-nahuel-huapi.png'),
  inari: require('./lake-inari.png'),
  bled: require('./lake-bled.png'),
  bohinj: require('./lake-bohinj.png'),
  thingvallavatn: require('./lake-thingvallavatn.png'),
  lomond: require('./loch-lomond.png'),
  biwa: require('./lake-biwa.png'),
  geneva: require('./lake-geneva.png'),
  vanern: require('./lake-vanern.png'),
  rotorua: require('./lake-rotorua.png'),
  garda: require('./lake-garda.png'),
} satisfies Record<string, ImageSourcePropType>;
const wavoraJourneyFishMark = require('./wavora-journey-fish-mark.png');

export const appAssets = {
  onboardingJourneyImages,
  fishingSpotPhotography,
  defaultFishingSpotImage: fishingSpotPhotography.emerald,
  wavoraJourneyFishMark,
} as const;

export const onboardingImages = appAssets.onboardingJourneyImages;
export const spotImages: Record<string, ImageSourcePropType> =
  appAssets.fishingSpotPhotography;
export const fallbackSpotImage = appAssets.defaultFishingSpotImage;
