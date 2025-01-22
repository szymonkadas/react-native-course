import { createContext, PropsWithChildren, useState } from "react";
import { Appearance } from "react-native";
import COLORS from "../constants/Colors";
import React from 'react'

export const ThemeContext = createContext({
    colorScheme: "light" as 'light' | 'dark', 
    setColorScheme: (colorScheme: 'light' | 'dark') => {}, 
    theme: COLORS.light});

export const ThemeProvider = ({ children } : PropsWithChildren) => {
    const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme() || "light");
    const theme = COLORS[colorScheme];
    return (        
        <ThemeContext.Provider value={{ colorScheme, setColorScheme, theme}}>
            {children}
        </ThemeContext.Provider>
    )
}