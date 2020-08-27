import { Router } from "express";
import { detallecarritoController } from "../controller/detalleCarritoController";
class DetalleCarritoRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }
  config(): void {
    this.router.get("/descuento", detallecarritoController.getDescuento);
    this.router.post("/", detallecarritoController.create);
    this.router.get("/", detallecarritoController.list);
    this.router.put("/:id", detallecarritoController.put);
    this.router.get("/:id", detallecarritoController.listCarrito);
    //this.router.delete("/:id", detallecarritoController.delete);
    this.router.get("/busqueda/:id", detallecarritoController.BuscarDetalle);
  }
}

const detallecarritoRoutes = new DetalleCarritoRoutes();
export default detallecarritoRoutes.router;
