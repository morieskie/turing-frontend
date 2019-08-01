import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {CatalogueItem} from './model/catalogue-item';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-product-gallery',
  templateUrl: './template/product-gallery.component.html',
  styleUrls: [],
})
export class ProductGalleryComponent implements OnInit, AfterViewInit {

  @Input()
  public model: CatalogueItem;
  public productImageFolder = `${environment.paths.catalogueImagesPath}`;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.log('ProductGallery.ngAfterViewInit');
    // @ts-ignore
    window.initGallery();
    // @ts-ignore
    const jQuery = window.jQuery;
    const productCorousel = jQuery('.product-carousel');

    productCorousel.owlCarousel({
      items: 1,
      loop: !1,
      dots: !1,
      URLhashListener: !0,
      startPosition: 'URLHash',
      onTranslate(b) {
        const itemIndex = b.item.index;
        const itemHash = jQuery('.owl-item').eq(itemIndex).find('[data-hash]').attr('data-hash');

        jQuery('.product-thumbnails li').removeClass('active');
        jQuery('[href="#' + itemHash + '"]').parent().addClass('active');
        jQuery('.gallery-wrapper .gallery-item').removeClass('active');
        jQuery('[data-hash="' + itemHash + '"]').parent().addClass('active');
      }
    });
  }
}
