const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  //Only edit below 
  
  const getStartDay = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  
  const generateTableCell = (classString, value) => {
    const cellContent = `&nbsp;${value}&nbsp;`;
    return `
      <td class="${classString}">
        ${cellContent}
      </td>
    `;
  };
  
  const generateTableHeader = (currentDate) => {
    const monthYear = `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    document.querySelector('[data-title]').innerText = monthYear;
  };
  
  const generateTableRows = (calendarData) => {
    let rows = [];
  
    for (const { week, days } of calendarData) {
      let cells = [];
      cells.push(generateTableCell('table__cell table__cell_sidebar', `Week ${week}`));
  
      for (const { dayOfWeek, value } of days) {
        const isToday = new Date().getDate() === value;
        const isWeekend = dayOfWeek === 6 || dayOfWeek === 0;
        const isAlternate = week % 2 === 0;
        let classString = 'table__cell';
        if (isWeekend) classString += ' table__cell_weekend';
        if (isToday) classString += ' table__cell_today';
        if (isAlternate) classString += ' table__cell_alternate';
        cells.push(generateTableCell(classString, value));
      }
  
      rows.push(`<tr>${cells.join('')}</tr>`);
    }
  
    return rows.join('');
  };
  
  const generateCalendarData = () => {
    const currentDate = new Date();
    const startDay = getStartDay(currentDate);
    const daysInMonth = getDaysInMonth(currentDate);
    const calendarData = [];
  
    for (let weekIndex = 0; weekIndex < Math.ceil((startDay + daysInMonth) / 7); weekIndex++) {
      const weekData = {
        week: weekIndex + 1,
        days: [],
      };
  
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const day = (dayIndex - startDay) + (weekIndex * 7) + 1;
        const isValid = day > 0 && day <= daysInMonth;
  
        weekData.days.push({
          dayOfWeek: dayIndex + 1,
          value: isValid ? day : '',
        });
      }
  
      calendarData.push(weekData);
    }
  
    return calendarData;
  };
  
  // Main code execution
  const current = new Date();
  generateTableHeader(current);
  const calendarData = generateCalendarData();
  document.querySelector('[data-content]').innerHTML = generateTableRows(calendarData);
  