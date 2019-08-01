import {BaseModel} from '../../api/model/base.model';

export class TaxModel extends BaseModel {

  get taxId(): number {
    return this._taxId;
  }

  set taxId(value: number) {
    this._taxId = value;
  }

  get taxType(): string {
    return this._taxType;
  }

  set taxType(value: string) {
    this._taxType = value;
  }

  get taxPercentage(): string {
    return this._taxPercentage;
  }

  set taxPercentage(value: string) {
    this._taxPercentage = value;
  }
}
