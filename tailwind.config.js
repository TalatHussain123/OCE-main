module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '0.25rem',
      DEFAULT: '4px',
      'md': '12px',
      'lg': '0.5rem',
      'full': '9999px',
      'large': '12px',
    },
    spacing: {
      '1': '8px',
      '2': '12px',
      '3': '16px',
      '4': '24px',
      '5': '32px',
      '6': '48px',
    }, 
    colors: {
      'white': '#fff',
      'primary': '#563BFF',
      'secondary': '#3734A9',
      'black': '#000',
      'grey': '#C7C7D2',
    },  
    extend: {
      margin: {
        '100px': '100px',
        '6px': '6px',
      }
      ,
      padding:{
        '10px':'10px',
        '18px': '18px',
        '6px': '6px',
      }
    }
  },
  plugins: [],
}
