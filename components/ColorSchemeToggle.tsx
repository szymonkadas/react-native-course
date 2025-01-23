import React, { useContext } from 'react';
import { Pressable } from 'react-native';
import Octicons from "@expo/vector-icons/Octicons";
import { ThemeContext } from '@/context/ThemeContext';
import createGetStylesFactory from '@/factories/createStylesheet';

const ColorSchemeToggle: React.FC = () => {
  const {theme, colorScheme, setColorScheme } = useContext(ThemeContext);
  const viewStyles = getViewStyles(colorScheme);
  return (
    <Pressable onPress={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}>
      {
        colorScheme === 'dark' ?
        <Octicons name="moon" size={36} selectable={undefined} color={theme.text} style={viewStyles.icon}/> :
        <Octicons name="sun" size={36} selectable={undefined} color={theme.primary} style={viewStyles.icon}/>
      }
    </Pressable>
  );
};

export default ColorSchemeToggle;

const getViewStyles = createGetStylesFactory(() => ({
  icon: {width: 36, height: 36, justifyContent: 'center', display: 'flex', alignItems: 'center'}
}));