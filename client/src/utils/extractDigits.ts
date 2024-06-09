const extractDigits = (str: string) => {
  return Number(str.replace(/[^0-9]/g, ''));
};

export default extractDigits;
