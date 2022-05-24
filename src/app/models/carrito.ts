import { Producto } from "./Productos/producto";

export interface Carrito {
    items: Producto[];
    cambiado: boolean;
}