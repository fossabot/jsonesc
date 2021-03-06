# Json Escape
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fticlo%2Fjsonesc.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fticlo%2Fjsonesc?ref=badge_shield)


<a href='https://travis-ci.com/ticlo/jsonesc'><img src="https://travis-ci.com/ticlo/jsonesc.svg?branch=master" title="travis-ci"></a>


Json Escape use escape character in string to store types that normally not allowed in JSON

[asc character 0x1b](https://en.wikipedia.org/wiki/Escape_character#ASCII_escape_character) is used for the escaping

#### examples

```javascript
// import JsonEsc from 'jsonesc';
const JsonEsc = require('jsonesc').default;

JsonEsc.stringify( [
  NaN,
  -Infinity,
  new Date(),
  new Uint8Array([1,2,3,4]),
  undefined
], 1);
// returns:
[
 "\u001bNaN",
 "\u001b-Inf",
 "\u001bDate:2018-02-07T19:07:18.207Z",
 "\u001bBin:wFg{A",
 "\u001b"
]
```

## Advantage

JsonEsc allows additional data types to be serialized in JSON, such as binary date (Uint8Array) and Date, while still keeps the verbose nature of JSON.<br>
The output string is still a 100% valid JSON, and compatible with any JSON editing/parsing tool or library. This makes JsonEsc much easier to debug and trouble shoot than binary formats like BSON and MsgPack

### Performance

Modern browsers and nodejs are hightly optimized for JSON. This allows JsonEsc to be encoded and decoded faster than the other 2 formats in most of the cases.

#### benchmark result
Benchmark with [sample data](https://github.com/ticlo/jsonesc/blob/master/benchmark/sample-data.js) on Chrome 67, Firefox59, Edge 42 

[Time are all in ms, smaller is better](https://github.com/ticlo/jsonesc/blob/master/benchmark/benchmark.js)

||Chrome<br>Encode|Chrome<br>Decode|Firefox<br>Encode|Firefox<br>Decode|Edge<br>Encode|Edge<br>Decode|
|:----:|:----:|:----:|:----:|:----:|:----:|:----:|
|JsonEsc|***0.1161***|0.1606|***0.1394***|***0.1553***|***0.0899***|***0.0753***|
|MsgPack|0.2465|0.1191|0.8663|0.2313|0.5752|0.2653|
|BSON|0.1255|***0.1170***|0.3634|0.6124|0.27005|0.37705|

## API

```typescript
JsonEsc.stringify(inpt:any, space?:number, sortKeys?:boolean = false);
JsonEsc.parse(inpt:string);
```

## Custom Types

JsonEsc's register API make it really simple to add custom type into json encoding/decoding

```javascript
// custom type
class MyClass {
  constructor(str) {
    this.myStr = str;
  }
}

let myJson = new JsonEsc();
myJson.register('My', MyClass,
  // custom encoder
  (obj) => obj.myStr,
  // custom decoder
  (str) => new MyClass(str)
);

myJson.stringify(new MyClass("hello"));
// "\u001bMy:hello"
```

## Base93 encoding

JsonEsc use [Base93](https://github.com/ticlo/jsonesc/tree/master/base93) to encode binary data, it's more compact than Base64.

If you still prefer Base64, just use these lines to register Uint8Array with a base64 encoder/decoder

```javascript
const JsonEsc = require('jsonesc').default;
const Base64 = require("base64-js");

let myJson = new JsonEsc();
myJson.register('B64', Uint8Array,
  (uint8arr) => Base64.fromByteArray(uint8arr),
  (str) => new Uint8Array(Base64.toByteArray(str.substr(5)))
);

myJson.stringify({ binary:new Uint8Array([1,2,3,4])});
// {"binary":"\u001bB64:AQIDBA=="}
```


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fticlo%2Fjsonesc.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fticlo%2Fjsonesc?ref=badge_large)