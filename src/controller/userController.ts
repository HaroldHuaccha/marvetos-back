import { Response, Request } from "express";
import pool from "../database";
import * as CryptoJS from "crypto-js";
import jsonwebtoken from "jsonwebtoken";
import { default as config } from "./config";

class UserController {
  tokenList = {};

  //metodos - CRUD
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      await pool.query("SELECT * FROM User", (err, result, field) => {
        if (!err) {
          res.json(result);
        }
      });
    } catch (error) {
      res.json({ Error: error });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      await pool.query("INSERT INTO user SET ? ", [req.body]);

      res.json({
        Resultado: "Se agrego " + [req.body] + " de manera satisfactoria",
      });
    } catch (error) {
      res.json({ Resultado: "Error" + error });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      await pool.query("DELETE FROM user WHERE user.idUser =?", [
        req.params.id,
      ]);
      res.json({ Resultado: "Se elimino el usuario " + req.params.id });
    } catch (error) {
      res.json({ Resultado: "Error" + error });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      await pool.query("UPDATE user SET ? WHERE user.idUser =?", [
        req.body,
        req.params.id,
      ]);
      res.json({ Resultado: "Datos Actualizados" });
    } catch (error) {
      res.json({ Resultado: "Eror:" + error });
    }
  }

  //TOKEN
  public async login(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body.email);

      const user = {
        email: req.body.email,
        pass: req.body.pass,
      };
      const infoUser = {
        id: "",
        nombre: "",
        apellido: "",
        nombrEmpresa: "",
        idRol: "",
        email: "",
      };
      console.log(user);

      await pool.query(
        "select * from user u where u.email = ? and u.pass=?",
        [user.email, user.pass],
        (err, result, field) => {
          if (!err) {
            if (result.length != 0) {
              console.log("Usuario log ead o");
              console.log("TOKEN");
              infoUser.nombre = result[0].Nombres;
              infoUser.apellido = result[0].Apellidos;
              infoUser.id = result[0].idUser;
              infoUser.nombrEmpresa = result[0].NombreEmopresa;
              infoUser.idRol = result[0].idRol;
              infoUser.email = result[0].email;
              console.log("INFO");
              console.log(infoUser);

              var token = jsonwebtoken.sign(infoUser, config.config.secret, {
                expiresIn: config.config.tokenLife,
              });
              var response = {
                status: "Usuario Logueado",
                code: 1,
                token: token,
              };

              res.json(response);
            } else {
              console.log("Usuario no registrado en el sistema");
              var respon = {
                status: "Usuario no registrado en el sistema",
                code: 0,
              };
              res.json(respon);
            }
          }
        }
      );
    } catch (error) {
      res.json({ Resultado: "Erro" + error });
    }
  }


  public async esEmailRepetido(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body)
      await pool.query("SELECT * FROM User u where u.email=?",[req.body.email], (err, result, field) => {
        if (!err) {
          res.json(result);
          console.log(result);
        }
      });
    } catch (error) {
      res.json({ Error: error });
    }
  }

  public async getSellers(req: Request, res: Response): Promise<void> {
    const data = await pool.query(
      "select * from vendedor",
      (err, result, field) => {
        if (!err) {
          res.json(result);
        }
      }
    );
  }

  //aa---
}

const userController = new UserController();
export default userController;
