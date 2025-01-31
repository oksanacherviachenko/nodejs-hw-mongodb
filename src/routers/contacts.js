import { Router } from 'express';
import { getContactByIdController, getContactsController, createContactController, deleteContactController, patchContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', ctrlWrapper(getContactByIdController));
router.post('/', ctrlWrapper(createContactController));
router.delete('/:contactId', ctrlWrapper(deleteContactController));
router.patch('/:contactId', ctrlWrapper(patchContactController));

export default router;
