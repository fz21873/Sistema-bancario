import { Request, Response } from "express";
import { CRUD } from "../crud";

export const updateAccount = (req: Request, res: Response) => {
  let status = 200;
  let message = 'Transação concluída com sucesso'

    try {

        const {name} = req.body
        const {cpf} = req.params 

        const result = CRUD.updateAcount(cpf,name)

        if (!result) {
             status = 404;
             message = "Não existe uma conta com esse cpf"
            throw new Error()
        }

        res.send(message).status(status).end()


    } catch (error) {

        res.send(message).status(status).end()

    }
}