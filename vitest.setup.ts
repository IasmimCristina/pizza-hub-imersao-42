import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Matchers:
expect.extend(matchers);

// Limpeza automática:
afterEach(() => {
  cleanup();
});
