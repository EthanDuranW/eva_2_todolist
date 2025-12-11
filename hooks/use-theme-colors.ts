import { useColorScheme } from 'react-native';
import { darkColors, lightColors } from '../theme/colors';

export function useThemeColors() {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkColors : lightColors;
}
