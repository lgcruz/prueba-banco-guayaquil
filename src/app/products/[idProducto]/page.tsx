/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    theme: {
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
'use client'
import isEmpty from 'lodash/isEmpty';
import { useEffect, useState } from 'react';

import HeartIcon from '@/components/Icons/HeartIcon';
import { Product } from '@/interfaces/generalInterfaces';
import HeartFullIcon from '@/components/Icons/HeartFullIcon';


export default function Page({
    params: { idProducto },
}: {
    params: { idProducto: string };
}) {
    const [product, setProduct] = useState<Product>();
    const [isFav, setIsFav] = useState<boolean>(false);

  useEffect(() => {
    fetch(`https://localhost:7126/api/Product/${idProducto}`)
    .then((response) => response.json())
      .then((json) => {
        setProduct(json)
      });
  }, []);

  useEffect(() => {
    if (!isEmpty(product)) {
      fetch(`https://localhost:7126/api/Client/1`)
      .then((response) => response.json())
        .then((json) => {
          const productsIds = json.map((p: { id: any; }) => {
            return p.id
          })
          setIsFav(productsIds.includes(product?.id))
        });
    }
  }, [product])

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            
            <li className="text-sm">
              <div className="font-medium text-gray-500 hover:text-gray-600">
                {product?.nombre}
              </div>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              alt={product?.nombre}
              src={product?.imageSrc}
              className="h-full w-full object-cover object-center"
            />
          </div>
          {/* <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                alt={product.images[1].alt}
                src={product.images[1].src}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                alt={product.images[2].alt}
                src={product.images[2].src}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div> */}
          {/* <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              alt={product.images[3].alt}
              src={product.images[3].src}
              className="h-full w-full object-cover object-center"
            />
          </div> */}
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product?.nombre}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">${product?.precio.toFixed(2)}</p>

            <form className="flex justify-center items-center">
              
              <button
                type="submit"
                className="mt-10 flex w-auto items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                { isFav ? <HeartFullIcon width={40} height={40} /> : <HeartIcon width={40} height={40} />}
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product?.descripcion}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
