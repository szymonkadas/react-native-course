import COLORS, { ColorsTheme } from "@/constants/Colors";
import {TextStyle, ViewStyle, StyleSheet, ImageStyle} from "react-native";

/**
 * Creates a function that generates a themed stylesheet.
 * The returned function is a curried version that takes only the color scheme
 * and returns a thematized stylesheet using the provided thematizeStyles function.
 * @template T
 * @param {ThematizeStyles<T>} thematizeStyles - A function that takes the theme styles and returns a stylesheet object.
 * @returns {(colorsScheme: keyof typeof COLORS) => T} - A curried function that returns a thematized stylesheet.
 */
export default function createGetStylesFactory<T extends NamedStyles<T>>(thematizeStyles: ThematizeStyles<T>) {
  return (colorsScheme: keyof typeof COLORS) => {
    const themeStyles = COLORS[colorsScheme];
    return StyleSheet.create(thematizeStyles(themeStyles));
  };
}

export type ThematizeStyles<T> = ((themeStyles: ColorsTheme) => T);

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };