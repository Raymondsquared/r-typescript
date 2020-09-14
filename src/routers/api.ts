// External modules
import {
  Router as expressRouter,
  Request as expressRequest,
  Response as expressResponse,
  NextFunction as expressNextFunction,
} from 'express';

import { getOneDomainModel } from '../modules/handler/api/domain';

const router = expressRouter();

router.get(
  '/health-check',
  async (request: expressRequest, response: expressResponse, nextFunc: expressNextFunction) => {
    response.send('healthy');
  }
);

router.get('/api/v1/domain/:id', getOneDomainModel);

export default router;
