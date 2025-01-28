const Userschemadb = require('../models/user');

// Update user cart
async function CartPut(req, res) {
  try {
    const updatedCartItem = req.body[0];  // Now expecting a single item
    const user = req.user;

    console.log(updatedCartItem, "data from front end delete");

    if (!user || !user.email) {
      return res.status(400).send({ message: 'User information is missing' });
    }

    const userRecord = await Userschemadb.findOne({ email: user.email });

    console.log(userRecord, "db check");

    if (userRecord) {
      // Use $pull to remove the item by _id from the cart
      await Userschemadb.updateOne(
        { email: user.email },
        { $pull: { cart: { _id: updatedCartItem._id } } }  // Correctly target the item by its ID
      );

      return res.status(200).send({ message: 'Cart updated successfully' });
    } else {
      return res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).send({ message: 'Error updating cart', error });
  }
}


module.exports = { CartPut };
