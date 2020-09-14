import { RError } from './types/error';

const InvalidApplicationInputError = new RError('Invalid Application Input Error', 600, 400);
const InvalidDomainInputError = new RError('Invalid Domain Input Error', 601, 400);
const InvalidRepositoryInputError = new RError('Invalid Repository Input Error', 602, 400);

export { InvalidApplicationInputError, InvalidDomainInputError, InvalidRepositoryInputError };
