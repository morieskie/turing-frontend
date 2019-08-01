import {Injectable} from '@angular/core';
import {AddressModel} from '../../checkout/model/address.model';
import {RestService} from '../../api/Rest.service';
import {StorageService} from '../../storage/service/storage.service';
import {Customer} from "../model/customer";

@Injectable()
export class AddressService {
  constructor(private service: RestService, private storageService: StorageService) {

  }

  update(model: AddressModel): Promise<Customer> {
    return new Promise((resolve, reject) => {
      this.service.update(`customers/address`, {
        address_1: model.address1,
        address_2: model.address2,
        city: model.city,
        region: model.region,
        country: model.country,
        postal_code: model.postalCode,
        shipping_region_id: model.shippingRegionId,
      }).subscribe(response => {
        this.storageService.getItem('currentUser')
          .then(result => {
            response.accessToken = result.accessToken;
            return response;
          })
          .then(result => {
            this.storageService.setItem('currentUser', result)
              .then(customer => resolve(customer));
          });
      });
    });
  }
}
