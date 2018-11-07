/* eslint-disable react/jsx-filename-extension */
import renderer from 'react-test-renderer';
import HelloWorld from '../src/index';

describe('Test Framework', () => {
  it('test expect', () => {
    expect(1).toBe(1);
  });

  it('should render contents', () => {
    const content = renderer.create(HelloWorld);
    expect(content).not.toBeNull();
  });
});
