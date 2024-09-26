'use client'
import CardModule from "@/components/Common/Card";
import { Product } from "@/interfaces/generalInterfaces";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setProductList } from "@/redux/features/productsSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


export default function Home() {

  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  // const products = useAppSelector(state => state.ProductsReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {

      fetch("https://localhost:7126/api/Product")
      .then((response) => response.json())
      .then((json) => {
        const localProducts = json as Product[];
        dispatch(setProductList(localProducts));        
        setProducts(json.map((p: any) => {
          return {...p, isFav: false}; 
        }));

      });

      fetch("https://localhost:7126/api/Client/1")
      .then((response) => response.json())
      .then((json) => {
        // dispatch(setProducts(json));
        const productsIds: number[] = json.map((p: { id: any; }) => {
          return p.id
        });
        
        setFavorites(productsIds);
      });
    
      
  }, []);

  function setFavorite(id: number) {
    let localProducts = {...products};
    localProducts = localProducts.map((p) => {
      if (p.id === id) {
        return {...p, isFav: !p.isFav}
      }else {
        return p;
      }
    })
    setProducts(localProducts);
  }

  return (
    <section className="">
      <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="flex justify-center text-xl" >Listado de Productos</h1>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 gap-x-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product, index) => (
              <div key={`card-${index}`}>
              <CardModule 
                id={product.id} 
                nombre={product.nombre} 
                precio={product.precio} 
                imageSrc={product.imageSrc} 
                isFav={favorites.includes(product.id)}
                // setFavorite={setFavorite}
                // favorites={favorites}
                inFavoriteView={false}
                >

              </CardModule>
              </div>
          ))}
        </div>
      </div>
    </div>
    </section>
  );
}
