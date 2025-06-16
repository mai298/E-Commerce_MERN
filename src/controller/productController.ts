import { productModel } from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  const products = [
    {
      title: "Wireless Bluetooth Headphones",
      image: "https://example.com/images/headphones.jpg",
      price: 60,
      stock: 25,
    },
    {
      title: "Men's Casual T-Shirt",
      image: "https://example.com/images/tshirt.jpg",
      price: 20,
      stock: 50,
    },
    {
      title: "Smartphone 128GB",
      image: "https://example.com/images/smartphone.jpg",
      price: 700,
      stock: 10,
    },
    {
      title: "Running Shoes",
      image: "https://example.com/images/running_shoes.jpg",
      price: 90,
      stock: 30,
    },
    {
      title: "Laptop 15-inch 16GB RAM",
      image: "https://example.com/images/laptop.jpg",
      price: 1000,
      stock: 8,
    },
    {
      title: "Stainless Steel Water Bottle",
      image: "https://example.com/images/water_bottle.jpg",
      price: 25,
      stock: 40,
    },
    {
      title: "Wireless Mouse",
      image: "https://example.com/images/mouse.jpg",
      price: 30,
      stock: 60,
    },
    {
      title: "Backpack for Travel",
      image: "https://example.com/images/backpack.jpg",
      price: 50,
      stock: 20,
    },
    {
      title: "LED Desk Lamp",
      image: "https://example.com/images/desk_lamp.jpg",
      price: 35,
      stock: 15,
    },
    {
      title: "Portable Power Bank 10000mAh",
      image: "https://example.com/images/power_bank.jpg",
      price: 40,
      stock: 35,
    },
  ];

  const existProducts = await getAllProducts();
  if (existProducts.length === 0) {
    await productModel.insertMany(products);
  }
};
