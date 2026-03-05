import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", "class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			'brand-black': '#050505',
  			'brand-purple': '#8B5CF6',
  			'brand-dark-purple': '#2D1B69',
  			'background-dark': '#050308',
  			'background-light': '#f6f5f8',
  			'surface-dark': '#0d0a14',
  			'accent-dark': '#16121f',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			display: [
  				'Inter',
  				'sans-serif'
  			],
  			mono: [
  				'JetBrains Mono',
  				'monospace'
  			]
  		},
  		borderRadius: {
  			DEFAULT: '0.25rem',
  			lg: 'var(--radius)',
  			xl: '0.75rem',
  			'2xl': '1rem',
  			full: '9999px',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			float: 'float 6s ease-in-out infinite',
  			blink: 'blink 1s step-end infinite',
  			'fade-up': 'fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
  			'pulse-dot': 'pulseDot 2s infinite',
  			'typing-dots': 'typingDots 1.4s infinite'
  		},
  		keyframes: {
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0px) rotateX(10deg) rotateY(-5deg)'
  				},
  				'50%': {
  					transform: 'translateY(-20px) rotateX(12deg) rotateY(-3deg)'
  				}
  			},
  			blink: {
  				'0%, 100%': {
  					opacity: '1'
  				},
  				'50%': {
  					opacity: '0'
  				}
  			},
  			fadeUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(40px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			pulseDot: {
  				'0%': {
  					transform: 'scale(0.95)',
  					boxShadow: '0 0 0 0 rgba(34, 197, 94, 0.7)'
  				},
  				'70%': {
  					transform: 'scale(1)',
  					boxShadow: '0 0 0 6px rgba(34, 197, 94, 0)'
  				},
  				'100%': {
  					transform: 'scale(0.95)',
  					boxShadow: '0 0 0 0 rgba(34, 197, 94, 0)'
  				}
  			},
  			typingDots: {
  				'0%, 20%': {
  					opacity: '0'
  				},
  				'50%': {
  					opacity: '1'
  				},
  				'100%': {
  					opacity: '0'
  				}
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
