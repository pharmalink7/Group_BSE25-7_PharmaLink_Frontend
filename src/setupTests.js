// src/setupTests.js

// This adds jest-dom's custom assertions like .toBeInTheDocument()
import '@testing-library/jest-dom';

// This is the crucial part to fix the TextEncoder error
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;