export const isProduction = (): boolean => {
  // istanbul ignore next
  {
    return process.env.NODE_ENV === 'production';
  }
}
