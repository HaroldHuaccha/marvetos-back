import express, { Application } from "express";
import indexRoutes from "./routes/indexRoutes";

//Rol
import rolRoutes from "./routes/rolRoutes";
//User
import userRouter from "./routes/userRoutes";
//Carrito
import carritoRoute from "./routes/carritoRoute";

//Importamos categoria
import categoriaRoutes from "./routes/categoriaRoutes";

//Importamos Producto

import productoRoutes from "./routes/productoRoutes";

//Importamos DetalleCarrito
import detallecarritoRoutes from "./routes/detalleCarritoRoutes";

//Importamos Marca

//Estado,Conductor,Vendedor,Ubicacion,Forma de Pago y Orden
import estadoRoutes from "./routes/estadoRoutes";
import conductorRoutes from "./routes/conductorRoutes";
import vendedorRoutes from "./routes/vendedorRoutes";
import ubicacionRoutes from "./routes/ubicacionRoutes";
import formaPagoRoutes from "./routes/formaPagoRoutes";
import ordenRoutes from "./routes/ordenRoutes";
import allRoutes from "./routes/allRoutes";
import sendemailRoutes from "./routes/sendemailRoutes";
import marcaRoutes from "./routes/marcaRoutes";
import subCategoriaRoutes from "./routes/subCategoriaRoutes";
import  unidadRoutes from "./routes/unidadRoutes";

//librerias7
import morgan from "morgan";
import cors from "cors";
import multer from "multer";
import path from "path";

class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  //Middlewares
  config(): void {
    const storage = multer.diskStorage({
      destination: path.join(__dirname, "/public/uploads"),
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    });

    this.app.set("port", process.env.PORT || 5000);
    this.app.use(morgan("dev")); // permite vizulizar las peticiones al servidor
    this.app.use(cors());
    this.app.use(express.json()); //permite utilizar archivos json
    this.app.use(express.urlencoded({ extended: false })); //formularios
    this.app.use(
      multer({ storage, dest: path.join(__dirname, "public/uploads") }).single(
        "file"
      )
    );
  }

  //rutas
  routes(): void {
    this.app.use("/", indexRoutes);
    this.app.use("/api/rol", rolRoutes);
    this.app.use("/api/user", userRouter);
    this.app.use("/api/cart", carritoRoute);
    this.app.use("/api/categoria", categoriaRoutes);
    this.app.use("/api/producto", productoRoutes);
    this.app.use("/api/detalleCarrito", detallecarritoRoutes);
    this.app.use("/api/estado", estadoRoutes);
    this.app.use("/api/conductor", conductorRoutes);
    this.app.use("/api/vendedor", vendedorRoutes);
    this.app.use("/api/ubicacion", ubicacionRoutes);
    this.app.use("/api/formaPago", formaPagoRoutes);
    this.app.use("/api/orden", ordenRoutes);
    this.app.use("/api/todo", allRoutes);
    this.app.use("/api/email", sendemailRoutes);
    this.app.use("/api/marca", marcaRoutes);
    this.app.use("/api/subCategoria", subCategoriaRoutes);
    this.app.use("/api/unidad", unidadRoutes);
  }

  start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log(this.app.get("port"));
    });
  }
}

const server = new Server();
server.start();
