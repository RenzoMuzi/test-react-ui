export const isEmpty = value =>
  value === null || value === undefined || Number.isNaN(value) || value === '';

export default isEmpty;
