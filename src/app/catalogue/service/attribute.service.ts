import {Injectable} from "@angular/core";
import {RestService} from "../../api/Rest.service";
import {AttributeModel} from "../model/attribute.model";

Injectable()

export class AttributeService {
  constructor(private client: RestService) {

  }

  getColors(): Promise<AttributeModel[]> {
    return new Promise((resolve, reject) => {
      this.client.get(`attributes/values/2`).subscribe(response => {
        resolve(response.map(item => new AttributeModel(item)));
      }, error => reject(error));
    });
  }

  getSizes(): Promise<AttributeModel[]> {
    return new Promise((resolve, reject) => {
      this.client.get(`attributes/values/1`).subscribe(response => {
        resolve(response.map(item => new AttributeModel(item)));
      }, error => reject(error));
    });
  }
}
