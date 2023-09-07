const makeOneDay = (date: string) => {
  const startDate = new Date(date);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 1);
  return [startDate, endDate];
};

export { makeOneDay };
