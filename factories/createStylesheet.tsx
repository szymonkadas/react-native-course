import COLORS, { ColorsTheme } from "@/constants/Colors";
import {TextStyle, ViewStyle, StyleSheet, ImageStyle, Appearance} from "react-native";

/**
 * Creates a function that generates a themed stylesheet.
 * The returned function is a curried version that takes only the color scheme
 * and returns a thematized stylesheet using the provided thematizeStyles function.
 * If no color scheme is provided, it assumes initial system color scheme.
 * @template T
 * @param {ThematizeStyles<T>} thematizeStyles - A function that takes the theme styles and returns a stylesheet object.
 * @returns {(colorsScheme: 'dark' | 'light' | undefined) => T} - A curried function that returns a thematized stylesheet.
 */
export default function createGetStylesFactory<T extends NamedStyles<T>>(thematizeStyles: ThematizeStyles<T>) {
  const colorScheme = Appearance.getColorScheme() || 'light';
  return (colorsScheme?: 'dark' | 'light') => {
    const themeStyles = COLORS[colorsScheme || colorScheme];
    return StyleSheet.create(thematizeStyles(themeStyles, colorsScheme || colorScheme));
  };
}

export type ThematizeStyles<T> = ((themeStyles: ColorsTheme, colorScheme?: 'dark' | 'light') => T);

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };