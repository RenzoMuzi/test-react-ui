import lodashGet from 'lodash/get';
import isNil from 'lodash/isNil';

const safeGet = (...args) => {
  const [object, path, defaultValue] = args;

  const result = lodashGet(object, path);

  if (isNil(result) && args.length >= 3) return defaultValue;

  return result;
};

export default safeGet;
