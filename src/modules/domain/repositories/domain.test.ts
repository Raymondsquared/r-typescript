import moment from 'moment';

import { LocalDomainRepository } from './domain';
import { DomainModel } from '../types/domain-model';
import { InvalidRepositoryInputError } from '../../common/errors';
import { Output } from '../../common/types/output';
import { DomainRepository } from '../types/repository';

const domainRepository: DomainRepository = new LocalDomainRepository();

describe('GIVEN `selectOneDomainModel` method in `LocalDomainRepository` module', () => {
  describe('WHEN it is invoked with empty input', () => {
    it('THEN it should return invalid output', () => {
      const expectedOutput: Output<DomainModel> = {
        data: null,
        error: InvalidRepositoryInputError,
      };

      expect(domainRepository.selectOneDomainModel(undefined)).toEqual(expectedOutput);
      expect(domainRepository.selectOneDomainModel(null)).toEqual(expectedOutput);
      expect(domainRepository.selectOneDomainModel('')).toEqual(expectedOutput);
    });
  });

  describe('WHEN it is invoked with invalid input', () => {
    it('THEN it should return valid output', () => {
      const invalidInput = 'invalid';
      const expectedOutput: Output<DomainModel> = {
        data: null,
      };

      expect(domainRepository.selectOneDomainModel(invalidInput)).toEqual(expectedOutput);
    });
  });

  describe('WHEN it is invoked with valid input', () => {
    it('THEN it should return valid output', () => {
      const validInput = 'valid-id';
      const expectedOutput: Output<DomainModel> = {
        data: {
          id: '1',
          dateTime: moment('2020-12-24T13:14:15.000Z'),
          numeric: 1,
        } as DomainModel,
      };

      expect(domainRepository.selectOneDomainModel(validInput)).toEqual(expectedOutput);
    });
  });
});
