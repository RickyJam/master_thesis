export const lastDate = new Date(2016, 11, 31, 23, 59, 59, 0);

export function getLastMonthDate(startDate) {
  const lastMonthDate = new Date(startDate);
  lastMonthDate.setDate(startDate.getDate() - 30);
  return lastMonthDate;
}

function getFollowingThirtyDays(fromDate) {
  const lastMonthDate = new Date(fromDate);
  lastMonthDate.setDate(fromDate.getDate() + 30);
  return lastMonthDate;
}

function getPastThirtyDays(toDate) {
  const lastMonthDate = new Date(toDate);
  lastMonthDate.setDate(toDate.getDate() - 30);
  return lastMonthDate;
}

export function getUserDates(user) {
  const lengthOfStay = {
    from: user.lengthOfStay?.from,
    to: user.lengthOfStay?.to,
  };
  return getDates(lengthOfStay);
}

function getDates({ from = undefined, to = undefined } = {}) {
  if (from) {
    return { fromDate: from, toDate: getFollowingThirtyDays(from) };
  } else if (to) {
    return { fromDate: getPastThirtyDays(toDate), toDate: to };
  } else {
    return { fromDate: getPastThirtyDays(lastDate), toDate: lastDate };
  }
}
