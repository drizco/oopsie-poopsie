// Test helpers for rendering React components
import { jest } from '@jest/globals';
import { render as rtlRender } from '@testing-library/react';
import CombinedContext from '@/context/CombinedContext';

/**
 * Custom render function that wraps components with necessary providers
 */
export function render(
  ui,
  {
    contextValue = {},
    ...renderOptions
  } = {}
) {
  const defaultContextValue = {
    mute: false,
    setMute: jest.fn(),
    dark: false,
    setDark: jest.fn(),
    loading: false,
    setLoading: jest.fn(),
    error: null,
    setError: jest.fn(),
    timerState: {
      timeRemaining: 60,
      isActive: false,
      isPaused: false,
    },
    timerDispatch: jest.fn(),
  };

  const mergedContextValue = {
    ...defaultContextValue,
    ...contextValue,
  };

  function Wrapper({ children }) {
    return (
      <CombinedContext.Provider value={mergedContextValue}>
        {children}
      </CombinedContext.Provider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

/**
 * Creates mock context value for testing
 */
export function createMockContext(overrides = {}) {
  return {
    mute: false,
    setMute: jest.fn(),
    dark: false,
    setDark: jest.fn(),
    loading: false,
    setLoading: jest.fn(),
    error: null,
    setError: jest.fn(),
    timerState: {
      timeRemaining: 60,
      isActive: false,
      isPaused: false,
    },
    timerDispatch: jest.fn(),
    ...overrides,
  };
}

// Re-export everything from RTL
export * from '@testing-library/react';
