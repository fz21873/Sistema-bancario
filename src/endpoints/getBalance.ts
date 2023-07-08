import { Request, Response } from "express";
import { CRUD } from "../crud";
import { Transaction } from "../types";
import { atualizarBalance } from "../atualizarBalance";

export const getBalance  = (req: Request, res: Response) => {
  let status = 200;
  let message = 'Transação concluída com sucesso'

    try {

      const cpf = req.params.cpf
     
      
      const checkValance = CRUD.getAccountByCpf(cpf)
      //console.log(checkValance)
     
      //console.log(datailBalance.length)
      if(!checkValance) {
        status = 400
        message = "Não existe uma conta com esse cpf!"
        throw new Error()
      }else{
       
        const balance = checkValance.balance
        const name = checkValance.name
        const transation = checkValance.transactions
        const datailBalance =[{name, balance,transation}]

        res.send(datailBalance).status(status).end()

      }

      
     
        


    } catch (error) {

        res.send(message).status(status).end()

    }

   
}

