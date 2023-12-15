import {it, expect} from '@jest/globals';
import {validateLoginDetails} from '../../../src/domain/login/validateLoginDetails';

it('should return true, given valid email address and password', () => {
  // Given
  const email = 'a@b.c';
  const password = 'password-over-8-characters';

  // When
  const result = validateLoginDetails(email, password);

  // Then
  expect(result).toBe(true);
});

it('should return error message, given email undefined', () => {
  // Given
  const email = undefined;
  const password = 'password-over-8-characters';

  // When
  const result = validateLoginDetails(email, password);

  // Then
  expect(result).toEqual('Please enter your email address');
});

it.each<string>(['aesgdthfjnhdbsrvz', 'e@e@e.com', '2345wtrstgr.c'])(
  'should return error message, given invalid email %p',
  email => {
    // Given'
    const password = 'password-over-8-characters';

    // When
    const result = validateLoginDetails(email, password);

    // Then
    expect(result).toEqual('Please enter a valid email address');
  },
);

it('should return error message, given password undefined', () => {
  // Given
  const email = 'a@b.c';
  const password = undefined;

  // When
  const result = validateLoginDetails(email, password);

  // Then
  expect(result).toEqual('Please enter your password');
});

it('should return error message, given password too short', () => {
  // Given
  const email = 'a@b.c';
  const password = '1234567';

  // When
  const result = validateLoginDetails(email, password);

  // Then
  expect(result).toEqual('Your password should be at least 8 characters long');
});
