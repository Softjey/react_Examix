const isValidUrl = (string: string): boolean => {
  const regex = /^(https?:\/\/)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+.*)$/;
  return regex.test(string);
};

export default isValidUrl;
