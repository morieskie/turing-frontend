import {RepositoryInterface} from '../../api/interface/RepositoryInterface';
import {Catalogue} from '../model/catalogue';
import {CatalogueProviderInterface} from '../interface/catalogue-provider.interface';
import {Inject} from '@angular/core';
import {CatalogueProvider} from '../../app.config';

export class CatalogueRepository implements RepositoryInterface {
    public model: Promise<Catalogue> = Promise.resolve<Catalogue>(null);

    constructor(@Inject(CatalogueProvider) private provider: CatalogueProviderInterface) {
    }

    public collection(): Promise<Catalogue[]> {
        return this.provider.collection();
    }

    /**
     * Create Catalogue
     */
    public create(model: Catalogue): Promise<Catalogue> {
        return this.model = this.provider.create(model);
    }

    /**
     * View Catalogue
     */
    public show(id: string | number): Promise<Catalogue> {
        return this.model = this.provider.show(id);
    }

    /**
     * Update Catalogue
     */
    public update(id: string | number, model: Catalogue): Promise<boolean> {
        return this.provider.update(id, model);
    }

    /**
     * Delete Catalogue
     */
    public remove(id: string | number): Promise<boolean> {
        return this.provider.remove(id);
    }
}
