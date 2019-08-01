export interface StorageProviderInterface {
    /**
     * Create Storage
     */
    setItem(key: string, model: any): Promise<any>;

    /**
     * View StorageData
     */
    getItem(key: string, defaultValue?: any): Promise<any>;

    /**
     * Update StorageData
     */
    updateItem(key: string, model: any): Promise<boolean>;

    /**
     * Delete StorageData
     */
    removeItem(id: string): Promise<boolean>;
}
