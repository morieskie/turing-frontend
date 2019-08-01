import {Inject, Injectable, Optional} from '@angular/core';
import * as camelize from 'camelize';
import {isNull} from "util";

@Injectable()
export class BaseModel {
  [x: string]: any;

  constructor(@Inject('{}') @Optional()attributes?: any) {
    if (attributes) {
      Object.assign(this, this.toCamelCaseKeys(attributes));
    }
  }

  // @ts-ignore
  public static transformResponse<T>(data: T): T {
    // @ts-ignore
    Object.assign(this, this.toCamelCaseKeys(data));
    // @ts-ignore
    return this;
  }

  public toJson() {
    const data: this = {} as this;
    Object.keys(this).forEach(key => {
      const id = this.toCamelCaseKeys<string>(key);
      if (id['0'] === '_') {
        delete id['0'];
      }
      key = Object.values(id).join('');
      // console.log('key', key, 'value', this[key]);
      data[camelize(key)] = Array.isArray(this[key]) ? this[key]
        .map(item => (typeof item.toJson === 'function') ? item.toJson() : item) : this[key];
    });

    // Object.keys(this).forEach(key => {
    //   const property: string = key.replace('_', '');
    //   // console.log('json', property, this[property])
    //   data[camelize(property)] = this[property];
    // });
    return data;
  }

  toSnakeCase(skipEmpty = false): this {
    const separator = '_';
    const split = /(?=[A-Z])/;
    const data: this = {} as this;
    Object.getOwnPropertyNames(this).forEach(key => {
      const property: string = key.replace(separator, '');
      const snakeCaseKey: string = property.split(split).join(separator).toLowerCase();
      const value = this[key];
      if (skipEmpty) {
        if (!isNull(value)) {
          data[snakeCaseKey] = value;
        }
      } else {
        data[snakeCaseKey] = value;
      }
    });
    return this.toSnakeCaseKeys(data);
  }

  toSnakeCaseKeys<T>(attributes: T): T {
    const separator = '_';
    const split = /(?=[A-Z])/;
    const data: T = {} as T;
    Object.getOwnPropertyNames(attributes).forEach(key => {
      const snakeCaseKey: string = key.split(split).join(separator).toLowerCase();
      if (attributes[key] instanceof Object) {
        data[snakeCaseKey] = this.toSnakeCaseKeys(attributes[key]);
      } else if (attributes[key] instanceof Array) {
        attributes[key] = attributes[key].map(item => {
          if (item instanceof Object) {
            return this.toCamelCaseKeys(item);
          } else {
            return item;
          }
        });
      } else {
        data[snakeCaseKey] = attributes[key];
      }
    });
    return data;
  }

  toCamelCaseKeys<T>(attributes: T): T {
    const data: T = {} as T;
    Object.keys(attributes).forEach(key => {
      if (typeof this[key] === 'undefined' && key.indexOf('_') !== -1) {
        // @ts-ignore
        let  property = camelize('_' + key);
        property = property.charAt(0).toLowerCase() + property.slice(1);
        if (attributes[key] instanceof Object) {
          data[property] = this.toCamelCaseKeys(attributes[key]);
        } else if (attributes[camelize(key)] instanceof Array) {
          attributes[key] = attributes[key].map(item => {
            if (item instanceof Object) {
              return this.toCamelCaseKeys(item);
            } else {
              return item;
            }
          });
        } else {
          data[property] = attributes[key];
        }
      } else {
        // console.log('POPO')
        data[camelize(key)] = attributes[key];
        // if (attributes[key] instanceof Object) {
        //   attributes[key] = this.toCamelCaseKeys(attributes[key]);
        // } else if (attributes[key] instanceof Array) {
        //   attributes[key] = attributes[key].map(item => {
        //     if (item instanceof Object) {
        //       return this.toCamelCaseKeys(item);
        //     } else {
        //       return item;
        //     }
        //   });
        // } else {
        //   data[key] = attributes[key];
        // }
      }
    });
    return data;
  }
}
