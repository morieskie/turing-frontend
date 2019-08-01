import {StorageProviderInterface} from '../interface/storage-provider.interface';
import {Injectable} from '@angular/core';
import {StorageData} from '../model/storage';

@Injectable()
export class LocalStorageProvider implements StorageProviderInterface {
  public storage: Storage = localStorage;

  constructor() {
  }

  collection(): Promise<any[]> {
    return undefined;
  }

  /**
   * Create storage
   */
  public setItem(key: string, value: any): Promise<any> {

    return new Promise((resolve, reject) => {
      let data: string;
      if (typeof value === 'object' || Array.isArray(value)) {
        data = JSON.stringify(value);
      }

      this.storage.setItem(key, data);

      try {
        // console.log('this.storage.getItem(key)', this.storage.getItem(key))
        const result: any = JSON.parse(this.storage.getItem(key));
        resolve(result);
      } catch (e) {
        // console.log('this.storage.getItem(key)', this.storage.getItem(key))
        reject(e);
      }
    });
  }

  /**
   * View storage
   */
  public getItem(key: string, defaultValue?: any): Promise<any> {

    return new Promise((resolve, reject) => {
      try {
        if (!this.storage.getItem(key)) {
          return reject(new Error('Item not found: ' + key));
        }
        const store = JSON.parse(this.storage.getItem(key) || '');
        resolve(store);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Update System
   */
  public updateItem(key: string, model: any): Promise<boolean> {

    return new Promise((resolve, reject) => {
      try {
        if (!this.storage.getItem(key)) {
          return reject(new Error('Item not found'));
        }
        this.storage.setItem(key, JSON.stringify(model));
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Delete System
   */
  public removeItem(key: string): Promise<boolean> {

    return new Promise((resolve, reject) => {
      try {
        if (!this.storage.getItem(key)) {
          return reject(new Error('Item not found'));
        }
        this.storage.removeItem(key);
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  }
}
