import { Tipo_Usuario } from "./tipo_usuario";

export interface Usuario_Creador_de_Contenido extends Tipo_Usuario{
    descripcion?: string
    sitio_web?: string
    direccion_exacta?: string
    celular?: string
    canton?:  string
    provincia?: string
}