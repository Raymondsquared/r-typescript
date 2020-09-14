import { isEmpty } from 'lodash';

import { DomainModelValidator } from '../validators/domain';
import { DomainModel } from '../types/domain-model';
import { InvalidDomainInputError } from '../../common/errors';
import { RError } from '../../common/types/error';
import { Output } from '../../common/types/output';
import { DomainRepository } from '../types/repository';
import { DomainService } from '../types/service';
import { Validator } from '../../common/types/validator';

class MainDomainService implements DomainService {
  _domainValidator: Validator<DomainModel>;
  _domainRepository: DomainRepository;

  constructor(domainRepository: DomainRepository) {
    this._domainValidator = new DomainModelValidator();
    this._domainRepository = domainRepository;
  }

  getOneDomainModel(id: string): Output<DomainModel> {
    let output = {
      data: null,
    } as Output<DomainModel>;

    try {
      if (!id) {
        output.error = InvalidDomainInputError;
        return output;
      }

      output = this._domainRepository.selectOneDomainModel(id);
    } catch (error) {
      output.error = new RError(`Failed getting one domain model, Error: ${error}`);
    } finally {
      return output;
    }
  }
}

export { MainDomainService };
