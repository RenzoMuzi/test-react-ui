import moment from 'moment';
import numeral from 'numeral';

const emptyValue = '-';

const isEmpty = value => value === null || value === undefined || Number.isNaN(value) || value === '';

const formatDate = date => (date ? moment(date).format('MM/DD/YYYY') : emptyValue);

const formatCurrency = value => (value ? numeral(value).format('$0,0.00') : emptyValue);

const formatDecimal = value => (value ? numeral(value).format('0,0.00') : emptyValue);

const formatPercent = value => {
  if (!value) return emptyValue;
  return value === 1 ? '100%' : numeral(value).format('0.0%');
};

const formatAmountToK = amount => {
  if (amount > 999.99) {
    return `$${(amount / 1000).toFixed(1).replace(/\.0+$/, '')}k`;
  }
  if (amount > 0) {
    return `$${amount.toFixed(2)}`;
  }
  return '$0';
};

const formatPhoneNumber = (phone = '') =>
  (phone.length === 10 ? `${phone.substr(0, 3)}-${phone.substr(3, 3)}-${phone.substr(6, 4)}` : phone);

const formatDefault = value => value || emptyValue;

export default {
  emptyValue,
  isEmpty,
  formatDate,
  formatCurrency,
  formatDecimal,
  formatPercent,
  formatDefault,
  formatAmountToK,
  formatPhoneNumber,
};
