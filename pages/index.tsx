import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import * as Realm from "realm-web"
import Header from "../components/Header"
import Container from "../components/Container"
import Hero from "../components/Hero"
import Category from "../components/Category"
import Products from "../components/Products"
import Pagination from "../components/Pagination"
import Footer from "../components/Footer"

const Home: NextPage = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const asyncEffect = async () => {
      const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID
      const app = new Realm.App({id: REALM_APP_ID})
      const credentials = Realm.Credentials.anonymous()
      try {
        const user = await app.logIn(credentials)
        const allProducts = await user.functions.getAllProducts()
        setProducts(allProducts)
      } catch (error) {
        console.error(error)
      }
    }

    asyncEffect()
  }, [])
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='bg-white w-full min-h-screen'>
        <Header />
        <Container>
          <Hero/>
          <Category
            category="Tech Wear"
            categoryCount={`${products.length} Products`}
          />
          <Products products={products} />
          <Pagination />
        </Container>
        <Footer />
      </div>
    </div>
  )
}

export default Home
