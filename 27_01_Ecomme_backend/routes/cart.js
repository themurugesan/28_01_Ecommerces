const User = require("../models/user");

const CartDetails = async (req, res) => {
  try {
    const updatedCart = req.body;
    const user = req.user;

    if (!user || !user.email) {
      return res.status(400).send({ message: "User information is missing" });
    }

    console.log(user);
   console.log(updatedCart, "updatecart");

    const check = await User.findOne({ email: user.email });
    console.log(check ,"chexx")

    if (check) {
      check.cart = updatedCart;
      const savedUser = await check.save();
      return res.status(200).send({ message: "Cart item added successfully", user: savedUser });
    } else {
      return res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error adding cart:", error);
    res.status(500).send({ message: "Error adding cart item", error });
  }
};

module.exports = CartDetails;
