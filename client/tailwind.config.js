import { platformSelect } from 'nativewind/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,ts,tsx}'],

    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            fontFamily: {
                sans: ['SpaceGrotesk_400Regular', 'Roboto', 'sans-serif'],
                system: platformSelect({
                    ios: 'SpaceGrotesk_400Regular',
                    android: 'SpaceGrotesk_400Regular',
                    default: 'SpaceGrotesk_400Regular',
                }),
                'default-300': [
                    'SpaceGrotesk_300Light',
                    'Roboto',
                    'sans-serif',
                ],
                'default-400': [
                    'SpaceGrotesk_400Regular',
                    'Roboto',
                    'sans-serif',
                ],
                'default-500': [
                    'SpaceGrotesk_500Medium',
                    'Roboto',
                    'sans-serif',
                ],
                'default-600': [
                    'SpaceGrotesk_600SemiBold',
                    'Roboto',
                    'sans-serif',
                ],
                'default-700': ['SpaceGrotesk_700Bold', 'Roboto', 'sans-serif'],
            },
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                red: {
                    DEFAULT: 'rgb(152, 36, 60)',
                },
                neutral: {
                    50: 'rgb(217,217,217)',
                    500: 'rgb(110,119,129)',
                    800: 'rgb(38,45,51)',
                },
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
}
