import { Tipo_Producto } from "./tipo_producto";

export interface Producto_Albumes extends Tipo_Producto{
    artista?: string[],
    generos?: string[]
}