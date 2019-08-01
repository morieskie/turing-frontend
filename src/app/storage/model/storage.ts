/**
 * Created by derick on 2017/03/21.
 */
import {Injectable} from '@angular/core';

@Injectable()
export class StorageData {


    constructor() {
    }

    public static transformResponse(data: any): StorageData {
        const result: StorageData = new StorageData();
        if (data) {
            Object.keys(data).forEach(key => {
                result[key] = data[key];
            });
        }
        return result;
    }

    get toJson(): object {
        const result: object = {};
        Object.getOwnPropertyNames(this)
            .forEach(key => {
                const name = key.replace('_', '');

                result[name] = this[name];
            });
        return result;
    }
}
