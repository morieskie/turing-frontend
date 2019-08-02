import {Injectable} from '@angular/core';
import {RestService} from '../../api/Rest.service';
import {StorageService} from '../../storage/service/storage.service';
import {ShippingRegion} from '../model/shipping-region';
import {BehaviorSubject} from 'rxjs';
import {ShippingModel} from '../model/shipping.model';

@Injectable()
export class ShippingMethodService {
  public shippingMethodSubject: BehaviorSubject<ShippingModel> = new BehaviorSubject<ShippingModel>(new ShippingModel());

  constructor(private restService: RestService, private storageService: StorageService) {
  }

  getShipping(shippingId: number): Promise<ShippingModel> {
    return new Promise<ShippingModel>((resolve, reject) => {
      this.restService.get(`shipping/${shippingId}`).subscribe(result => {
        resolve(new ShippingModel(result));
      }, error => reject(error));
    });
  }

  getShippingRegions(shippingRegionId: number): Promise<ShippingRegion[]> {
    console.log('shippingRegionId:', shippingRegionId);
    return new Promise((resolve, reject) => {

      this.restService.get(`shipping/regions/${shippingRegionId}`)
        .subscribe(response => {
          const shippingOptions: ShippingRegion[] = response.map(item => {
            const shippingRegion: ShippingRegion = new ShippingRegion(item).toJson();
            const regexp = new RegExp(/((?<type>[a-zA-Z0-9\ ]+)\((?<duration>[a-zA-Z0-9\_\-\ ]+)\,(?<cost>[a-zA-Z0-9\_\-\$\ ]+)\))/);
            const regexp2 = new RegExp(/((?<duration>[a-zA-Z0-9\_\-\ ]+)|\ (?<type>[a-zA-Z0-9\ ]+)\((?<cost>[a-zA-Z0-9\_\-\$\ ]+)\))/);
            const pieces = shippingRegion.shippingType.match(regexp);
            const pieces2 = shippingRegion.shippingType.match(regexp2);

            if (pieces) {
              shippingRegion.deliveryMethod = pieces.groups.type;
              shippingRegion.deliveryDuration = pieces.groups.duration;
            } else if (pieces2) {
              shippingRegion.deliveryMethod = pieces2.groups.type || '-';
              shippingRegion.deliveryDuration = pieces2.groups.duration;
            }

            return shippingRegion;
          });
          this.storageService.setItem('shippingOptions', shippingOptions.map(item => new ShippingRegion(item).toJson()))
            .then(result => resolve(shippingOptions));
        });
    });
  }

  getShippingMethodObservable() {
    return this.shippingMethodSubject.asObservable();
  }

}
