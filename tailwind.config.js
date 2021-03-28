module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: [
        'Poppins',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Open Sans',
        'Helvetica Neue',
        'sans-serif',
      ],
      mono: ['JetBrainsMono', 'monospace', 'ui-monospace', 'SFMono-Regular'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      colors: {
        gray: {
          50: 'F9FAFB',
          100: '#F4F8FB',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#21262D',
          800: '#161B22',
          900: '#0C1014',
        },
      },
      width: {
        fit: 'fit-content',
      },
      height: {
        fit: 'fit-content',
      },
      animation: {
        'bounce-slow': 'bounce 10s linear infinite',
      },
    },
  },
  variants: {},
  plugins: [],
};
