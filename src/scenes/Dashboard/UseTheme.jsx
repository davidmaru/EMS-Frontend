import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider_2';


export default function useTheme() {
  return useContext(ThemeContext);
}
