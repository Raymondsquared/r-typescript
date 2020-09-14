import {
  RequestHandler as expressRequestHandler,
  Request as expressRequest,
  Response as expressResponse,
  NextFunction as expressNextFunction,
} from 'express';

import { MainDomainService } from '../../domain/services/domain';
import { LocalDomainRepository } from '../../domain/repositories/domain';
import { RError } from '../../common/types/error';
import { InvalidApplicationInputError } from '../../common/errors';
import { Output } from '../../common/types/output';
import { DomainRepository } from '../../domain/types/repository';
import { DomainService } from '../../domain/types/service';
import { DomainModel } from '../../domain/types/domain-model';

const domainRepository: DomainRepository = new LocalDomainRepository();
const domainService: DomainService = new MainDomainService(domainRepository);

const getOneDomainModel: expressRequestHandler = function getOneDomainModel(
  request: expressRequest,
  response: expressResponse,
  nextFunc: expressNextFunction
) {
  try {
    let output: Output<DomainModel> = { data: null };
    const idParam = request?.params?.id;

    // Input validation and adapter
    if (!idParam) {
      throw InvalidApplicationInputError;
    }

    output = domainService.getOneDomainModel(idParam);
    response.send(output);
  } catch (error) {
    console.log('Failed geting one domain');
    if (error instanceof RError === false) {
      error = new RError(error.message);
    }
    nextFunc(error);
  }
};

export { getOneDomainModel };
