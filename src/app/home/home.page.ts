import { Component } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private KEY_PRODUCT = 'product';

  public product: {
    name: string,
    quantity: number
  }

  constructor() {
    // Producto inicial
    this.product = {
      name: 'Producto 1',
      quantity: 0
    }
  }

  async ionViewWillEnter() {

    // Comprobamos si existe el producto guardado
    const product = await Preferences.get({
      key: this.KEY_PRODUCT
    });

    // Sino existe lo creo
    if (!product.value) {
      this.saveProduct();
    } else {
      // Lo obtengo
      this.product = JSON.parse(product.value);
    }

  }

  decrement() {
    // Actualizo el objeto
    this.product.quantity--;
    // Guardo el producto
    this.saveProduct();
  }

  increment() {
    // Actualizo el objeto
    this.product.quantity++;
    // Guardo el producto
    this.saveProduct();
  }

  reset() {
    // Actualizo el objeto
    this.product = {
      name: 'Producto 1',
      quantity: 0
    }
    // Guardo el producto
    this.saveProduct();
  }

  async saveProduct() {
    // Debemos pasar el objeto a string
    await Preferences.set({
      key: this.KEY_PRODUCT,
      value: JSON.stringify(this.product)
    });
  }

}
