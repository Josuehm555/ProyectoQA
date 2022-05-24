import { Usuario_Administrador } from "./usuario_administrador";
import { Usuario_Consumidor } from "./usuario_consumidor";
import { Usuario_Creador_de_Contenido } from "./usuario_creador_contenido";

export type Tipos_Usuario = 
    Usuario_Consumidor
    | Usuario_Creador_de_Contenido
    | Usuario_Administrador