import { ContactCollection } from '../db/models/contactModel.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
}) => {
  page = Number(page);
  perPage = Number(perPage);

  const limit = perPage;
  const skip = (page - 1) * perPage;

  // Отримуємо загальну кількість контактів
  const totalItems = await ContactCollection.countDocuments();
  const totalPages = Math.ceil(totalItems / perPage);

  // Отримуємо відсортовані та відфільтровані контакти
  const contacts = await ContactCollection.find()
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  return {
    data: contacts,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
};

export const getContactById = async (contactId) => {
  return await ContactCollection.findById(contactId);
};

export const createContact = async (payload) => {
  return await ContactCollection.create(payload);
};

export const deleteContact = async (contactId) => {
  return await ContactCollection.findOneAndDelete({ _id: contactId });
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await ContactCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      ...options,
    }
  );

  if (!rawResult) return null;

  return {
    contact: rawResult,
    isNew: !!rawResult.lastErrorObject?.upserted,
  };
};
