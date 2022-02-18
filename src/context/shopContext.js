import React, { Component } from 'react'
import Client from 'shopify-buy'

const ShopContext = React.createContext()
const client = Client.buildClient({
    domain: 'shop-for-learn-by-lb.myshopify.com',
    storefrontAccessToken: '6ee659e33a2fa2c93b9389cc6c061e5a'
})
class ShopProvider extends Component {

    state = {
        products: [],
        product: {},
        checkout: {},
        isCartOpen: false,
        test: 'test'
    }

    componentDidMount() {
        //Check if localStotage has a checkout_id saved
        if (localStorage.checkout_id) {
            this.fetchCheckout(localStorage.checkout_id)
        } else {
            this.createCheckout()
        }
    }

    createCheckout = async () => {
        const checkout = await client.checkout.create()
        localStorage.setItem("checkout_id", checkout.id)
        await this.setState({ checkout: checkout })
    }

    fetchCheckout = async (checkoutId) => {
        client.checkout.fetch(checkoutId).then(checkout => {
            this.setState({ checkout: checkout })
        }).catch( err => console.log(err))
    }

    addItemToCheckout = async (variantId, quantity) => {
        const lineItemsToAdd = [{
            variantId,
            quantity: parseInt(quantity, 10)
        }]

        const checkout = await client.checkout.addLineItems(this.state.checkout.id, lineItemsToAdd)
        this.setState({ checkout: checkout })
    }

    fetchAllProducts = async () => {
        const products = await client.product.fetchAll()
        this.setState({ products: products })
    }

    fetchProductWithId = async (id) => {
        const product = await client.product.fetch(id)
        this.setState({ product: product })
    }

    closeCart = () => { this.setState({ isCartOpen: false }) }
    openCart = () => { this.setState({ isCartOpen: true}) }


  render() {
    return (
      <ShopContext.Provider value= {{
          ...this.state,
          fetchAllProducts: this.fetchAllProducts,
          fetchProductWithId: this.fetchProductWithId,
          closeCart: this.closeCart,
          openCart: this.openCart,
          addItemToCheckout: this.addItemToCheckout
          }} >
          {this.props.children}
      </ShopContext.Provider>
    )
  }
}

const ShopConsumer = ShopContext.Consumer

export { ShopConsumer, ShopContext }
export default ShopProvider
