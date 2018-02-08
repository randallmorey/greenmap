import { map } from './greenmap';
import assert from 'assert';

describe('Greenmap map():', () => {
  it('asynchronously maps the passed array using the passed function', async (done) => {
    const result = await map([1, 2, 3], (item) => ++item);
    assert.equal(result[0], 2);
    assert.equal(result[1], 3);
    assert.equal(result[2], 4);
    done();
  });

  it('should return a promise that asynchronously maps the passed array using the passed function', (done) => {
    const promise = map([1, 2, 3], (item) => ++item);
    assert.ok(promise);
    promise.then((result) => {
      assert.equal(result[0], 2);
      assert.equal(result[1], 3);
      assert.equal(result[2], 4);
      done();
    });
  });
});

Testem.afterTests((config, data, callback) => {
  const coverage = JSON.stringify(window.__coverage__);
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) callback();
  };
  xhr.open('POST', '/coverage', true);
  xhr.send(coverage);
});
