import {BaseModel} from '../../api/model/base.model';

export class AttributeModel extends BaseModel {

  get attributeValueId(): number {
    return this._attributeValueId;
  }

  set attributeValueId(value: number) {
    this._attributeValueId = value;
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }
}
