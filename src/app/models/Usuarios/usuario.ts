import { Tipos_Usuario } from "./tipos_usuarios";

export interface Usuario {
    correo: string,
    id_usuario: number,
    nombre: string,
    caracteristicas: Tipos_Usuario;
}