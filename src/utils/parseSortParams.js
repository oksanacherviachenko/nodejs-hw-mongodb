import { SORT_ORDER } from "../constants/index.js";

const parseSortOrder = (sortOrder) => {
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
  return isKnownOrder ? sortOrder : SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
  const keysOfContacts = [
    '_id',
    'name',
    'email',
    'phoneNumber',
    'isFavourite',
    'contactType',
    'createdAt',
    'updatedAt',
  ];

  return keysOfContacts.includes(sortBy) ? sortBy : '_id';
};

export const parseSortParams = (query) => {
  const { sortOrder, sortBy } = query;

  return {
    sortOrder: parseSortOrder(sortOrder),
    sortBy: parseSortBy(sortBy),
  };
};
