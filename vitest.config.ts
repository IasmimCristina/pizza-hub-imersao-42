import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
});
//  Testes: economia de tempo, "documentação" e mais confiança no código.

// --> Ferramentas: Vitest (test runner) + RTL (React Testing Library) 
// --> Testes unitários e testes de integração (+ componentes)
