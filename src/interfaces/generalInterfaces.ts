export interface Product {
  id: number;

  nombre: string;

  descripcion: string;

  precio: number;

  imageSrc: string;
  isFav?: boolean;
}

export interface Client {
  nombre: string;
  id: number;
  email: string;
  telefono: string;
}
