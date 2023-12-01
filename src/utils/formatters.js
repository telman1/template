// import { appConfig } from '@sportdigi/app-starter';

export const convertDate = dateToken => {
  let dateObj;
  let formattedDateToken = dateToken;
  let customTimeZone = appConfig.timeZone;
  let dateInstanceCase = dateToken instanceof Date;
  let oldFormatDateToken = typeof dateToken == 'string' && dateToken.includes('/Date');
  if (dateInstanceCase) {
    formattedDateToken = dateToken.getTime();
  }
  if (oldFormatDateToken) {
    formattedDateToken = parseInt(dateToken.substr(6));
  }

  dateObj = new Date(formattedDateToken);
  if (customTimeZone || customTimeZone === 0) {
    const dateObjInUTC = dateObj.getTime() + dateObj.getTimezoneOffset() * 60000;
    dateObj = new Date(dateObjInUTC + 3600000 * customTimeZone);
  }

  return dateObj;
};
//odds format
const decimalToAmerican = odd => {
  if (odd >= 2) {
    return '+' + Math.round((odd - 1) * 100);
  } else {
    return Math.round(-100 / (odd - 1));
  }
};

const decimalToIndo = odd => {
  if (odd <= 2) {
    return (-1 / (odd - 1)).toFixed(2);
  } else {
    return parseFloat(--odd).toFixed(2);
  }
};

const decimalToMalay = odd => {
  if (odd <= 2) {
    return (odd - 1).toFixed(3);
  } else {
    return (-1 / (odd - 1)).toFixed(3);
  }
};

const decimalToHongKong = odd => {
  return parseFloat(--odd).toFixed(2);
};

const decimalToFixed = odd => {
  if (appConfig.globalSettings?.partner?.ShowExtraZerosOnOdds) {
    return (Math.floor(odd * 1000) / 1000).toFixed(2);
  }
  return odd;
};

const decimalToFractal = dbl => {
  let dblDecimal = dbl;
  if (dblDecimal == parseInt(dblDecimal)) return (dblDecimal - 1).toString() + '/1'; //return no if it's not a decimal

  let whole = Math.floor(dblDecimal) - 1;
  let decPart = dblDecimal.toString()?.replace(Math.floor(dblDecimal) + '.', '');
  let rN = parseFloat(decPart);
  let rD = Math.pow(10, decPart.length);

  //just a few prime factors for testing purposes
  let primes = [41, 43, 37, 31, 29, 23, 19, 17, 13, 11, 7, 5, 3, 2];

  for (let i = primes.length - 1; i >= 0; i--) {
    while (rD % primes[i] == 0 && rN % primes[i] == 0) {
      rN = rN / primes[i];
      rD = rD / primes[i];
    }
  }

  rN = rN + whole * rD;
  return rN + '/' + rD;
};

export const convertOdd = (factor, oddFormat) => {
  if (!factor) return '';

  let convertFactor;

  switch (oddFormat) {
    case 1:
      convertFactor = decimalToFractal(factor);
      break;
    case 2:
      convertFactor = decimalToAmerican(factor);
      break;
    case 3:
      convertFactor = decimalToHongKong(factor);
      break;
    case 4:
      convertFactor = decimalToMalay(factor);
      break;
    case 5:
      convertFactor = decimalToIndo(factor);
      break;
    default:
      convertFactor = decimalToFixed(factor);
  }

  return convertFactor;
};

export const getTimeFormat = format => {
  format = format ?? 'HH:mm';
  return format?.replace('tt', 'TT')?.replace(/m/g, 'M');
};

export const getDateFormat = () => {
  const format =
    appConfig.globalSettings.user?.UserSetting.DateFormat ||
    appConfig.globalSettings.partner.Localizations.DateFormat ||
    'dd-mm-yyyy';
  return format?.replace(/M/g, 'm');
};
