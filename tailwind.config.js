/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8f8f0',
          100: '#c2ecd9',
          200: '#9be0c2',
          300: '#74d4ab',
          400: '#4dc894',
          500: '#2ECC71', // Main Success Green
          600: '#27AE60', // Deep Green
          700: '#229954',
          800: '#1e8449',
          900: '#196f3d',
        },
        secondary: {
          50: '#e8f4f8',
          100: '#bee0ed',
          200: '#93cce2',
          300: '#69b8d7',
          400: '#3ea4cc',
          500: '#3498DB', // Sky Blue
          600: '#2980B9', // Deep Blue
          700: '#21618c',
          800: '#1a5276',
          900: '#154360',
        },
        accent: {
          50: '#fef5e7',
          100: '#fce3b6',
          200: '#fad184',
          300: '#f8bf52',
          400: '#f6ad20',
          500: '#F39C12', // Energy Orange
          600: '#E67E22', // Dark Orange
          700: '#ca6f1e',
          800: '#af601a',
          900: '#935116',
        },
        success: '#2ECC71',
        warning: '#F39C12',
        error: '#E74C3C',
        info: '#3498DB',
        background: '#F8F9FA',
        card: '#FFFFFF',
        textDark: '#2C3E50',
        textLight: '#7F8C8D',
        border: '#ECF0F1',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(46, 204, 113, 0.08)',
        'card-hover': '0 8px 30px rgba(46, 204, 113, 0.15)',
        'button': '0 4px 15px rgba(46, 204, 113, 0.25)',
        'button-hover': '0 6px 20px rgba(46, 204, 113, 0.35)',
        'nav': '0 -4px 20px rgba(0, 0, 0, 0.08)',
        'top': '0 2px 10px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounceSubtle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}