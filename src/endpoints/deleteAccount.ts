import { Request, Response } from "express";
import { CRUD } from "../crud";

export const deleteAccount = (req: Request, res: Response) => {
  let status = 200;
  let message = 'A conta foi excluida sucesso'

    try {

        
        const {cpf} = req.params 

        const result = CRUD.deleteAccount(cpf)
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