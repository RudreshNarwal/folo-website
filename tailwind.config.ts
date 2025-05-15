import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: "2rem",
  		screens: {
  			"2xl": "1400px",
  		},
  	},
  	extend: {
  		fontFamily: {
  			sans: ["var(--font-open-sans)", "var(--font-geist-sans)", ...fontFamily.sans],
  			mono: ["var(--font-geist-mono)", ...fontFamily.mono],
  		},
  		colors: {
  			border: "hsl(var(--border))",
  			input: "hsl(var(--input))",
  			ring: "hsl(var(--ring))",
  			background: "hsl(var(--background))",
  			foreground: "hsl(var(--foreground))",
  			primary: {
  				DEFAULT: "hsl(var(--primary))",
  				foreground: "hsl(var(--primary-foreground))",
  				dark: "hsl(var(--primary-dark))",
  				darker: "hsl(var(--primary-darker))",
  				hex: "#0070EA",
  				"dark-hex": "#0F61CE",
  				"darker-hex": "#142B82",
  			},
  			secondary: {
  				DEFAULT: "hsl(var(--secondary))",
  				foreground: "hsl(var(--secondary-foreground))",
  			},
  			destructive: {
  				DEFAULT: "hsl(var(--destructive))",
  				foreground: "hsl(var(--destructive-foreground))",
  			},
  			muted: {
  				DEFAULT: "hsl(var(--muted))",
  				foreground: "hsl(var(--muted-foreground))",
  			},
  			accent: {
  				DEFAULT: "hsl(var(--accent))",
  				foreground: "hsl(var(--accent-foreground))",
  			},
  			popover: {
  				DEFAULT: "hsl(var(--popover))",
  				foreground: "hsl(var(--popover-foreground))",
  			},
  			card: {
  				DEFAULT: "hsl(var(--card))",
  				foreground: "hsl(var(--card-foreground))",
  			},
  		},
  		borderRadius: {
  			lg: "var(--radius)",
  			md: "calc(var(--radius) - 2px)",
  			sm: "calc(var(--radius) - 4px)",
  			xl: "1rem",
  			"2xl": "1.5rem",
  			"3xl": "2rem",
  		},
  		boxShadow: {
  			'glow-primary': '0 0 15px rgba(0, 112, 234, 0.3)',
  			'glow-primary-lg': '0 0 30px rgba(0, 112, 234, 0.4)',
  			'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  			'card-premium': '0 20px 25px -5px rgba(0, 112, 234, 0.1), 0 10px 10px -5px rgba(0, 112, 234, 0.04)',
  		},
  		animation: {
  			'float': 'float 6s ease-in-out infinite',
  			'gradient-slow': 'gradient 8s ease infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			'pulse-slower': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
  			'slide-in-left': 'slide-in-left 0.6s ease-out forwards',
  			'subtle-glow': 'subtle-glow 2s ease-in-out infinite alternate',
  			'border-pulse': 'border-pulse 3s ease-in-out infinite',
  			'subtle-pulse': 'subtle-pulse 3s ease-in-out infinite',
  			'slide-up': 'slide-up 0.5s ease-out forwards',
  		},
  		keyframes: {
  			float: {
  				'0%, 100%': { transform: 'translateY(0)' },
  				'50%': { transform: 'translateY(-10px)' },
  			},
  			gradient: {
  				'0%': { backgroundPosition: '0% 50%' },
  				'50%': { backgroundPosition: '100% 50%' },
  				'100%': { backgroundPosition: '0% 50%' },
  			},
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' },
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' },
  			},
  			'slide-up': {
  				from: { opacity: '0', transform: 'translateY(20px)' },
  				to: { opacity: '1', transform: 'translateY(0)' },
  			},
  			'border-pulse': {
  				'0%, 100%': { borderColor: 'rgba(0, 112, 234, 0.3)' },
  				'50%': { borderColor: 'rgba(0, 112, 234, 0.6)' },
  			},
  			'subtle-pulse': {
  				'0%, 100%': { opacity: '1' },
  				'50%': { opacity: '0.85' },
  			},
  		},
  		backgroundImage: {
  			'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
  			'primary-gradient': 'linear-gradient(135deg, #0070EA 0%, #0F61CE 50%, #142B82 100%)',
  			'card-gradient': 'linear-gradient(120deg, #ffffff 0%, #f5f8ff 100%)',
  			'card-hover-gradient': 'linear-gradient(120deg, #f5f8ff 0%, #ffffff 100%)',
  		},
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
  ],
} satisfies Config;

export default config;
