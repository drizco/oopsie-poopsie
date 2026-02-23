// Jest setup for Firebase Functions tests
import { jest, beforeAll, afterAll, afterEach } from '@jest/globals'
import { TEST_ERROR } from './constants'

// Mock environment variables
process.env.FIREBASE_CONFIG = JSON.stringify({
  projectId: 'test-project',
  databaseURL: 'https://test-project.firebaseio.com',
  storageBucket: 'test-project.appspot.com',
})

// Suppress console errors in tests
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (args.some((arg) => arg?.toString().includes(TEST_ERROR))) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

// Cleanup after each test
afterEach(() => {
  jest.clearAllMocks()
})
