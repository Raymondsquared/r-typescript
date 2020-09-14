import { isEmpty } from 'lodash';

import { DomainModel } from '../types/domain-model';
import { Output } from '../../common/types/output';
import { Validator } from '../../common/types/validator';
import { RError } from '../../common/types/error';

class DomainModelValidator implements Validator<DomainModel> {
  isValid(domainModel: DomainModel): Output<boolean> {
    const output = {
      data: false,
    } as Output<boolean>;

    try {
      if (
        isEmpty(domainModel) ||
        !domainModel.id ||
        domainModel.numeric <= 0 ||
        !isFinite(domainModel.numeric)
      ) {
        return output;
      }

      output.data = true;
    } catch (error) {
      output.error = new RError(`Failed validating Domain Model, Error: ${error.message}`);
    } finally {
      return output;
    }
  }
}

export { DomainModelValidator };
