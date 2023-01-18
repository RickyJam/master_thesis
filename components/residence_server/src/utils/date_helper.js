const lastCommonDate = new Date(2016, 11, 15, 23, 59, 59, 0);
const lastHomeDDate = new Date(2016, 4, 10, 23, 59, 59, 0);

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

export function getUserDates(user, home) {
  const lengthOfStay = {
    from: user.lengthOfStay?.from,
    to: user.lengthOfStay?.to,
  };
  const lastValidDate = home === "homeD" ? lastHomeDDate : lastCommonDate;
  return getDates(lengthOfStay, lastValidDate);
}

function getDates({ from = undefined, to = undefined } = {}, lastValidDate) {
  if (from) {
    return { fromDate: from, toDate: getFollowingThirtyDays(from) };
  } else if (to) {
    return { fromDate: getPastThirtyDays(toDate), toDate: to };
  } else {
    return { fromDate: getPastThirtyDays(lastValidDate), toDate: lastValidDate };
  }
}
