// Sync version
export const promiseSync = <T>(fn: () => T): [Error | null, T | null] => {
  try {
    const result = fn();
    return [null, result];
  } catch (error) {
    return [error as Error, null];
  }
};

// Async version
export const promise = async <T>(
  fn: () => Promise<T>
): Promise<[Error | null, T | null]> => {
  try {
    const result = await fn();
    return [null, result];
  } catch (error) {
    return [error as Error, null];
  }
};
