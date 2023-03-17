export async function* streamAsyncIterable(
  stream: ReadableStream<Uint8Array> | null
) {
  if (!stream) {
    return;
  }
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        return;
      }
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

export const streamAsyncIterator = {
  [Symbol.asyncIterator]: streamAsyncIterable,
};
