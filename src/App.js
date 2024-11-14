import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedIncrementQuantityCartList = cartList.map(eachProduct => {
      if (eachProduct.id === id) {
        return {...eachProduct, quantity: eachProduct.quantity + 1}
      }
      return eachProduct
    })
    this.setState({cartList: updatedIncrementQuantityCartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedDecrementQuantityCartList = cartList
      .map(eachProduct => {
        if (eachProduct.id === id) {
          if (eachProduct.quantity > 1) {
            return {...eachProduct, quantity: eachProduct.quantity - 1}
          }
          return null
        }
        return eachProduct
      })
      .filter(product => product !== null)

    this.setState({cartList: updatedDecrementQuantityCartList}, () => {
      // Check if cart is empty after updating state and update heading if needed
      if (cartList.length === 0) {
        this.setState({cartList: []})
      }
    })
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachProduct => eachProduct.id !== id,
    )
    this.setState({cartList: updatedCartList})
  }

  addCartItem = product => {
    //   this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    //   TODO: Update the code here to implement addCartItem

    const {cartList} = this.state
    if (cartList.length === 0) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else if (cartList.some(eachProduct => eachProduct.id === product.id)) {
      const updatedQuantityOfCartList = cartList.map(eachProduct => {
        if (eachProduct.id === product.id) {
          return {
            ...eachProduct,
            quantity: eachProduct.quantity + product.quantity,
          }
        }
        return eachProduct // Return the unchanged product
      })
      this.setState({cartList: updatedQuantityOfCartList})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
