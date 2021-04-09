const formatShortDate = function (dateShort) {
  const splitDate = dateShort.split('/');
  splitDate.shift();
  return splitDate.join('/');
};

const formatMonthlyData = function (calendarData, capital) {
  let currentCapital = capital;
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

    formattedMonthsArr.push({
      returnCash,
      dateLong,
      dateShort,
    });
  });

  formattedMonthsArr.sort(
    (a, b) => new Date(a.dateLong) - new Date(b.dateLong)
  );

  formattedMonthsArr.forEach((month, index) => {
    currentCapital += month.returnCash;
    month.total = currentCapital;
    month.position = index;
  });

  return formattedMonthsArr;
};

const formatDailyData = function (calendarData, capital) {
  let currentCapital = capital;
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
    return {
      dateShort: day.dateShort,
      dateLong: day.dateLong,
      returnCash,
    };
  });

  formattedDaysArr.sort((a, b) => new Date(a.dateLong) - new Date(b.dateLong));

  formattedDaysArr.forEach((day, index) => {
    currentCapital += day.returnCash;
    day.total = currentCapital;
    day.position = index;
  });

  return formattedDaysArr;
};

export const formatPerformanceData = function (calendarData, capital, type) {
  if (type === 'day') return ['Daily', formatDailyData(calendarData, capital)];
  if (type === 'month')
    return ['Monthly', formatMonthlyData(calendarData, capital)];
};
