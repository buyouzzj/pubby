/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import renderer from 'react-test-renderer';
import Footer from '../src/layouts/Footer';

describe('Test Framework', () => {
  it('test expect', () => {
    expect(1).toBe(1);
  });

  it('should render contents', () => {
    const content = renderer.create(
      <Footer />
    );
    expect(content).not.toBeNull();
  });

  // it('reducer should save', () => {
  //   expect(example.reducers['example/save']({}, { payload: { a: 1 }})).toEqual({ a: 1 });
  // });
});
