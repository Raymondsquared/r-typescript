import { DomainModel } from './domain-model';
import { Output } from '../../common/types/output';

interface DomainRepository {
  selectOneDomainModel(id: string): Output<DomainModel>;
}

export { DomainRepository };
