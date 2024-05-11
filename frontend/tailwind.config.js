import daisyui from "daisyui";
import daisyUIThemes from "daisyui/src/theming/themes";
/** @type {import('tailwindcss').Config} */


export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
	  extend: {
		fontFamily: {
		  sans: ['Roboto', 'sans-serif'],
		},
	  },
	},

	daisyui: {
	  themes: [
		"light",
		{
		  black: {
			...daisyUIThemes["white"],
			primary: "rgb(29, 155, 240)",
			secondary: "rgb(24, 24, 24)",
		  },
		},
	  ],
	},
  };
  
