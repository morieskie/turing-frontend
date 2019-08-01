import {Catalogue} from '../model/catalogue';

export interface CatalogueProviderInterface {
    collection(): Promise<Catalogue[]>;

    /**
     * Create Catalogue
     */
    create(catalogue: Catalogue): Promise<Catalogue>;

    /**
     * View catalogue
     */
    show(id: string | number): Promise<Catalogue>;

    /**
     * Update Catalogue
     */
    update(id: string | number, catalogue: Catalogue): Promise<boolean>;

    /**
     * Delete Catalogue
     */
    remove(id: string | number): Promise<boolean>;
}
