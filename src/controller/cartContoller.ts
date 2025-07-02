import { CartModel } from "../models/cartModel";
import { productModel } from "../models/productModel";

interface CreateCartForUser {
  userId: string;
}

const createCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await CartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};

interface GetActiveCartForUser {
  userId: string;
}

export const getActiveCartForUser = async ({
  userId,
}: GetActiveCartForUser) => {
  let cart = await CartModel.findOne({ userId, status: "active" });
  if (!cart) {
    cart = await createCartForUser({ userId });
  }
  return cart;
};

interface AddItemToCart {
  userId: string;
  productId: any;
  quantity: string;
}
export const addItemToCart = async ({
  userId,
  productId,
  quantity,
}: AddItemToCart) => {
  let cart = await getActiveCartForUser({ userId });
  console.log("🚀 addToCart controller hit");

  console.log("🛒 cart:", cart);
  console.log("🧩 cart.items:", cart.items);
  console.log("🧪 typeof cart.items:", typeof cart.items);

  //does the item exist in the cart?
  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );
  console.log("cart.items:", cart.items);

  if (existsInCart) {
    return { data: "items already exists in cart !", statusCode: 400 };
  }
  //fetch the product
  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "product not found !", statusCode: 400 };
  }

  if (product.stock < parseInt(quantity)) {
    return { data: "low stock for item !", statusCode: 400 };
  }
  cart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity: parseInt(quantity),
  });

  //update the total amount for the cart
  cart.totalAmount += product.price * parseInt(quantity);
  const updatedCart = await cart.save();

  return {
    data: updatedCart,
    statusCode: 200,
  };
};
