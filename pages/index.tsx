import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import * as Realm from "realm-web"

const Home: NextPage = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const asyncEffect = async () => {
      const REALM_APP_ID = "application-0-mvksw"
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

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        {products && products.map((product: any) => {
          return <p key={product._id}>{product.name}</p>
        })}
      </main>
    </div>
  )
}

export default Home
