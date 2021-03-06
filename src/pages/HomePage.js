import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/shopContext'
import { Container, Text, Div, Row, Col } from 'atomize'
import { Link } from 'react-router-dom'
import ReactGA from 'react-ga4';

ReactGA.initialize("G-Z8CYZLE3Y4");
ReactGA.send({ hitType: "pageview", page: "/homepage" });
const HomePage = () => {

  const { fetchAllProducts, products } = useContext(ShopContext)
  
  useEffect(()=>{
      fetchAllProducts()
      return() => {

      }
  }, [fetchAllProducts])

  if(!products) return <div>loading</div>
  return (
    <Container>
        <Row>
            {products.map( product => (
                <Col key={product.id} size="4">
                    <Link to = {`/product/${product.id}`}>
                        <Div p="2rem">
                            <Div 
                                h="20rem"
                                bgImg={product.images[0].src}
                                bgSize = "cover"
                                bgPos = "center center"
                            />
                            <Text>{product.title}</Text>
                            <Text>${product.variants[0].price}</Text>
                        </Div>
                    </Link>
                </Col>
            ))}
        </Row>
    </Container>
  )
}

export default HomePage