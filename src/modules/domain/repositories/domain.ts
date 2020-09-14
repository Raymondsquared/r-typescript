import moment from 'moment';

import { DomainModelValidator } from '../validators/domain';
import { DomainModel } from '../types/domain-model';
import { InvalidRepositoryInputError } from '../../common/errors';
import { RError } from '../../common/types/error';
import { Output } from '../../common/types/output';
import { DomainRepository } from '../types/repository';
import { Validator } from '../../common/types/validator';

class LocalDomainRepository implements DomainRepository {
  _domainValidator: Validator<DomainModel>;
  _data: DomainModel[];

  constructor() {
    this._domainValidator = new DomainModelValidator();
    this._data = [
      {
        id: '1',
        dateTime: moment('2020-12-24T13:14:15.000Z'),
        numeric: 1,
      },
    ] as DomainModel[];
  }

  selectOneDomainModel(id: string): Output<DomainModel> {
    const output = {
      data: null,
    } as Output<DomainModel>;

    try {
      if (!id) {
        output.error = InvalidRepositoryInputError;
        return output;
      }

      // TODO: Proper filter need to be done here
      if (id === 'valid-id') {
        output.data = this._data[0];
      }
    } catch (error) {
      output.error = new RError(`Failed selecting one domain model, Error: ${error}`);
    } finally {
      return output;
    }
  }
}

export { LocalDomainRepository };
