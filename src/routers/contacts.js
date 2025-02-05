import { Router } from "express";
import { getContactsController, getContactByIdController, createContactController, deleteContactController, patchContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js"; 
import { createContactSchema } from "../validation/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { updateContactSchema } from "../validation/contacts.js";

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

  router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

router.post('/', validateBody(createContactSchema), ctrlWrapper(createContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

router.patch('/contacts/:contactId', validateBody(updateContactSchema), ctrlWrapper(patchContactController));

export default router;