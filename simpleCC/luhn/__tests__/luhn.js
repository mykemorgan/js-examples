import { verifyLuhn } from '..';

test('basic', () => {
    expect(verifyLuhn('abc').toBe(false);
});
