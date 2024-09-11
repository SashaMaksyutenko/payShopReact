import { createRouter } from 'next-connect'
import Product from '../../../models/Product'
import User from '../../../models/User'
import Cart from '../../../models/Cart'
import db from '../../../utils/db'
import auth from '../../../middleware/auth'
const handler = createRouter().use(auth)
handler.post(async (req, res) => {
  try {
    db.connectDb()
    console.log('Database connected!!!!')
    const { cart } = req.body
    let products = []
    let user = await User.findById(req.user)
    console.log('User found:', user)
    if (!user) {
      throw new Error('User not found')
    }
    let existing_cart = await Cart.findOne({ user: user._id })
    if (existing_cart) {
      await existing_cart.deleteOne({ user: user._id })
      console.log('Existing cart deleted')
    }
    for (let i = 0; i < cart.length; i++) {
      let dbProduct = await Product.findById(cart[i]._id).lean()
      if (!dbProduct) {
        throw new Error(`Product with ID ${cart[i]._id} not found`)
      }
      let subProduct = dbProduct.subProducts[cart[i].style]
      let tempProduct = {
        name: dbProduct.name,
        product: dbProduct._id,
        color: cart[i].color,
        image: subProduct.images[0].url,
        qty: Number(cart[i].qty),
        size: cart[i].size,
        price:
          subProduct.discount > 0
            ? (
                subProduct.sizes.find(p => p.size === cart[i].size).price -
                subProduct.sizes.find(p => p.size === cart[i].size).price *
                  (subProduct.discount / 100)
              ).toFixed(2)
            : subProduct.sizes
                .find(p => p.size === cart[i].size)
                .price.toFixed(2)
      }
      products.push(tempProduct)
    }
    let cartTotal = products.reduce(
      (total, product) => total + product.price * product.qty,
      0
    )
    await new Cart({
      products,
      cartTotal: cartTotal.toFixed(2),
      user: user._id
    }).save()
    console.log('Cart saved')
    db.disconnectDb()
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})
export default handler.handler()
