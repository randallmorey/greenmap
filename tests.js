import { map, reduce, reduceRight, sort, find, filter, some } from './greenmap';
import assert from 'assert';

describe('Greenmap map():', () => {
  it('asynchronously maps the passed array using the passed function', async (done) => {
    const result = await map([1, 2, 3], (item) => ++item);
    assert.equal(result[0], 2);
    assert.equal(result[1], 3);
    assert.equal(result[2], 4);
    done();
  });
});

describe('Greenmap reduce():', () => {
  it('asynchronously reduces the passed array using the passed function', async (done) => {
    const result = await reduce([1, 2, 3, 4], (accumulator, currentValue) => accumulator + currentValue);
    assert.equal(result, 10);
    done();
  });

  it('should return a promise that asynchronously reduces the passed array using the passed function', (done) => {
    const promise = reduce([1, 2, 3, 4], (accumulator, currentValue) => accumulator + currentValue);
    assert.ok(promise);
    promise.then((result) => {
      assert.equal(result, 10);
      done();
    });
  });

  it('accepts an `initialValue` argument', async (done) => {
    const result = await reduce([1, 2, 3, 4], ((accumulator, currentValue) => accumulator + currentValue), 10);
    assert.equal(result, 20);
    done();
  });

  it('accepts a falsy `initialValue` argument', async (done) => {
    const result = await reduce([false], ((accumulator, currentValue) => accumulator === currentValue), false);
    assert.equal(result, true);
    done();
  });
});

describe('Greenmap reduceRight():', () => {
  it('asynchronously reduces the passed array using the passed function, right-to-left', async (done) => {
    const result = await reduceRight([1, 2, 3, 4], (accumulator, currentValue) => accumulator + currentValue);
    assert.equal(result, 10);
    done();
  });

  it('should return a promise that asynchronously reduces the passed array using the passed function', (done) => {
    const promise = reduceRight([1, 2, 3, 4], (accumulator, currentValue) => accumulator + currentValue);
    assert.ok(promise);
    promise.then((result) => {
      assert.equal(result, 10);
      done();
    });
  });

  it('accepts an `initialValue` argument', async (done) => {
    const result = await reduceRight([1, 2, 3, 4], ((accumulator, currentValue) => accumulator + currentValue), 10);
    assert.equal(result, 20);
    done();
  });

  it('accepts a falsy `initialValue` argument', async (done) => {
    const result = await reduceRight([false], ((accumulator, currentValue) => accumulator === currentValue), false);
    assert.equal(result, true);
    done();
  });
});

describe('Greenmap sort():', () => {
  it('asynchronously sorts the passed array using the passed comparator function', async (done) => {
    const result = await sort([1, 2, 3], (a, b) => a < b);
    assert.equal(result[0], 3);
    assert.equal(result[1], 2);
    assert.equal(result[2], 1);
    done();
  });

  it('asynchronously sorts the passed array without a comparator function', async (done) => {
    const result = await sort([3, 2, 1]);
    assert.equal(result[0], 1);
    assert.equal(result[1], 2);
    assert.equal(result[2], 3);
    done();
  });

  it('should return a promise that asynchronously sorts the passed array using the passed comparator function', (done) => {
    const promise = sort([1, 2, 3], (a, b) => a < b);
    assert.ok(promise);
    promise.then((result) => {
      assert.equal(result[0], 3);
      assert.equal(result[1], 2);
      assert.equal(result[2], 1);
      done();
    });
  });
});

describe('Greenmap find():', () => {
  it('asynchronously finds an element within the passed array using the passed function', async (done) => {
    const result = await find([
      {id: 1, name: 'wibble'},
      {id: 2, name: 'wubble'},
      {id: 3, name: 'flub'}
    ], (item) => item.id === 2);
    assert.equal(result.id, 2);
    assert.equal(result.name, 'wubble');
    done();
  });

  it('should return a promise that asynchronously find an element within the passed array using the passed function', (done) => {
    const promise = find([
      {id: 1, name: 'wibble'},
      {id: 2, name: 'wubble'},
      {id: 3, name: 'flub'}
    ], (item) => item.id === 2);
    assert.ok(promise);
    promise.then((result) => {
      assert.equal(result.id, 2);
      assert.equal(result.name, 'wubble');
      done();
    });
  });
});

describe('Greenmap filter():', () => {
  it('asynchronously filters elements within the passed array using the passed function', async () => {
    const result = await filter([
      {id: 1, name: 'wibble'},
      {id: 2, name: 'wubble'},
      {id: 3, name: 'flub'}
    ], (item) => item.id !== 1);
    assert.equal(result.length, 2);
    assert.equal(result[0].name, 'wubble');
  });
});

describe('Greenmap some():', () => {
  it('asynchronously tests elements within the passed array using the passed test function', async () => {
    let result = await some([
      {id: 1, color: 'green'},
      {id: 2, color: 'green'},
      {id: 3, color: 'red'}
    ], (item) => item.color === 'green');
    assert.equal(result, true);
    result = await some([
      {id: 1, color: 'green'},
      {id: 2, color: 'green'},
      {id: 3, color: 'red'}
    ], (item) => item.color === 'blue');
    assert.equal(result, false);
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
