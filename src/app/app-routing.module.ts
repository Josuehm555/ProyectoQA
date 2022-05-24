import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { IniciarSesionComponent } from './components/gestion-acceso/iniciar-sesion/iniciar-sesion.component';
import { RecuperarContrasenaComponent } from './components/gestion-acceso/recuperar-contrasena/recuperar-contrasena.component';
import { RegistroComponent } from './components/gestion-acceso/registro/registro.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TablaProductosComponent } from './components/productos/tabla-productos/tabla-productos.component';
import { TablaUsuariosComponent } from './components/usuarios/tabla-usuarios/tabla-usuarios.component';
import { VerUsuarioConsumidorComponent } from './components/usuarios/ver-usuario-consumidor/ver-usuario-consumidor.component';
import { VerProductoComponent } from './components/productos/ver-producto/ver-producto.component';
import { CrearProductoComponent } from './components/productos/crear-producto/crear-producto.component';
import { CrearUsuarioComponent } from './components/usuarios/crear-usuario/crear-usuario.component';
import { CuentaActivadaComponent } from './components/gestion-acceso/cuenta-activada/cuenta-activada.component';
import { RolesGuard } from './guards/roles/roles.guard';
import { SinSesionGuard } from './guards/sin-sesion/sin-sesion.guard';
import { ModificarProductoComponent } from './components/productos/modificar-producto/modificar-producto.component';
import { TablaCategoriasComponent } from './components/categorias/tabla-categorias/tabla-categorias.component';
import { CrearCategoriaComponent } from './components/categorias/crear-categoria/crear-categoria.component';
import { EditarPerfilComponent } from './components/perfil/editar-perfil/editar-perfil.component';
import { VerUsuarioCreadorContenidoComponent } from './components/usuarios/ver-usuario-creador-contenido/ver-usuario-creador-contenido.component';
import { ModificarCantidadProductoComponent } from './components/productos/modificar-producto/modificar-cantidad-producto/modificar-cantidad-producto.component';
import { VerCarritoComponent } from './components/carrito/ver-carrito/ver-carrito.component';
import { CheckoutComponent } from './components/checkout/checkout/checkout.component';
import { AudifonosComponent } from './components/busqueda/audifonos/audifonos.component';
import { ParlantesComponent } from './components/busqueda/parlantes/parlantes.component';
import { AlbumesComponent } from './components/busqueda/albumes/albumes.component';
import { TablaBlogsComponent } from './components/blogs/tabla-blogs/tabla-blogs.component';
import { CrearBlogComponent } from './components/blogs/crear-blog/crear-blog.component';
import { VerBlogComponent } from './components/blogs/ver-blog/ver-blog.component';
import { ModificarBlogComponent } from './components/blogs/modificar-blog/modificar-blog.component';
import { BusquedaGeneralComponent } from './components/busqueda/busqueda-general/busqueda-general.component';
import { BlogsComponent } from './components/busqueda/blogs/blogs.component';
import { RedireccionGuard } from './guards/redireccion/redireccion.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'iniciar-sesion', component: IniciarSesionComponent, canActivate:[SinSesionGuard] },
  { path: 'registro', component: RegistroComponent },
  { path: 'recuperar-contrasena', component: RecuperarContrasenaComponent },
  {
    path: 'inicio',
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [RedireccionGuard], data: { roles_permitidos: ["1", "2"], redirectTo: '/inicio/editar-perfil', rol_almacenado: 'rol'} },
      { path: 'editar-perfil', component: EditarPerfilComponent, canActivate: [RolesGuard], data: { roles_permitidos: ["1", "2", "3"], redirectTo: '#', rol_almacenado: 'rol'} },
      { path: 'productos', component: TablaProductosComponent, canActivate: [RolesGuard], data: { roles_permitidos: ["1", "2"], redirectTo: '#', rol_almacenado: 'rol'}  },
      { path: 'crear-producto', component: CrearProductoComponent, canActivate: [RolesGuard], data: { roles_permitidos: ["2"], redirectTo: '#', rol_almacenado: 'rol'}  },
      { path: 'modificar-producto', component: ModificarProductoComponent, canActivate: [RolesGuard], data: { roles_permitidos: ["2"], redirectTo: '#', rol_almacenado: 'rol'}  },
      { path: 'modificar-cantidad-producto', component: ModificarCantidadProductoComponent, canActivate: [RolesGuard], data: { roles_permitidos: ["2"], redirectTo: '#', rol_almacenado: 'rol'}  },
      { path: 'usuarios', component: TablaUsuariosComponent, canActivate: [RolesGuard], data: { roles_permitidos: ["1"], redirectTo: '#', rol_almacenado: 'rol'} },
      { path: 'crear-usuario', component: CrearUsuarioComponent, canActivate: [RolesGuard], data: { roles_permitidos: ["1"], redirectTo: '#', rol_almacenado: 'rol'} },
      { path: 'ver-usuario-consumidor/:id', component: VerUsuarioConsumidorComponent, canActivate: [RolesGuard], data: { roles_permitidos: ["1"], redirectTo: '#', rol_almacenado: 'rol'} },
      { path: 'categorias', component: TablaCategoriasComponent, canActivate: [RolesGuard], data: { roles_permitidos: ["1"], redirectTo: '#', rol_almacenado: 'rol'} },
      { path: 'crear-categoria', component: CrearCategoriaComponent, canActivate: [RolesGuard], data: { roles_permitidos: ["1"], redirectTo: '#', rol_almacenado: 'rol'} },
      { path: 'blogs', component: TablaBlogsComponent, canActivate: [RolesGuard], data: { roles_permitidos: ["1","2"], redirectTo: '#', rol_almacenado: 'rol'} },
      { path: 'crear-blog', component: CrearBlogComponent, canActivate: [RolesGuard], data: { roles_permitidos: ["2"], redirectTo: '#', rol_almacenado: 'rol'} },
      { path: 'modificar-blog', component: ModificarBlogComponent, canActivate: [RolesGuard], data: { roles_permitidos: ["2"], redirectTo: '#', rol_almacenado: 'rol'} },
      { path: '**', pathMatch: "full", redirectTo: 'dashboard' }
    ]
  },
  { path: 'checkout', component: CheckoutComponent, canActivate: [RolesGuard], data: { roles_permitidos: ["3"], redirectTo: '#', rol_almacenado: 'rol'} },
  { path: 'carrito', component: VerCarritoComponent, canActivate: [RolesGuard], data: { roles_permitidos: ["3"], redirectTo: '#', rol_almacenado: 'rol'}},
  { path: 'cuenta', component: CuentaActivadaComponent},
  { path: 'buscar', component: BusquedaGeneralComponent},
  { path: 'audifonos', component: AudifonosComponent },
  { path: 'parlantes', component: ParlantesComponent },
  { path: 'albumes', component: AlbumesComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'ver-producto/:id', component: VerProductoComponent },
  { path: 'ver-blog/:id', component: VerBlogComponent },
  { path: 'ver-usuario-creador-contenido/:id', component: VerUsuarioCreadorContenidoComponent },
  { path: '**', pathMatch: "full", redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
