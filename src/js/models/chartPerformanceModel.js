const formatShortDate = function (dateShort) {
  const splitDate = dateShort.split('/');
  splitDate.shift();
  return splitDate.join('/');
};

const formatMonthlyData = function (calendarData) {
  let monthsArr = [];

  Object.keys(calendarData).forEach(monthKey => {
    monthsArr.push(calendarData[monthKey].map(day => day.trades));
  });

  let formattedMonthsArr = [];

  monthsArr.forEach(month => {
    const returnCash = month
      .flat()
      .map(item => item.returnCash)
      .reduce((acc, num) => acc + num, 0);
    const dateLong = month[0].dateLong;
    const dateShort = formatShortDate(month[0].dateShort);
    const lastDay = month[month.length - 1];
    const lastTradeTotal = lastDay[lastDay.length - 1].total;

    formattedMonthsArr.push({
      returnCash,
      dateLong,
      dateShort,
      total: lastTradeTotal,
    });
  });

  formattedMonthsArr.sort(
    (a, b) => new Date(a.dateLong) - new Date(b.dateLong)
  );

  formattedMonthsArr.forEach((month, index) => {
    month.position = index;
  });

  return formattedMonthsArr;
};

const formatDailyData = function (calendarData) {
  let daysArr = [];

  Object.keys(calendarData).forEach(monthKey => {
    daysArr.push(
      ...calendarData[monthKey].map(day => {
        day.trades.dateShort = day.dateShort;
        day.trades.dateLong = day.dateLong;
        return day.trades;
      })
    );
  });

  let formattedDaysArr = daysArr.map(day => {
    const returnCash = day
      .map(trade => {
        if (trade.returnCash) return trade.returnCash;
      })
      .reduce((acc, num) => acc + num, 0);
    const total = day[day.length - 1].total;
    return {
      dateShort: day.dateShort,
      dateLong: day.dateLong,
      returnCash,
      total,
    };
  });

  formattedDaysArr.sort((a, b) => new Date(a.dateLong) - new Date(b.dateLong));

  formattedDaysArr.forEach((day, index) => {
    day.position = index;
  });

  return formattedDaysArr;
};

export const formatPerformanceData = function (calendarData, capital, type) {
  if (type === 'day') return ['Daily', formatDailyData(calendarData, capital)];
  if (type === 'month')
    return ['Monthly', formatMonthlyData(calendarData, capital)];
};
