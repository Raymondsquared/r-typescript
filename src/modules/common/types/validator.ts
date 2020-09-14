import { Output } from './output';

// Validator interface validates T
interface Validator<T> {
  isValid(input: T): Output<boolean>;
}

export { Validator };
