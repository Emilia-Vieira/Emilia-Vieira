import { defineConfig } from 'vite'

export default defineConfig({
  base: '/Emilia-Vieira/',
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
        transparencia: './pages/transparencia.html',
        servicos: './pages/servicos.html',
        publicacoes: './pages/publicacoes.html',
        contato: './pages/contato.html',
        'design-system': './docs/design-system.html',
      }
    }
  }
})
