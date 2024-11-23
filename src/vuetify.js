import 'vuetify/styles';
import { createVuetify } from 'vuetify';

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
  },
  typography: {
    font: {
      family: 'Quicksand, sans-serif', // Establecer fuente personalizada
    },
  },
});

export default vuetify;
