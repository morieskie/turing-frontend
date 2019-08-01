import {CatalogueItem} from './catalogue-item';

export class Catalogue {
    [x: string]: any;

    constructor() {
    }

    public get id(): string | number {
        return this._id;
    }

    public set id(value) {
        this._id = value;
    }

    public get name(): string | number {
        return this._name;
    }

    public set name(value) {
        this._name = value;
    }

    public get description(): string | number {
        return this._description;
    }

    public set description(value) {
        this._description = value;
    }

    public get items(): CatalogueItem[] {
        return this._items;
    }

    public set items(values: CatalogueItem[]) {
        this._items = values;
    }
}
