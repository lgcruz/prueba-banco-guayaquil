'use client'
import CardModule from "@/components/Common/Card";
import ChevronArrowDown from "@/components/Icons/ChevronArrowDown";
import ChevronArrowUp from "@/components/Icons/ChevronArrowUp";
import { Product } from "@/interfaces/generalInterfaces";
import { useEffect, useState } from "react";

// interface SortOption {
//   name: 'NAME'|'PRICE'|'DATE'|'NONE';
// }
enum SortOption { 
  NAME ='Nombre',
  PRICE='Precio',
  NONE='Defecto'
}
// const typeOption = typeof 'NAME'|'PRICE'|'DATE'|'NONE'

export default function Page() {

  const [products, setProducts] = useState<Product[]>([]);
  const [optionSort, setOptionSort] = useState<SortOption>(SortOption.NONE);
  const [optionList] = useState<SortOption[]>(Object.values(SortOption));
  const [orientation, setOrientation] = useState(true);

  useEffect(() => {
      fetch(`https://localhost:7126/api/Client/${1}`)
      .then((response) => response.json())
      .then((json) => {
        setProducts(json);
    });

      
  }, []);

  function orderBy(option: SortOption) {
    
    const sorted = products.sort((a, b) => {
      switch( option) {
        case SortOption.NAME:
          return orientation ? a.nombre.localeCompare(b.nombre): b.nombre.localeCompare(a.nombre);
        case SortOption.PRICE:
          return orientation ? a.precio - b.precio : b.precio - a.precio;
        // case SortOption.NONE:
        //   return a.id - b.id;
        default:
          return orientation ? a.id - b.id: b.id - a.id;
      }
      
    });
    setProducts([...sorted]);
  }

  useEffect(() => {
    orderBy(optionSort);
  }, [optionSort, orientation]);

  return (
    <section className="">
      <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h1 className="flex justify-center text-xl" >Productos Favoritos</h1>
        <div className="flex items-center">
          <label>{"Ordernar Por:"}</label>
          <select onChange={(e) => {
            console.log(e.target.value);
            setOptionSort(e.target.value as SortOption);
            
          }}
          className="p-2"
            defaultValue={optionSort}>
            {optionList.map((option, index) => {
              return (
                <option key={`option-${index}`} value={option}>{option.toLowerCase()}</option>
              );
            })}
          
          </select>
          
          <button onClick={() => {
            setOrientation(!orientation);
          }}
            className="ml-4 flex items-center">
              <label className="ml-4">{orientation ? "Ascendente": "Descendente"}</label>
              <div className="ml-2">
          {orientation ? <ChevronArrowUp width={12} height={12} /> : <ChevronArrowDown width={12} height={12} />}
          </div>
          </button>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 gap-x-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product,index) => (
            <div key={`prod-${index}`}>
              <CardModule 
                id={product.id} 
                nombre={product.nombre} 
                precio={product.precio} 
                imageSrc={product.imageSrc} 
                inFavoriteView={true}
                isFav={true}></CardModule>
                </div>
              
          ))}
        </div>
      </div>
    </div>
    </section>
  );
}
