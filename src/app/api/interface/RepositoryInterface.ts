export interface RepositoryInterface {

  collection(): Promise<any>;

  create(model: any): Promise<any>;

  show(id: string | number): Promise<any>;

  update(id: string | number, model: any): Promise<boolean|any>;

  remove(id: string | number): Promise<boolean|any>;
}
