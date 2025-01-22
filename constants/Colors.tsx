const COLORS = {
    dark:{
        text: "#e8ebf3",
        primary: "#17140c",
        secondary: "#57b5b7",
        accent: "#1e2261",
        background: "#000",
        error: '#ab000b'
    },
    light: {
        text: '#0D1018',
        primary: '#F2EFE7',
        secondary: '#48A6A7',
        accent: '#9ACBD0',
        background: '#2973B2',
        error: '#ab000b'
    }
}

export default COLORS

export type ColorsTheme = typeof COLORS['dark'] | typeof COLORS['light']