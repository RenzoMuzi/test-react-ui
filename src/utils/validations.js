import get from 'lodash/get';

export const getId = errorMessage => get(errorMessage, 'id');

export const hasId = errorMessage => !!getId(errorMessage);

export const errorChanged = (errorMessage, nextErrorMessage) => (
  hasId(nextErrorMessage) && getId(errorMessage) !== getId(nextErrorMessage)
);
