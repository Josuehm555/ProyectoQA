import { Tipo_Usuario } from "./tipo_usuario";

export interface Usuario_Consumidor extends Tipo_Usuario {
    canton?: string,
    celular?: string
    cumpleanos?: string,
    direccion_exacta?: string
    provincia?: string
}