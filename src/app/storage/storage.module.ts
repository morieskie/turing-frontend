import {NgModule} from '@angular/core';
import {StorageService} from './service/storage.service';
import {StorageRepository} from './repository/storage.repository';
import {LocalStorageProvider} from './provider/local-storage-provider.service';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    StorageService,
    StorageRepository,
    LocalStorageProvider,
  ]
})

export class StorageModule {
}
