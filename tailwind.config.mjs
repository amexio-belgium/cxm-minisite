/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontSize: {
			'xxs': ['0.875rem', '1.25rem'],
			'xs': ['1rem', '1.5rem'],
			'sm': ['1.125rem', '1.5rem'],
			'base': ['1.25rem', '1.625rem'],
			'lg': ['1.5rem', '2rem'], 
			'xl': ['1.75rem', '2.75rem'], 
			'2xl': ['2rem', '2.5rem'], 
			'3xl': ['2.75rem', '3.625rem'],
			'4xl': ['4.75rem', '6rem'], 
		},
		fontFamily: {
		  sans: ['Lexend', 'sans-serif'],
		  serif: ['Contane', 'serif']
		},
		colors: {
			'transparent': 'transparent',
			'primary': '#084772',
			'secondary': '#ED6C25',
			'quaternary': '#D9E8F5',
			'quinary': '#86ABD4',
			'tertiary': '#FFC256',
			'white': '#fff',
			'black': "#0B1215",
			'blue': {
				DEFAULT: '#084772',
				50: '#e6edf1',
				100: '#b2c6d3',
				200: '#8daabe',
				300: '#5a84a1',
				400: '#396c8e',
				500: '#084772',
				600: '#074168',
				700: '#063251',
				800: '#04273f',
				900: '#031e30',
			},
			'orange': {
				DEFAULT: '#ed6c25',
				50: '#fdf0e9',
				100: '#f9d1bb',
				200: '#f7bb9b',
				300: '#f39d6d',
				400: '#f18951',
				500: '#ed6c25',
				600: '#d86222',
				700: '#a84d1a',
				800: '#823b14',
				900: '#642d10',
			},
			'lightest-blue': {
				DEFAULT: '#d9e8f5',
				50: '#fbfdfe',
				100: '#f3f8fc',
				200: '#eef4fa',
				300: '#e6f0f8',
				400: '#e1edf7',
				500: '#d9e8f5',
				600: '#c5d3df',
				700: '#9aa5ae',
				800: '#778087',
				900: '##5b6167',
			},
			'light-blue': {
				DEFAULT: '#86abd4',
				50: '#f3f7fb',
				100: '#d9e5f2',
				200: '#c7d8eb',
				300: '#aec7e2',
				400: '#9ebcdd',
				500: '#86abd4',
				600: '#7a9cc1',
				700: '#5f7997',
				800: '#4a5e75',
				900: '#384859',
			},
			'yellow': {
				DEFAULT: '#ffc256',
				50: '#fff9ee',
				100: '#ffeccb',
				200: '#ffe3b1',
				300: '#ffd68e',
				400: '#ffce78',
				500: '#ffc256',
				600: '#e8b14e',
				700: '#b58a3d',
				800: '#8c6b2f',
				900: '#6b5124',
			}
		},
		extend: {
			spacing: {
			
			},
			borderRadius: {
			
			},
			animation: {
				'bounce-slow': 'bounceslow 3s ease-in-out 3',
				'hero-show': 'heroshow 0.3s ease-in',
			},
			keyframes: {
				bounceslow: {
				  '0%, 60%': { transform: 'translateY(0%)' },
				  '30%': { transform: 'translateY(-1%)' },
				},
				heroshow: {
					'0%': { 
						transform: 'scale(1.5)', 
						opacity:'0' 
					},
					'100%': { 
						transform: 'scale(1)', 
						opacity:'1' 
					}
				}
			},
			typography: ({ theme }) => ({
				ondark: {
				  css: {
					'--tw-prose-body': theme('colors.white'),
					'--tw-prose-headings': theme('colors.white'),
					'--tw-prose-lead': theme('colors.white'),
					'--tw-prose-links': theme('colors.yellow[500]'),
					'--tw-prose-bullets': theme('colors.white'),
					'--tw-prose-hr': theme('colors.white'),
					'--tw-prose-quotes': theme('colors.white'),
					'--tw-prose-bold': theme('colors.white'),
					'--tw-prose-quote-borders': theme('colors.white'),
					'--tw-prose-captions': theme('colors.white'),
					'--tw-prose-counters': theme('colors.white'),
					'--tw-prose-th-borders': theme('colors.white'),
					'--tw-prose-td-borders': theme('colors.blue[50]'),
					'--tw-prose-kbd': theme('colors.white'),
					'--tw-prose-kbd-shadows': "255 255 255"
				  },
				},
			  }),
		}
	},
	plugins: [  
		require('@tailwindcss/typography'),
		require('tailwindcss-animated'),
	],
}
