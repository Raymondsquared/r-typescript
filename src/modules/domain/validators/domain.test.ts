import moment from 'moment';

import { DomainModelValidator } from './domain';
import { DomainModel } from '../types/domain-model';
import { Output } from '../../common/types/output';
import { Validator } from '../../common/types/validator';

const domainModelValidtor: Validator<DomainModel> = new DomainModelValidator();

describe('GIVEN `isValid` method in `DomainModelValidator` module', () => {
  describe('WHEN it is invoked with empty input', () => {
    it('THEN it should return invalid output', () => {
      const expectedOutput: Output<boolean> = {
        data: false,
      };
      expect(domainModelValidtor.isValid(undefined)).toEqual(expectedOutput);
      expect(domainModelValidtor.isValid(null)).toEqual(expectedOutput);
    });
  });

  describe('WHEN it is invoked with invalid input', () => {
    it('THEN it should return invalid output', () => {
      const invalidEmptyIdInput: DomainModel = {
        id: '',
        dateTime: moment(),
        numeric: 1,
      };
      const expectedOutput: Output<boolean> = {
        data: false,
      };
      expect(domainModelValidtor.isValid({} as DomainModel)).toEqual(expectedOutput);
      expect(domainModelValidtor.isValid(invalidEmptyIdInput)).toEqual(expectedOutput);
    });
  });

  describe('WHEN it is invoked with invalid numeric input', () => {
    it('THEN it should return invalid output', () => {
      const invalidNegativeNumericInput: DomainModel = {
        id: 'id',
        dateTime: moment(),
        numeric: -1,
      };
      const invalidZeroNumericInput: DomainModel = {
        id: 'id',
        dateTime: moment(),
        numeric: 0,
      };
      const invalidInfiniterNumericInput: DomainModel = {
        id: 'id',
        dateTime: moment(),
        numeric: Infinity,
      };
      const expectedOutput: Output<boolean> = {
        data: false,
      };
      expect(domainModelValidtor.isValid(invalidNegativeNumericInput)).toEqual(expectedOutput);
      expect(domainModelValidtor.isValid(invalidZeroNumericInput)).toEqual(expectedOutput);
      expect(domainModelValidtor.isValid(invalidInfiniterNumericInput)).toEqual(expectedOutput);
    });
  });

  describe('WHEN it is invoked with valid input', () => {
    it('THEN it should return invalid output', () => {
      const validInput: DomainModel = {
        id: 'id',
        dateTime: moment(),
        numeric: 1,
      };
      const expectedOutput: Output<boolean> = {
        data: true,
      };
      expect(domainModelValidtor.isValid(validInput)).toEqual(expectedOutput);
    });
  });
});
