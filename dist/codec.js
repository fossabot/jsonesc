"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base91_1 = require("./base91");
function encodeDate(self) {
    return '\u001bDate:' + self.getTime();
}
exports.encodeDate = encodeDate;
function decodeDate(str) {
    let ts = parseInt(str.substr(6));
    if (ts === ts) {
        return new Date(ts);
    }
    return undefined;
}
exports.decodeDate = decodeDate;
function encodeUint8Array(self) {
    return '\u001bBin:' + base91_1.default.encode(self);
}
exports.encodeUint8Array = encodeUint8Array;
function decodeUint8Array(str) {
    return new Uint8Array(base91_1.default.decode(str, 5));
}
exports.decodeUint8Array = decodeUint8Array;
function encodeBuffer(self) {
    return '\u001bBuf:' + base91_1.default.encode(new Uint8Array(self));
}
exports.encodeBuffer = encodeBuffer;
function decodeBuffer(str) {
    return new Uint8Array(base91_1.default.decode(str, 5)).buffer;
}
exports.decodeBuffer = decodeBuffer;
//# sourceMappingURL=codec.js.map