import { Request, Response } from "express";
import { CRUD } from "../crud";

export const getAccount = (req: Request, res: Response) => {
    let status = 200;
    let message = "Ação concluida com sucesso"
   
    try {

        const { name, cpf } = req.query

        const result = CRUD.getAccount(cpf, name)

        if (!result) {
            status = 404;
            message = `Não existe uma conta com esse cpf: ${cpf} e name: ${name}`
            throw new Error();

        }

        res.send(result).status(status).end()

    } catch (error) {

        res.send(message).status(status).end()

    }
}