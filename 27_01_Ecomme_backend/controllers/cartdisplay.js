const Image = require('../models/product');
const User = require('../models/user');

async function CartGet(req, res) {
  try {
    const user = req.user;
    if (!user || !user.email) {
      return res.status(400).send({ message: 'User information is missing' });
    }

    const check = await User.findOne({ email: user.email });
    console.log(check, 'for cart display');

    if (check) {
      console.log(check.cart, "check cart");

      // Fetch the list of products from the product collection
      const productcart = await Image.find();
      console.log(productcart, "product list");

      // Extract product IDs from the user's cart
      const productIdsInCart = check.cart.map(item => item._id.toString());

      // Filter products from the database that match the cart items
      const validProducts = productcart.filter(product => 
        productIdsInCart.includes(product._id.toString())
      );

      console.log(validProducts, 'filtered valid products');

      // Filter out invalid products from the user's cart
      const correctCart = check.cart.filter(cartItem => 
        validProducts.some(product => 
          product._id.toString() === cartItem._id.toString()
        )
      );

      // Check for unavailable products
      const unavailableProducts = check.cart.filter(cartItem => 
        !validProducts.some(product => 
          product._id.toString() === cartItem._id.toString()
        )
      );

      // If there are unavailable products, return them as well
      if (unavailableProducts.length > 0) {
        return res.status(200).send({
          cart: correctCart,
          unavailableProducts: unavailableProducts
        });
      }

      // If valid products are found, send them as the cart details
      return res.status(200).send({ cart: correctCart });
    } else {
      return res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).send({ message: 'Error fetching cart', error });
  }
}

module.exports = { CartGet };
