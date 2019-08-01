export interface RepositoryInterface {

    collection(): Promise<any>;

    /**
     * Create item
     */
    create(model: any): Promise<any>;

    /**
     * View item
     */
    show(id: string | number): Promise<any>;

    /**
     * Update item
     */
    update(id: string | number, model: any): Promise<any>;

    /**
     * Delete item
     */
    remove(id: string | number): Promise<any>;
}
