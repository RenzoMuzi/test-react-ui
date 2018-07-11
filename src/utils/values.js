import moment from 'moment';
import numeral from 'numeral';

const emptyValue = '-';

const isEmpty = value => value === null || value === undefined || Number.isNaN(value) || value === '';

const formatDate = date => (date ? moment(date).format('MM/DD/YYYY') : emptyValue);

const formatCurrency = value => (value ? numeral(value).format('$0,0.00') : emptyValue);

const formatDecimal = value => (value ? numeral(value).format('0,0.00') : emptyValue);

const formatPercent = value => {
  if (!value) return emptyValue;
  return value === 100 ? '100%' : numeral(value / 100).format('0.0%');
};

const formatDefault = value => value || emptyValue;

export default {
  isEmpty,
  formatDate,
  formatCurrency,
  formatDecimal,
  formatPercent,
  formatDefault,
};
