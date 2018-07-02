import moment from 'moment';
import numeral from 'numeral';

const emptyValue = '-';

export const isEmpty = value =>
  value === null || value === undefined || Number.isNaN(value) || value === '';

export const formatDate = date => (date ? moment(date).format('MM/DD/YYYY') : emptyValue);

export const formatCurrency = value => (value ? numeral(value).format('$0,0.00') : emptyValue);

export const formatDecimal = value => (value ? numeral(value).format('0,0.00') : emptyValue);

export const formatPercent = value => (value ? numeral(value / 100).format('0%') : emptyValue);

export const formatDefault = value => value || emptyValue;

export default isEmpty;
