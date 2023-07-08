import { Request, Response } from "express";
import { Account } from "../types";
import { CRUD } from "../crud";

export const createAccount = (req: Request, res: Response) => {
   
    let status = 200;
    let message = "Ação concluida com sucesso"
   
    try {
       
        const { name, cpf, birthDate,balance } = req.body

        const dateBirthDate = new Date(birthDate)
        const yearCurrent =  new Date()
        const age = yearCurrent.getFullYear() - dateBirthDate.getFullYear()
        
        if (!name || !cpf || !birthDate) {
            status = 422;
            message =
                "Você precida informar por query : name, cpf, birthDate"

            throw new Error();

        }

        if(age <= 18){
            status = 422;
            message =
                "Você precisa ter mais de 18 anos para criar uma conta! "

            throw new Error();
        }
        const convertDate = new Date(birthDate).toString()

        const newAccount: Account = {
            name,
            cpf,
            birthDate:convertDate ,
            balance:  balance === 0 ? 0 : balance,
            transactions: []
        }
       
        CRUD.createAccount('src/account.json', newAccount)


        res.send(message).status(status).end()

    } catch (error) {

        res.send(message).status(status).end()

    }
}