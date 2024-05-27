function log(message: string) {
  // eslint-disable-next-line no-console
  return (value: unknown = '') => console.log(message, value);
}

export default log;
