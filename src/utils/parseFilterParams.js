//src/utils/parseFilterParams.js
const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;

  const allowedTypes = ['work', 'home', 'personal'];
  if (allowedTypes.includes(type)) {
    return type;
  }
};

const parseBoolean = (value) => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined; 
};

export const parseFilterParams = (query) => {
  const { filter, isFavourite } = query;  // Змінено type на filter

  const parsedType = parseContactType(filter);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedIsFavourite,
  };
};

