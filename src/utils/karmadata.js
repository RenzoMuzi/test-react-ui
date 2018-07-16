import isEmpty from 'lodash/isEmpty';
import safeGet from './safeGet';

export const getPhonesByUse = (entity, use) => {
  const phones = safeGet(entity, 'Phones', []).filter(m => m.Use === use);

  if (isEmpty(phones)) {
    return ['-'];
  }

  return phones;
};

export const cellPhones = entity => getPhonesByUse(entity, 'Mobile');

export const homePhones = entity => getPhonesByUse(entity, 'Home');

export const otherPhones = entity => getPhonesByUse(entity, 'Other');

export const workPhones = entity => getPhonesByUse(entity, 'Work');

export default {
  getPhonesByUse,
  cellPhones,
  homePhones,
  otherPhones,
  workPhones,
};
