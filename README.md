# Greenmap

[![Travis](https://travis-ci.org/randallmorey/greenmap.svg?branch=master)](https://travis-ci.org/randallmorey/greenmap)

Map arrays asynchronously in separate threads.  Powered by [greenlet][greenlet].

Since [greenlet][greenlet] uses web workers it only runs in the browser.


## Installation

```
npm i --save-dev greenmap
```


## Usage

Pass an array and a map function to execute asynchronously in a separate thread.
`await` result or use as a promise.

```js
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
