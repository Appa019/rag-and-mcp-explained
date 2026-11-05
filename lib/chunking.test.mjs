import { test } from "node:test";
import assert from "node:assert/strict";
import { chunkingSample, computeChunks, joinChunks } from "./chunking.ts";

// Every combination the simulator's sliders allow.
const combos = [];
for (let size = 60; size <= 280; size += 10) {
  for (let overlap = 0; overlap <= Math.floor(size * 0.5); overlap += 5) combos.push([size, overlap]);
}

test("joining the chunks minus the overlap gives back the original text", () => {
  for (const [size, overlap] of combos) {
    assert.equal(joinChunks(computeChunks(chunkingSample, size, overlap)), chunkingSample, `size=${size} overlap=${overlap}`);
  }
});

test("chunks respect the size and never cut inside a word", () => {
  for (const [size, overlap] of combos) {
    for (const c of computeChunks(chunkingSample, size, overlap)) {
      assert.ok(c.text.length <= size, `size=${size} overlap=${overlap} chunk ${c.index} too long`);
      assert.ok(c.start === 0 || chunkingSample[c.start - 1] === " ", `chunk ${c.index} starts mid-word`);
      assert.ok(c.end === chunkingSample.length || chunkingSample[c.end - 1] === " ", `chunk ${c.index} ends mid-word`);
    }
  }
});

test("overlap repeats whole words only, and none when overlap is zero", () => {
  const noOverlap = computeChunks(chunkingSample, 140, 0);
  noOverlap.slice(1).forEach((c, i) => assert.equal(c.start, noOverlap[i].end));
  const withOverlap = computeChunks(chunkingSample, 140, 30);
  assert.ok(withOverlap.slice(1).some((c, i) => c.start < withOverlap[i].end));
});

test("a word longer than the size is the only hard cut and still round-trips", () => {
  const text = "a " + "x".repeat(150) + " b";
  assert.equal(joinChunks(computeChunks(text, 60, 20)), text);
});
