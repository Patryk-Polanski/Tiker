// const dailyData = [
//   {
//     date: 'Mon Mar 01 2021 23:14:58 GMT+0000 (Greenwich Mean Time)',
//     total: 2400,
//     result: 400,
//     shortDate: '1/3/21',
//     position: 1,
//   },
//   {
//     date: 'Mon Mar 02 2021 23:13:58 GMT+0000 (Greenwich Mean Time)',
//     total: 1200,
//     result: -1200,
//     shortDate: '2/3/21',
//     position: 2,
//   },
//   {
//     date: 'Mon Mar 03 2021 23:12:58 GMT+0000 (Greenwich Mean Time)',
//     total: 900,
//     result: -300,
//     shortDate: '3/3/21',
//     position: 3,
//   },
//   {
//     date: 'Mon Mar 04 2021 23:11:58 GMT+0000 (Greenwich Mean Time)',
//     total: 1400,
//     result: 500,
//     shortDate: '4/3/21',
//     position: 4,
//   },
//   {
//     date: 'Mon Mar 05 2021 23:10:58 GMT+0000 (Greenwich Mean Time)',
//     total: 2200,
//     result: 800,
//     shortDate: '5/3/21',
//     position: 5,
//   },
//   {
//     date: 'Mon Mar 06 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
//     total: 600,
//     result: -1600,
//     shortDate: '6/3/21',
//     position: 6,
//   },
//   {
//     date: 'Mon Mar 07 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
//     total: 500,
//     result: -100,
//     shortDate: '7/3/21',
//     position: 7,
//   },
//   {
//     date: 'Mon Mar 12 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
//     total: 660,
//     result: 160,
//     shortDate: '12/3/21',
//     position: 8,
//   },
//   {
//     date: 'Mon Mar 16 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
//     total: 990,
//     result: 330,
//     shortDate: '16/3/21',
//     position: 9,
//   },
//   {
//     date: 'Mon Mar 18 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
//     total: 1300,
//     result: 310,
//     shortDate: '19/3/21',
//     position: 10,
//   },
//   {
//     date: 'Mon Mar 23 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
//     total: 1348,
//     result: 48,
//     shortDate: '23/3/21',
//     position: 11,
//   },
//   {
//     date: 'Mon Mar 24 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
//     total: 1450,
//     result: 112,
//     shortDate: '24/3/21',
//     position: 12,
//   },
//   {
//     date: 'Mon Mar 26 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
//     total: 1300,
//     result: -150,
//     shortDate: '26/3/21',
//     position: 13,
//   },
//   {
//     date: 'Mon Mar 27 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
//     total: 1423,
//     result: 123,
//     shortDate: '27/3/21',
//     position: 14,
//   },
//   {
//     date: 'Mon Mar 29 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
//     total: 1497,
//     result: 74,
//     shortDate: '29/3/21',
//     position: 15,
//   },
// ];

// const monthlyData = [
//   {
//     date: 'Mon Mar 01 2021 23:14:58 GMT+0000 (Greenwich Mean Time)',
//     total: 100500,
//     result: 2500,
//     shortDate: '3/21',
//     position: 1,
//   },
//   {
//     date: 'Mon Mar 02 2022 23:13:58 GMT+0000 (Greenwich Mean Time)',
//     total: 123260,
//     result: 18260,
//     shortDate: '4/21',
//     position: 2,
//   },
//   {
//     date: 'Mon Mar 03 2023 23:12:58 GMT+0000 (Greenwich Mean Time)',
//     total: 120000,
//     result: -3200,
//     shortDate: '5/21',
//     position: 3,
//   },
//   {
//     date: 'Mon Mar 03 2024 23:12:58 GMT+0000 (Greenwich Mean Time)',
//     total: 110340,
//     result: -10660,
//     shortDate: '5/21',
//     position: 4,
//   },
// ];

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
    const dateShort = month[0].dateShort;

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
