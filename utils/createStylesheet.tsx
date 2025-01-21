import COLORS, { ColorsTheme } from "@/constants/Colors";
import {TextStyle, StyleSheet, StyleProp } from "react-native";

/**
 * Creates a function that takes a theme as input and uses it to generate a stylesheet with colors that match the theme based on passed function.
 * The returned function is a curried version of the input function, which takes only the theme
 * and returns thematized stylesheet.
 * @param {ThematizeStyles} styles - The function that takes the theme styles and returns a stylesheet.
 * @returns {(colorsScheme: keyof typeof COLORS) => StyleProp<TextStyle>} - A curried version of the input function that returns thematized stylesheet.
 */
export default function createGetStylesFactory (thematizeStyles: ThematizeStyles): Function {
    return (colorsScheme:  keyof typeof COLORS) => {
      const themeStyles = COLORS[colorsScheme];
      return StyleSheet.create(thematizeStyles(themeStyles));
    };
  }

export type ThematizeStyles = ((themeStyles: ColorsTheme)=>{ [key: string]: TextStyle})