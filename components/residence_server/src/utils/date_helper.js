export const lastDate = new Date(2016, 11, 31, 23, 59, 59, 0);

export function getLastMonthDate(startDate) {
  const lastMonthDate = new Date(startDate);
  lastMonthDate.setDate(startDate.getDate() - 30);
  return lastMonthDate;
}
