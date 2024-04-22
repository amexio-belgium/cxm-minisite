/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
		  sans: ['Lexend', 'sans-serif'],
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
			
			}
		}
	},
	plugins: [  
		require('@tailwindcss/typography'),
	],
}
