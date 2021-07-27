const Cart = require('../models/cart');

exports.addItemToCart = async (req, res) => {

    //  console.log(req.body.cartItem[0].product)

    Cart.findOne({ user: req.user._id })
        .then(cart => {
            if (cart) {
                //if cart alredy exists for particular user update it

                const item = cart.cartItems.find(c => c.product == req.body.cartItems.product)
                let condition, update;


                if (item) {
                    condition = { user: req.user._id, "cartItems.product": req.body.cartItems.product },
                        update = {
                            "$set": {
                                "cartItems.$": {
                                    ...req.body.cartItems,
                                    quantity: item.quantity + req.body.cartItems.quantity
                                }
                            }
                        }

                }

                else {
                    condition = { user: req.user._id }
                    update = {
                        "$push": {
                            "cartItems": req.body.cartItems
                        }
                    }

                }

                Cart.findOneAndUpdate(condition, update, { new: true })
                    .then(_cart => { return res.status(201).json(_cart) })
                    .catch(err => { return res.status(400).json(err) })


            }


            else {
                const cart = new Cart({
                    user: req.user._id,
                    cartItems: [req.body.cartItems]
                })
                cart.save()
                    .then(cart => {
                        return res.status(200).json({
                            cart: cart
                        })

                    })
                    .catch(err => {
                        return res.status(400).json({ err: err, msg: 'fail' })
                    })
            }
        })


}

