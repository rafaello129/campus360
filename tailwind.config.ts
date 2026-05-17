import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta TecNM - Azul institucional
        tech: {
          // Azules principales
          deepBlue: "#002147",      // Azul profundo oscuro
          primary: "#003B70",        // Azul principal institucional
          mid: "#0A4D8C",           // Azul intermedio sobrio
          accent: "#1D84B5",        // Cian/acento tecnológico
          light: "#DCEAF7",         // Azul claro de apoyo
          
          // Grises fríos
          bg: "#F3F6FA",            // Fondo general
          border: "#D2DCE6",        // Gris borde
          divider: "#E8ECF2",       // Divisor sutil
          
          // Textos
          textMain: "#10243E",      // Texto principal
          textSecond: "#5F7085",    // Texto secundario
        },
        // Compatibilidad hacia atrás
        petrol: {
          50: "#eef4f9",
          100: "#d7e4f0",
          200: "#aed0e8",
          300: "#7da8d4",
          400: "#557ba8",
          500: "#3d5a85",
          600: "#2f4468",
          700: "#003B70",
          800: "#002147",
          900: "#001636"
        }
      },
      backgroundImage: {
        'grid-subtle': 'radial-gradient(circle, rgba(0, 59, 112, 0.04) 1px, transparent 1px)',
        'nodes-pattern': 'radial-gradient(circle at 20% 50%, rgba(0, 59, 112, 0.03) 0%, transparent 20%), radial-gradient(circle at 80% 80%, rgba(29, 132, 181, 0.02) 0%, transparent 20%)',
        'tech-pattern': 'linear-gradient(135deg, rgba(0, 59, 112, 0.02) 0%, rgba(29, 132, 181, 0.02) 100%)'
      },
      spacing: {
        'safe-h': 'max(1rem, env(safe-area-inset-left))',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      }
    }
  },
  plugins: []
} satisfies Config;

