import {Inject, Injectable} from '@angular/core';
import {StorageData} from '../model/storage';
import {StorageProviderInterface} from '../interface/storage-provider.interface';
import {StorageProvider} from '../../app.config';

@Injectable()
export class StorageRepository {
  public model: Promise<any>;

  constructor(@Inject(StorageProvider) private provider: StorageProviderInterface) {
  }

  setItem(key, model: StorageData): Promise<any> {
    return this.model = this.provider.setItem(key, model);
  }

  getItem(key: string, defaultValue?: any): Promise<any> {
    return this.model = this.provider.getItem(key, defaultValue);
  }

  updateItem(key: string, model: any): Promise<any> {
    return this.provider.updateItem(key, model);
  }

  removeItem(key: string): Promise<any> {
    return this.provider.removeItem(key);
  }

}
