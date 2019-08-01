import {Injectable} from '@angular/core';
import {RestService} from '../../api/Rest.service';
import {StorageService} from '../../storage/service/storage.service';
import {ShippingRegion} from '../model/shipping-region';

@Injectable()
export class ShippingRegionService {
  constructor(private restService: RestService, private storageService: StorageService) {
  }

  getShippingRegions(): Promise<ShippingRegion[]> {
    return new Promise((resolve, reject) => {
      this.storageService.getItem('shippingRegions')
        .then(result => resolve(result.map(item => new ShippingRegion(item))))
        .catch(error => {
          this.restService.get('shipping/regions')
            .subscribe(response => {
              this.storageService.setItem('shippingRegions', response.map(item => new ShippingRegion(item).toJson()))
                .then(result => resolve(result));
            }, e => reject(e));
          reject(error);
        });
    });
  }
}
