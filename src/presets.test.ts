import { describe, it, expect } from 'vitest';
import { presets, presetNames } from './presets';

describe('presets', () => {
  it('exposes named color palettes', () => {
    expect(presetNames.length).toBeGreaterThan(0);
    expect(presetNames).toContain('aurora');
  });

  it('every preset is a list of at least two color strings', () => {
    for (const name of presetNames) {
      const colors = presets[name];
      expect(Array.isArray(colors)).toBe(true);
      expect(colors.length).toBeGreaterThanOrEqual(2);
      for (const color of colors) {
        expect(typeof color).toBe('string');
        expect(color).toMatch(/^#[0-9A-Fa-f]{3,8}$/);
      }
    }
  });

  it('presetNames matches the keys of presets', () => {
    expect([...presetNames].sort()).toEqual(Object.keys(presets).sort());
  });
});
