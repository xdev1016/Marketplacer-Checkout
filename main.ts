import * as fs from 'fs';
import * as path from 'path';

// Product interface
interface Product {
  uuid: number;
  name: string;
  price: string;
}

// CartItem interface
interface CartItem extends Product {
  quantity: number;
}

// Constants
const PRODUCTS_FILE = path.join(__dirname, 'products.json');

// Main class
class ShoppingCart {
  private products: Product[] = [];
  private cart: CartItem[] = [];

  constructor() {
    this.loadProducts();
  }

  private loadProducts() {
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
    this.products = JSON.parse(data);
  }

  public listProducts() {
    console.log('Welcome to the Marketplace.\nAvailable Products:');
    this.products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - $${product.price}`);
    });
    console.log('\n');
  }

  // Add product to cart
  public addToCart(index: number, quantity: number) {
    const product = this.products[index - 1];
    if (!product) {
      console.log('Product not found');
      return;
    }

    const cartItem = this.cart.find(item => item.uuid === product.uuid);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      this.cart.push({ ...product, quantity });
    }

    console.log(`<${product.name}> added to cart.`);
  }

  // Calculate total
  public calculateTotal() {
    let total = 0;
    this.cart.forEach(item => {
      total += parseFloat(item.price) * item.quantity;
    });

    return total;
  }

  // Apply discounts
  public applyDiscounts(total: number) {
    if (total > 100) {
      return total * 0.8;
    } else if (total > 50) {
      return total * 0.85;
    } else if (total > 20) {
      return total * 0.9;
    } else {
      return total;
    }
  }

  // Display cart
  public displayCart() {
    console.log('\nProducts in Shopping Cart:');
    this.cart.forEach(item => {
      console.log(`${item.quantity}x ${item.name} - $${item.price}`);
    });

    const total = this.calculateTotal();
    const discountedTotal = this.applyDiscounts(total);
    const discount = total - discountedTotal;

    if (discount > 0) {
      console.log(`Discount applied: $${discount.toFixed(2)} off`);
    }

    console.log(`\nTOTAL: $${discountedTotal.toFixed(2)}`);
  }
}

// Create an instance of the class
const shoppingCart = new ShoppingCart();

// Simulate user interaction
shoppingCart.listProducts();
shoppingCart.addToCart(1, 2); // Adding two items of the first product
shoppingCart.addToCart(3, 1); // Adding one item of the third product
shoppingCart.displayCart();
