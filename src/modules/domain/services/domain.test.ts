import moment from 'moment';

import { MainDomainService } from './domain';
import { DomainModel } from '../types/domain-model';
import { InvalidDomainInputError } from '../../common/errors';
import { DomainRepository } from '../types/repository';
import { DomainService } from '../types/service';
import { Output } from '../../common/types/output';
import { LocalDomainRepository } from '../repositories/domain';

const domainRepository: DomainRepository = new LocalDomainRepository();
const domainService: DomainService = new MainDomainService(domainRepository);

describe('GIVEN `getDomainModel` method in `MainDomainService` module', () => {
  describe('WHEN it is invoked with empty input', () => {
    it('THEN it should return invalid output', () => {
      const expectedOutput: Output<DomainService> = {
        data: null,
        error: InvalidDomainInputError,
      };

      expect(domainService.getOneDomainModel(undefined)).toEqual(expectedOutput);
      expect(domainService.getOneDomainModel(null)).toEqual(expectedOutput);
      expect(domainService.getOneDomainModel('')).toEqual(expectedOutput);
    });
  });

  describe('WHEN it is invoked with invalid input', () => {
    it('THEN it should return invalid output', () => {
      const validInput = 'invalid';
      const expectedOutput: Output<DomainModel> = {
        data: null,
      };

      expect(domainService.getOneDomainModel(validInput)).toEqual(expectedOutput);
    });
  });

  describe('WHEN it is invoked with valid input', () => {
    it('THEN it should return invalid output', () => {
      const validInput = 'valid-id';
      const expectedOutput: Output<DomainModel> = {
        data: {
          id: '1',
          dateTime: moment('2020-12-24T13:14:15.000Z'),
          numeric: 1,
        } as DomainModel,
      };

      expect(domainService.getOneDomainModel(validInput)).toEqual(expectedOutput);
    });
  });
});
