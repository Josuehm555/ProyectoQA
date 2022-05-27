import { Tipo_Producto } from "./tipo_producto";

export interface Producto_Parlantes extends Tipo_Producto{
    conexion?: string[],
    tipo?: string,
    marca?: string,
}