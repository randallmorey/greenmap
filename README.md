# Greenmap

[![Travis](https://travis-ci.org/randallmorey/greenmap.svg?branch=master)](https://travis-ci.org/randallmorey/greenmap)
[![Maintainability](https://api.codeclimate.com/v1/badges/c2a7454bfdda8d068863/maintainability)](https://codeclimate.com/github/randallmorey/greenmap/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c2a7454bfdda8d068863/test_coverage)](https://codeclimate.com/github/randallmorey/greenmap/test_coverage)

Map arrays asynchronously in separate threads.  Powered by [greenlet][greenlet].

**Greenmap** supports only web browsers because [greenlet][greenlet] uses
web workers.


## Installation

```
npm i --save-dev greenmap
```


## Usage

Pass an array and a map function to execute asynchronously in a separate thread.
`await` result or use as a promise.

```js
import { map } from 'greenmap';

async function mapArray() {
  const result = await map([1, 2, 3], (item) => ++item);
  console.log(result);
};

// [2, 3, 4]
mapArray();
```


## Tests

```
npm test
```


[greenlet]: https://github.com/developit/greenlet/
