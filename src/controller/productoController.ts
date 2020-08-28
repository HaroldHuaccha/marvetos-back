import { Response, Request } from "express";
import pool from "../database";

class ProductoController {
  //Crud de producto
  //crear un producto
  public async create(req: Request, res: Response): Promise<void> {
    console.log(req.body);
    await pool.query("INSERT INTO producto set ?", [req.body]);
    res.json({ text: "El producto " + [req.body.name] + " fue agregado" });
  }

  //listar los productos
  public async list(req: Request, res: Response): Promise<void> {
    const data = await pool.query(
    //  "select producto.idProducto, producto.idCategoria, producto.name as producto, producto.image, producto.precio, producto.stock, producto.descripcion, unidad.name as unidades from producto inner join unidad on producto.idUnidad = unidad.idUnidad; ", 
     "  select producto.idProducto, producto.idSubCategoria, producto.name as producto, producto.image, producto.precio, producto.stock, producto.descripcion, unidad.name as unidades from producto inner join unidad on producto.idUnidad = unidad.idUnidad ",
     
      (err, result, field) => {
        if (!err) {
          res.json(result);
        }
      }
    );
  }

  public async listProduct(req: Request, res: Response): Promise<void> {
    const data = await pool.query(
    //  "select producto.idProducto, producto.idCategoria, producto.name as producto, producto.image, producto.precio, producto.stock, producto.descripcion, unidad.name as unidades from producto inner join unidad on producto.idUnidad = unidad.idUnidad; ", 
     "  select producto.idProducto, producto.idSubCategoria, producto.name, producto.image, producto.precio, producto.stock, producto.descripcion, unidad.name as unidades from producto inner join unidad on producto.idUnidad = unidad.idUnidad ",
     
      (err, result, field) => {
        if (!err) {
          res.json(result);
        }
      }
    );
  }

  public async listA(req: Request, res: Response): Promise<void> {
    const data = await pool.query(
     
      "select *from producto order by producto.precio DESC",
     // "select *from producto order by producto.precio ASC",
      (err, result, field) => {
        if (!err) {
          res.json(result);
        }
      }
    );
  }

  //actualizar los productos
  public async put(req: Request, res: Response): Promise<void> {
    await pool.query("update producto set ? where producto.idProducto = ?", [
      req.body,
      req.params.id,
    ]);
    res.json({ text: "El producto " + [req.body.name] + " fue actualizado" });
  }

  //eliminar producto
  public async delete(req: Request, res: Response): Promise<void> {
    await pool.query("delete from producto where producto.idProducto = ?", [
      req.params.id,
    ]);
    res.json({ text: "El producto " + [req.body.name] + " fue eliminado" });
  }

 
  public async getOne(req: Request, res: Response): Promise<any> {
    const data = await pool.query(
      "select * from producto where producto.idProducto = ?",
      [req.params.id],

      (err, result, field) => {
        if (!err) {
          res.json(result);
        }
      }
    );
  }

  //Busqueda de producto
  /* public async Buscar(req: Request, res: Response): Promise<any> {
    const data = await pool.query(
      "select * from producto where producto.name = ?",
      [req.params.name],

      (err, result, field) => {
        if (!err) {
          res.json(result);
        }
      }
    );
  } */




  //seleccionar por categoria
  public async listCate(req: Request, res: Response): Promise<void> {
    const data = await pool.query(
      
     // "select producto.idProducto, producto.idCategoria, producto.name as producto, producto.image, producto.precio, producto.stock, producto.descripcion, unidad.name as unidades from producto inner join unidad on producto.idUnidad = unidad.idUnidad where producto.idCategoria=?", 
    "select producto.idProducto, subcategoria.idCategoria, producto.name as producto, producto.image, producto.precio, producto.stock, producto.descripcion, unidad.name as unidades from producto inner join unidad on producto.idUnidad = unidad.idUnidad inner join subcategoria on producto.idSubCategoria = subcategoria.idSubCategoria where subcategoria.idCategoria = ?",
     [req.params.id],
      (err, result, field) => {
        if (!err) {
          res.json(result);
        }
      }
    );
  }

  //producto de limite 3
  public async listThree(req: Request, res: Response): Promise<void> {
    const data = await pool.query(
      "select *from producto  where producto.stock <= 40 limit 6",
      (err, result, field) => {
        if (!err) {
          res.json(result);
        }
      }
    );
  }

  
  public async listSub(req: Request, res: Response): Promise<void> {
    const data = await pool.query(
      "select DISTINCT subcategoria.T_NameCategoria as subcategoria, subcategoria.idSubcategoria from producto inner join unidad on producto.idUnidad = unidad.idUnidad inner join subcategoria on producto.idSubCategoria = subcategoria.idSubCategoria where subcategoria.idCategoria = ? ORDER BY subcategoria.T_NameCategoria ASC ",
      [req.params.id],
      (err, result, field) => {
        if (!err) {
          res.json(result);
        }
      }
    );
  }

  //seleccionar por categoria y subcategoria
  public async listCateSub(req: Request, res: Response): Promise<void> {
    const data = await pool.query(
      
    "select producto.idProducto, producto.idSubCategoria, producto.name as producto, producto.image, producto.precio, producto.stock, producto.descripcion, unidad.name as unidades from producto inner join unidad on producto.idUnidad = unidad.idUnidad inner join subcategoria on producto.idSubCategoria = subcategoria.idSubCategoria where subcategoria.idCategoria = ? and subcategoria.idSubCategoria = ?",
     [req.params.idcat,req.params.namesub],
      (err, result, field) => {
        if (!err) {
          res.json(result);
        }
      }
    );
  }
  

}

export const productoController = new ProductoController();
