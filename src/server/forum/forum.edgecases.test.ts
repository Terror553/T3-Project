import { describe, it, expect } from 'vitest';
import * as forum from './forum';

describe('forum edgecases (smoke)', () => {
  it('exports core forum server functions', () => {
    const expected = ['createTopic', 'createReply', 'editReply'];
    expected.forEach((fn) => {
      expect(typeof (forum as any)[fn]).toBe('function');
    });
  });

  it('has at least one reaction/follow helper exported', () => {
    const hasReaction = typeof (forum as any).toggleTopicReaction === 'function';
    const hasFollow = typeof (forum as any).toggleTopicFollow === 'function';
    expect(hasReaction || hasFollow).toBe(true);
  });
});
