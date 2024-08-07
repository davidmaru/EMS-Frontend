import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider_2';

export const useTheme = () => {
  return useContext(ThemeContext);
};
