// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const calculatedEachCartItemTotalPriceList = cartList.map(
        each => each.quantity * each.price,
      )
      const totalPrice = calculatedEachCartItemTotalPriceList.reduce(
        (acc, curr) => acc + curr,
        0,
      )
      return (
        <div className="cartSummary-container">
          <h2 className="orderTotal-heading">
            Order Total:{' '}
            <span className="totalPrice-style">Rs {totalPrice}/-</span>
          </h2>
          <p className="noOfItemsInCart">{cartList.length} items in cart</p>
          <button type="button" className="checkOut-button">
            CheckOut
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
