import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'glass-bg': 'rgba(255, 255, 255, 0.05)',
        'glass-border': 'rgba(255, 255, 255, 0.12)',
        'night': {
          50: '#e8eaf6',
          900: '#0a0f1e',
          800: '#0d1426',
          700: '#111a33',
          600: '#1a2540',
        }
      },
      backdropBlur: {
        glass: '12px',
      },
      backgroundImage: {
        'night-gradient': 'linear-gradient(135deg, #0a0f1e 0%, #111a33 50%, #0d1426 100%)',
      },
      boxShadow: {
        glass: '0 4px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
      }
    }
  },
  plugins: [],
}

export default config
