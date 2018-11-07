/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Framework', () => {
  it('test expect', () => {
    expect(1).toBe(1);
  });

  it('should render contents', () => {
    const content = renderer.create(
      <div />
    );
    expect(content).not.toBeNull();
  });

  // it('reducer should save', () => {
  //   expect(example.reducers['example/save']({}, { payload: { a: 1 }})).toEqual({ a: 1 });
  // });
});
