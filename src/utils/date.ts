export const makeToday = (val: string | Date | number = new Date().getTime()) => {
  const date = new Date(val);
  const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  return new Date(utc + KR_TIME_DIFF);
};

export const makeOneDay = (date: string) => {
  const year = parseInt(date.slice(0, 4));
  const month = parseInt(date.slice(4, 6));
  const day = parseInt(date.slice(6));

  const startDate = new Date(year, month - 1, day + 1);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 1);
  return [startDate, endDate];
};

export const setStringToDate = (date: string) => {
  const [y, m, d] = date.split(".").map((v) => +v);
  return new Date(y, m - 1, d + 1);
};

export const makeExpirationDate = (expiration: number) => {
  const today = makeToday();
  const expiration_date = new Date(today);
  expiration_date.setDate(today.getDate() + expiration);

  return expiration_date;
};
