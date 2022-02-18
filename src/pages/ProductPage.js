import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/shopContext';
import { Text, Div, Button, Row, Col, Container } from 'atomize'

import ReactGA from 'react-ga4';

ReactGA.initialize("G-Z8CYZLE3Y4");
ReactGA.send({ hitType: "pageview", page: "/productPage" });

const ProductPage = () => {

    let { id } = useParams();
    const { fetchProductWithId, addItemToCheckout, openCart, product } = useContext(ShopContext)
    useEffect(() => {
        fetchProductWithId(id)
      return () => {
      }
    }, [fetchProductWithId, id])
    if (!product.title) return <div>Loading</div>
  return (
    <Container>
        <Row>
            <Col>
                <Div bgImg={product.images[0].src} bgSize="cover" bgPos="center center" h="40rem" />
            </Col>
            <Col>
                <Text>{product.title}</Text>
                <Text>${product.variants[0].price}</Text>
                <Button onClick={()=> {
                    addItemToCheckout(product.variants[0].id, 1)
                    openCart()
                    }}>
                        Add To Cart
                </Button>
            </Col>
        </Row>
    </Container>
  )
}

export default ProductPage