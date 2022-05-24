import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/*
Esta fachada encarga de crear el menú del usuario.
La fachada está definida por el "rol" del usuario

1 - Administrador
2 - Creador de Contenido
3 - Consumidor

*/

export class SidebarService {

  menu = [
    {
      titulo: 'Panel de Control',
      icono: 'fas fa-tachometer-alt',
      ruta: '/inicio/dashboard',
      rol: ["1","2"]
    },
    {
      titulo: 'Perfil',
      icono: 'fas fa-user-circle',
      ruta: '/inicio/editar-perfil',
      rol: ["1","2","3"]
    },
    {
      titulo: 'Usuarios',
      icono: 'fas fa-users',
      ruta: '/inicio/usuarios',
      rol: ["1"]
    },
    {
      titulo: 'Productos',
      icono: 'fas fa-boxes',
      ruta: '/inicio/productos',
      rol: ["1","2"]
    },
    {
      titulo: 'Categorías',
      icono: 'fas fa-tag',
      ruta: 'inicio/categorias',
      rol: ["1"]
    },
    {
      titulo: 'Blogs',
      icono: 'far fa-file-alt',
      ruta: 'inicio/blogs',
      rol: ["1","2"]
    },
    
  ];

  constructor() { }

  obtener_menu(rol: string) {
    return this.generar_menu_x_rol(rol);
  }

  generar_menu_x_rol(rol: string) {
    var menu_rol: any = [];
    this.menu.forEach(elemento => {
      if (elemento.rol.includes(rol)) {
          menu_rol.push(elemento);
        }
    });
    return menu_rol;
  }
}
