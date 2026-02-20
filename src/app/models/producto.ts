export class Producto {
  id: number;
  tipo: string;
  color: string;
  talla: string;
  cantidad: number;
  modelo: string;

  constructor() {
      this.id = 0;
      this.modelo = '';
      this.tipo = '';
      this.color = '';
      this.talla = '';
      this.cantidad = 0;
  }
}
