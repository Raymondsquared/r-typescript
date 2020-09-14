import { DomainModel } from './domain-model';
import { Output } from '../../common/types/output';

interface DomainService {
  getOneDomainModel(id: string): Output<DomainModel>;
}

export { DomainService };
