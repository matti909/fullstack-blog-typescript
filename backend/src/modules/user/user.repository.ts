import type { TUser } from "./user.model.js";

import { createBaseRepository } from "../../shared/repositories/base.repository.js";
import { User } from "./user.model.js";

export const userRepository = createBaseRepository<TUser>(User);
