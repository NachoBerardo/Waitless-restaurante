/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },

    screens: {
      'sm': '640px',
      'monitor': '1400px',
      'xl': '1700px',
      'custombp': {'raw': '(min-height: 950px)'},
      'notebook': {'raw': '(max-height: 949px)'},
    },
    
    fontFamily: {
      sans: ['"PT Sans"', 'sans-serif']
    },

    fontFamily:{
      'open-sans':'Open Sans',
    },

    colors:{
      'footer': '#04AA6D',
      'footer_hover': '#3e8e41',
      'footer_active': '#3e8e41',
      'background': '#FCFCFC',
      'background_popup': '#E3EEEC',
      'div': '#f3f0f0',
      'header': '#423d3d',
      'black': '#000000',
      'white': '#FFFFFF',
      'populetter': '#919191',
      'input': '#F1F1F1',
      'btngreen': '#03CDA9',
      'letraGris': '#25252580',
      'letraGrisOscuro': '#252525',
      'LineaPedido': '#E3EEEC',
      'FocusEspecificaciones': '#9A9898',
      'LineaVerdePedido': '#B4F1E6',
      'BordeGrisPedido': '#00000033',
      'RojoPedido': '#D2382E', 
      'ActiveHeaderRestaurante': '#CFD9D7',
      'LetraDropDown': '#00000080',
      'activeDropdown': '#CCC',
      'BorderRegister': '#C2C2C2',
      'BorderPedidosRestaurante': '#AAB2B1',
      'Rojito': 'rgba(210, 56, 46, 0.20)',
    }
  },
  plugins: [],
}
