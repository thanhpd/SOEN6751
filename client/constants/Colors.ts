/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  concordia: {
    text: '#98243C',
    background: '#98243C',
    'red-button': 'rgba(152, 36, 60, 0.29)',
  },
  boxPink: {
    backgroundColor: '#F8D7DA',
  },
  boxYellow: {
    backgroundColor: '#FCE5B1',
  },
  boxGray: {
    backgroundColor: '#B0B6BD',
  },
  boxPurple: {
    backgroundColor: '#B5A3E5',
  },
};
