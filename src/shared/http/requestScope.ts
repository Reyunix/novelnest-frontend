// One scope belongs to one mounted query. Mutations also invalidate in-flight reads.
export const createRequestScope = () => {
  let controller: AbortController | null = null;
  let sequence = 0;
  const cancel = () => {
    ++sequence;
    controller?.abort();
  };
  return {
    cancel,
    start: () => {
      cancel();
      const version = sequence;
      const next = new AbortController();
      controller = next;
      return {
        signal: next.signal,
        isCurrent: () => sequence === version && !next.signal.aborted,
      };
    },
  };
};
