import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { graph } from './graph/resource.js';

import {storage} from './storage/resource.js';

defineBackend({
  auth,
  graph,
  storage
});
