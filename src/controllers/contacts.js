//src/controllers/contacts.js
import {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
  updateContact,
} from "../services/contacts.js";
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { CLOUDINARY } from '../constants/index.js';

const enableCloudinary = getEnvVar(CLOUDINARY.ENABLE_CLOUDINARY) === 'true';

export const getContactsController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);

    const contactsData = await getAllContacts({
      userId: req.user._id,
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contactsData,
    });
  } catch (err) {
    next(err);
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId, req.user._id);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};

export const createContactController = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      throw createHttpError(401, "Unauthorized: user not found");
    }

    let photoUrl = null;

    if (req.file) {
      console.log('Uploading photo:', req.file.path);
      if (enableCloudinary) {
        photoUrl = await saveFileToCloudinary(req.file);
        console.log('Uploaded to Cloudinary:', photoUrl);
      } else {
        photoUrl = await saveFileToUploadDir(req.file);
        console.log('Saved locally:', photoUrl);
      }
    }

    const contactData = {
      ...req.body,
      photo: photoUrl,
      userId: req.user._id,
    };

    const contact = await createContact(contactData);

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  } catch (err) {
    console.error('Error in createContactController:', err);
    next(err);
  }
};

export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await deleteContact(contactId, req.user._id);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const patchContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const photo = req.file;

    let photoUrl;

    if (photo) {
      console.log('Updating photo:', photo.path);
      if (enableCloudinary) {
        photoUrl = await saveFileToCloudinary(photo);
        console.log('Updated photo on Cloudinary:', photoUrl);
      } else {
        photoUrl = await saveFileToUploadDir(photo);
        console.log('Updated photo locally:', photoUrl);
      }
    }

    const result = await updateContact(contactId, req.user._id, {
      ...req.body,
      photo: photoUrl,
    });

    if (!result) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: result.contact,
    });
  } catch (err) {
    console.error('Error in patchContactController:', err);
    next(err);
  }
};




