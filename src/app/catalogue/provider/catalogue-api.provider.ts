import {CatalogueProviderInterface} from '../interface/catalogue-provider.interface';
import {Catalogue} from '../model/catalogue';
import {Injectable} from '@angular/core';
import {RestService} from '../../api/Rest.service';

@Injectable()
export class CatalogueApiProvider implements CatalogueProviderInterface {

    public endpoint = 'products';
    public model: Promise<Catalogue> = Promise.resolve<Catalogue>(null);
    public models: Promise<Catalogue[]> = Promise.resolve<Catalogue[]>(null);

    constructor(private client: RestService) {
    }

    collection(): Promise<Catalogue[]> {
        // throw new Error("Method not implemented.");
        const data: Catalogue[] = [{
            id: 'ABC',
            name: 'ABC',
            description: 'ABC',
            items: null
        }];

        return Promise.resolve(data);
    }

    /**
     *
     */
    public create(model: Catalogue): Promise<Catalogue> {
        this.client
            .create(`${this.endpoint}`, model)
            .subscribe(response => {
                const data: Catalogue = response.body.data;
                this.model = Promise.resolve(data);
            });

        return this.model;
    }

    /**
     * View catalogue
     */
    public show(id: string | number): Promise<Catalogue> {
        this.client
            .get(`${this.endpoint}/${id}`)
            .subscribe(response => {
                const data: Catalogue = response.body.data;
                this.model = Promise.resolve(data);
            });

        return this.model;
    }

    /**
     * Update Catalogue
     */
    public update(id: string | number, model: Catalogue): Promise<boolean> {

        return new Promise((resolve, reject) => {
            this.client
                .update(`${this.endpoint}/${id}`, model)
                .subscribe(response => {
                    const data: Catalogue = response.body.data;
                    let result = false;
                    if (data) {
                        result = true;
                    }
                    resolve(result);
                });

        });
    }

    /**
     * Delete Catalogue
     */
    public remove(id: string | number): Promise<boolean> {

        return new Promise((resolve, reject) => {
            this.client
                .delete(`${this.endpoint}/${id}`)
                .subscribe(response => {
                    let result = false;
                    if (response) {
                        result = true;
                    }
                    resolve(result);
                });

        });
    }
}
