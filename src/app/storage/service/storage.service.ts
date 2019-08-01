import {Injectable} from '@angular/core';
import {StorageRepository} from '../repository/storage.repository';

@Injectable()
export class StorageService {

  constructor(private repository: StorageRepository) {
  }

  setItem(key: string, value: any) {
    return this.repository.setItem(key, value);
  }

  getItem(key: string, defaultValue?: any) {
    return this.repository.getItem(key, defaultValue);
  }

  async updateItem(key: string, value: any) {
    return this.repository.updateItem(key, value);
  }

  removeItem(key: string) {
    return this.repository.removeItem(key);
  }

}
