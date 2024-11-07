/** @type {import('tailwindcss').Config} */

// const myClass = plugin(function ({ addUtilities }) {
//   addUtilities({
//     ".my-rotate-y-180": {
//       transform: "rotateY(180deg)",
//     },
//   });
// });

module.exports = {
    darkMode: ["class"],
    content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
  	container: {
  		padding: {
  			DEFAULT: '15px'
  		}
  	},
  	screens: {
  		xs: '475px',
  		sm: '640px',
  		md: '768px',
  		lg: '960px',
  		xl: '1200px'
  	},
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
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
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
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
  		borderRadius: {
  			extraLarge: '12 rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			blob: {
  				'0%': {
  					translate: '0 0'
  				},
  				'30%': {
  					rotate: '40deg'
  				},
  				'50%': {
  					transform: 'translate(300px, 390px) scale(1.1)'
  				},
  				'90%': {
  					translate: '90%'
  				}
  			},
  			fullSpin: {
  				'100%': {
  					transform: 'rotate(-360deg)'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			blob: 'blob 8s infinite cubic-bezier(0.8, 0.2, 0.2, 0.8)',
  			'blob-reverse': 'blob 10s infinite cubic-bezier(0.8, 0.2, 0.2, 0.8) reverse',
  			fade: 'fadeOut 5s ease-in-out',
  			fullSpin: 'fullSpin 3s linear infinite',
  			slide: 'slide 4s ease infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		fontFamily: {
  			poppins: [`var(--font-poppins)`, "sans-serif"],
  			sora: [`var(--font-sora)`, "sans-serif"]
  		}
  	}
  },
  container: {
    padding: {
      DEFAULT: "15px",
    },
  },

  plugins: [require("tailwindcss-animate")],
};
