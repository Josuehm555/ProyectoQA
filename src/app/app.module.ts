import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProductCardsComponent } from './components/shared/product-cards/product-cards.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { BlogsCardsComponent } from './components/shared/blogs-cards/blogs-cards.component';
import { IniciarSesionComponent } from './components/gestion-acceso/iniciar-sesion/iniciar-sesion.component';
import { RegistroComponent } from './components/gestion-acceso/registro/registro.component';
import { RecuperarContrasenaComponent } from './components/gestion-acceso/recuperar-contrasena/recuperar-contrasena.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { NavSidebarComponent } from './components/shared/sidebar/nav-sidebar/nav-sidebar.component'

import { DataTablesModule } from "angular-datatables";
import { HttpClientModule } from '@angular/common/http';
import { TablaProductosComponent } from './components/productos/tabla-productos/tabla-productos.component';
import { TablaUsuariosComponent } from './components/usuarios/tabla-usuarios/tabla-usuarios.component';
import { VerUsuarioConsumidorComponent } from './components/usuarios/ver-usuario-consumidor/ver-usuario-consumidor.component';
import { CrearUsuarioComponent } from './components/usuarios/crear-usuario/crear-usuario.component';
import { VerProductoComponent } from './components/productos/ver-producto/ver-producto.component';
import { EliminarModalComponent } from './components/modals/eliminar-modal/eliminar-modal.component';
import { CrearProductoComponent } from './components/productos/crear-producto/crear-producto.component';
import { AudifonosFormComponent } from './components/productos/crear-producto/productos/audifonos/audifonos.component';
import { ParlantesFormComponent } from './components/productos/crear-producto/productos/parlantes/parlantes.component';
import { AlbumesFormComponent } from './components/productos/crear-producto/productos/albumes/albumes.component';
import { ColoresComponent } from './components/productos/crear-producto/estilos/colores/colores.component';
import { PresentacionesComponent } from './components/productos/crear-producto/estilos/presentaciones/presentaciones.component';
import { SinEstilosComponent } from './components/productos/crear-producto/estilos/sin-estilos/sin-estilos.component';
import { CreadorContenidoFormComponent } from './components/usuarios/crear-usuario/usuarios/creador-contenido/creador-contenido.component';
import { ToastrModule } from 'ngx-toastr';
import { CuentaActivadaComponent } from './components/gestion-acceso/cuenta-activada/cuenta-activada.component';
import { CurrencyPipe } from '@angular/common';
import { ModificarProductoComponent } from './components/productos/modificar-producto/modificar-producto.component';
import { TablaCategoriasComponent } from './components/categorias/tabla-categorias/tabla-categorias.component';
import { CrearCategoriaComponent } from './components/categorias/crear-categoria/crear-categoria.component';
import { EditarPerfilComponent } from './components/perfil/editar-perfil/editar-perfil.component';
import { AdministradorPerfilComponent } from './components/perfil/editar-perfil/usuarios/administrador/administrador.component';
import { ConsumidorPerfilComponent } from './components/perfil/editar-perfil/usuarios/consumidor/consumidor.component';
import { CreadorContenidoPerfilComponent } from './components/perfil/editar-perfil/usuarios/creador-contenido/creador-contenido.component';
import { VerUsuarioCreadorContenidoComponent } from './components/usuarios/ver-usuario-creador-contenido/ver-usuario-creador-contenido.component';
import { VerCarritoComponent } from './components/carrito/ver-carrito/ver-carrito.component';
import { ModificarCantidadProductoComponent } from './components/productos/modificar-producto/modificar-cantidad-producto/modificar-cantidad-producto.component';
import { CarritoResumenComponent } from './components/carrito/carrito-resumen/carrito-resumen.component';
import { CheckoutComponent } from './components/checkout/checkout/checkout.component';
import { CheckoutPagoComponent } from './components/checkout/checkout-pago/checkout-pago.component';
import { CheckoutDireccionComponent } from './components/checkout/checkout-direccion/checkout-direccion.component';

import { ParlantesComponent } from './components/busqueda/parlantes/parlantes.component';
import { AudifonosComponent } from './components/busqueda/audifonos/audifonos.component';
import { AlbumesComponent } from './components/busqueda/albumes/albumes.component';
import { PrecioCantidadPipe } from './pipes/carrito/cantidad/precio-cantidad.pipe';
import { PrecioImpuestoPipe } from './pipes/carrito/impuesto/precio-impuesto.pipe';
import { PrecioTotalPipe } from './pipes/carrito/total/precio-total.pipe';
import { PrecioSubtotalPipe } from './pipes/carrito/subtotal/precio-subtotal.pipe';
import { VerBlogComponent } from './components/blogs/ver-blog/ver-blog.component';
import { TablaBlogsComponent } from './components/blogs/tabla-blogs/tabla-blogs.component';
import { CrearBlogComponent } from './components/blogs/crear-blog/crear-blog.component';
import { ModificarBlogComponent } from './components/blogs/modificar-blog/modificar-blog.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BusquedaGeneralComponent } from './components/busqueda/busqueda-general/busqueda-general.component';
import { ComentariosComponent } from './components/comunidad/comentarios/comentarios.component';
import { CalificacionBlogsComponent } from './components/comunidad/calificacion-blogs/calificacion-blogs.component';
import { CalificacionProductosComponent } from './components/comunidad/calificacion-productos/calificacion-productos.component';
import { EstrellasComponent } from './components/shared/estrellas/estrellas.component';
import { CompartirComponent } from './components/modals/compartir/compartir.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AsociarProductosComponent } from './components/blogs/crear-blog/asociar-productos/asociar-productos.component';
import { BlogsComponent } from './components/busqueda/blogs/blogs.component';
import { ResenaProductoModalComponent } from './components/modals/resena-producto-modal/resena-producto-modal.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ComentariosProductosComponent } from './components/comunidad/comentarios-productos/comentarios-productos.component';
import { EditarComentarioBlogComponent } from './components/modals/editar-comentario-blog/editar-comentario-blog.component';
import { CreadorContenidoCardComponent } from './components/shared/creador-contenido-card/creador-contenido-card.component';
import { ConfirmarModalComponent } from './components/modals/confirmar-modal/confirmar-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductCardsComponent,
    FooterComponent,
    BlogsCardsComponent,
    IniciarSesionComponent,
    RegistroComponent,
    RecuperarContrasenaComponent,
    SidebarComponent,
    NavSidebarComponent,
    TablaProductosComponent,
    TablaUsuariosComponent,
    VerUsuarioConsumidorComponent,
    CrearUsuarioComponent,
    VerProductoComponent,
    EliminarModalComponent,
    CrearProductoComponent,
    AudifonosFormComponent,
    ParlantesFormComponent,
    AlbumesFormComponent,
    ColoresComponent,
    PresentacionesComponent,
    SinEstilosComponent,
    CreadorContenidoFormComponent,
    CuentaActivadaComponent,
    ModificarProductoComponent,
    TablaCategoriasComponent,
    CrearCategoriaComponent,
    EditarPerfilComponent,
    AdministradorPerfilComponent,
    ConsumidorPerfilComponent,
    CreadorContenidoPerfilComponent,
    VerUsuarioCreadorContenidoComponent,
    VerCarritoComponent,
    ModificarCantidadProductoComponent,
    CarritoResumenComponent,
    CheckoutComponent,
    CheckoutPagoComponent,
    CheckoutDireccionComponent,
    ParlantesComponent,
    AudifonosComponent,
    AlbumesComponent,
    PrecioCantidadPipe,
    PrecioImpuestoPipe,
    PrecioTotalPipe,
    PrecioSubtotalPipe,
    VerBlogComponent,
    TablaBlogsComponent,
    CrearBlogComponent,
    ModificarBlogComponent,
    BusquedaGeneralComponent,
    ComentariosComponent,
    CalificacionBlogsComponent,
    CalificacionProductosComponent,
    EstrellasComponent,
    CompartirComponent,
    AsociarProductosComponent,
    BlogsComponent,
    ResenaProductoModalComponent,
    ComentariosProductosComponent,
    EditarComentarioBlogComponent,
    CreadorContenidoCardComponent,
    ConfirmarModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    NgxSliderModule,
    NgSelectModule,
    ReactiveFormsModule,
    AngularEditorModule,
    ToastrModule.forRoot()
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
