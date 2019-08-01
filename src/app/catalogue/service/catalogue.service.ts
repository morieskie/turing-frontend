import {Injectable} from '@angular/core';
import {Catalogue} from '../model/catalogue';
import {CatalogueRepository} from '../repository/catalogue.repository';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class CatalogueService {

  public modelSubject: Subject<Catalogue> = new Subject<Catalogue>();

  public model: Catalogue;
  public models: Catalogue[];

  constructor(private repository: CatalogueRepository) {
  }

  public get collection() {
    this.repository
      .collection()
      .then(models => this.models = models);
    return this.models;
  }

  public create(model: Catalogue): Catalogue {
    this.repository
      .create(model)
      .then(result => this.model = result);
    return this.model;
  }

  public show(id: string | number): Catalogue {
    this.repository
      .show(id)
      .then(result => this.model = result);
    return this.model;
  }

  public update(id: string | number, model: Catalogue): Promise<boolean> {
    return this.repository.update(id, model);
  }

  public remove(id: string | number): Promise<boolean> {
    return this.repository.remove(id);
  }

  public getCatalogueObservable(): Observable<Catalogue> {
    return this.modelSubject.asObservable();
  }
}
