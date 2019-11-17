export const isProduction = (): boolean => {
  // istanbul ignore next
  {
    return process.env.NODE_ENV === 'production';
  }
}

export function truncateEven<T>(arr: ReadonlyArray<T>): ReadonlyArray<T> {
  const evenLength = arr.length - (arr.length % 2);
  return arr.slice(0, evenLength);
}
