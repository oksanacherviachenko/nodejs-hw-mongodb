//src/routers/contacts.js
import { Router } from "express";
import { getContactsController, getContactByIdController, createContactController, deleteContactController, patchContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js"; 
import { createContactSchema } from "../validation/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { updateContactSchema } from "../validation/contacts.js";
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from "../middlewares/checkRoles.js";
import { ROLES } from "../constants/index.js";

const router = Router();

router.use(authenticate);

router.get('/', checkRoles(ROLES.USER), ctrlWrapper(getContactsController));

  router.get('/:contactId', checkRoles(ROLES.USER), isValidId, ctrlWrapper(getContactByIdController));

router.post('/', checkRoles(ROLES.USER), validateBody(createContactSchema), ctrlWrapper(createContactController));

router.delete('/:contactId', checkRoles(ROLES.USER), isValidId, ctrlWrapper(deleteContactController));

router.patch('/:contactId', checkRoles(ROLES.USER), isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));

export default router;