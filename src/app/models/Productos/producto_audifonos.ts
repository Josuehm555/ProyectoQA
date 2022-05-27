import { Tipo_Producto } from "./tipo_producto";

export interface Producto_Audifonos extends Tipo_Producto{
    conexion?: string,
    tipo?: string,
    marca?: string
}