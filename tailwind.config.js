module.exports = {
    purge: {
      content: [
        './resources/**/*.antlers.html',
        './resources/**/*.blade.php',
        './content/**/*.md'
      ]
    },
    important: true,
    theme: {
      fontFamily: {
        'Nunito': ['Nunito', 'sans-serif'],
      },
      extend: {
        colors: {
            // Core colours
            background_light: '#BADB4D', 
            background_lighter: '#4DD6DB', 
            background_dark: '#574DDB', 
            background_darker: '#DB4DB7', 
            
            // General
            text: 'var(--text)',
            text_light: 'var(--text_light)',
            background: 'var(--background)',

            text_dark: 'var(--text_dark)',
            background_dark: 'var(--background_dark)', 

            // GLobals
            header_bg: 'var(--background)',
            header_border: '#E5E7EB',

            footer_bg: 'var(--background_dark)',
            footer_text: 'var(--text_dark)',
            footer_border: '#E5E7EB',
            
            accent: '#038BFF',
            accent_bold: '#0070CF',
            accent_light: '#36A3FF',
            
            // General colours
            red: "#F56565",
            green: "#64BD63",
        }
      },
      screens: {
        xs: '500px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1400px',
        xxl: '1920px',
      },
      fontSize: {
        'sm': '0.64rem',
        'tiny': '0.8rem',
        'base': '1rem',
        'lg': '1.25rem',
        'xl': '1.56rem',
        '2xl': '1.95rem',
        '3xl': '2.44rem',
        '4xl': '3.05rem',
        '5xl': '3.81rem',
        '6xl': '4.77rem',
        '7xl': '5.96rem',
      }
    },
    variants: {},
    plugins: [],
  }
