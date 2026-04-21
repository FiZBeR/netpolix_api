export interface CreateUsuarioDTO {
    cedula: string;
    nombre: string;
    password: string;
    rol: 'ADMIN' | 'CLIENTE' | 'GERENTE'; 
}