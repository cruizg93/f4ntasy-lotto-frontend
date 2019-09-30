const en_month = [
  "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"
]

const de_month = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
]

export const adminService = {
  getWeekday,
  getDay,
  getTime,
  compare_date
}

function getWeekday(title) {
  let ary = title.split('-');
  if (ary[0]) return '';
  let result = ary[0].trim();
  return result.charAt(0).toUpperCase() + result.slice(1, 3);
}

function getDay(title) {
  let ary = title.split('-');
  return ary[1] ? ary[1].trim() : '';
}

function getTime(title) {
  let ary = title.split('-');
  return ary[2] ? ary[2].trim() : '';
}

function compare(a, b) {
  let a1 = getDay(a);
  let b1 = getDay(b);
  if (a1 === '' || b1 === '')
    return 0;

}

function convertTitle_de_en(title) {
  let result = title.trim();
  let month = title.split(' ')[0];
  return convert_de_en(month) + ' ' + (title.split(' ')[1] ? title.split(' ')[1] : '');
}

function convertTitle_en_de(title) {
  let result = title.trim();
  let month = title.split(' ')[0];
  return convert_en_de(month) + ' ' + (title.split(' ')[1] ? title.split(' ')[1] : '');
}

function covert_De_En(month) {
  let result = month.toLowerCase();
  return en_month[de_month.indexOf(result)];
}

function covert_En_De(month) {
  let result = month.toLowerCase();
  return de_month[en_month.indexOf(result)];
}

