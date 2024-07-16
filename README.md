# Marketplacer Checkout System

This is a CLI application for a checkout system built with TypeScript for Marketplacer.

## Features

- Load a list of products from a file.
- List product details to the user.
- Add products to a shopping cart.
- Apply promotional discounts.
- Calculate and display the total cost.

1. Install dependencies:
   npm install

2. How to Run:
   npx ts-node main.ts

## Design Decisions
TypeScript: Chosen for its type safety and modern JavaScript features.
File Handling: Products are loaded from a JSON file for simplicity.
Discount Logic: Applied progressively based on the total amount in the cart.

## Testing
Ensure to write unit tests for each method in the ShoppingCart class.
Use a framework like Jest to manage and run your tests.

## Extensibility
The application is designed to be easily extended with additional features, such as removing items from the cart or loading products from an API.