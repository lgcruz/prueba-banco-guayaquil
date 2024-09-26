import { useAppSelector } from "@/redux/hook";
import HeartIcon from "../Icons/HeartIcon";
import HeartFullIcon from "../Icons/HeartFullIcon";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function CardModule(props: {
    id: number;
    nombre: string;
    precio: number;
    descripcion?: string;
    imageSrc: string;
    isFav: boolean;
    inFavoriteView: boolean;
    // favorites: number[];
    // setFavorite: (id :number) => void
}) {
    const { id, nombre, precio, descripcion, imageSrc, isFav, inFavoriteView } = props;
    const [isFavorite,setIsFavorite] = useState(isFav);
    const client = useAppSelector(state => state.ClientReducer.client);

    useEffect(() => {
        setIsFavorite(isFav);
    }, [isFav]);

    function likeProduct(productId: number, clientId: number ) {
        
        fetch(`https://localhost:7126/api/Product`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json', // Indicate the content type
            },
            body: JSON.stringify({
                productId,
                clientId
            })
        }).then((response) => response.json())
        .then((json) => {
          console.log(json);
          redirect('/');
        })
          // dispatch(setProducts(json));
    }

    function unlikeProduct(productId: number, clientId: number ) {
        
        fetch(`https://localhost:7126/api/Product`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json', // Indicate the content type
            },
            body: JSON.stringify({
                productId,
                clientId
            })
        }).then((response) => response.json())
        .then((json) => {
          console.log(json);
        })
          // dispatch(setProducts(json));
    }
    return (
        
    <div className="card bg-base-100 w-auto shadow-xl max-h-[400px] rounded-xl">
        <a key={id} href={`${inFavoriteView ? '../':'/'}products/${id}`} className="group">
        <figure className="p-6 flex justify-center items-center" >
            <img
            className="max-h-[200px] min-h-[200px] "
            src={imageSrc}
            alt={nombre} />
        </figure>
        </a>
        <div className="card-body p-10 flex justify-between">
            <div className="flex flex-col">
                <h3 className="mt-4 text-sm text-gray-700">{nombre}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">${precio.toFixed(2)}</p>
            </div>
            <div className="card-actions flex justify-end">
                <button onClick={() => {
                    
                    if (isFavorite) {
                        unlikeProduct(id, 1)
                    }else {
                        likeProduct(id, 1)
                    }
                    setIsFavorite(!isFavorite);
                    // redirect('/');
                    // setFavorite(id)
                    
                }} className="btn btn-primary">{ isFavorite ? <HeartFullIcon width={20} height={20} /> : <HeartIcon width={20} height={20} />}</button>
            </div>
        </div>
    </div>  
);
}