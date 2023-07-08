import { Request, Response } from "express";
import { CRUD } from "../crud";
import { Transaction } from "../types";
import { atualizarBalance } from "../atualizarBalance";

export const addNewTransaction = (req: Request, res: Response) => {
  let status = 200;
  let message = 'Transação concluída com sucesso'

    try {

      const cpf = req.params.cpf
      const { value,type } = req.body

     // const type = value > 0 ? "entrada" : "saida"
      const date = new Date().toString()
      
      
      const checkValance = CRUD.getAccountByCpf(cpf)
      
      if(value > checkValance.balance && type === "saida") {
        status = 400
        message = "Seu saque e maior do que o saldo!"
        throw new Error()
      }else{

        const balance = atualizarBalance(checkValance.balance,value,type)
       
        const newTransaction: Transaction = {
          type,
          value,
          description: "Nova Transação",
          date

         }

         const result = CRUD.addTransaction(cpf, newTransaction)

         if (!result) {
             status = 404;
             message = "Não existe uma conta com esse cpf"
             throw new Error()
         }else{

          CRUD.updateAcount(cpf,"",balance)

         }

      }
     
        res.send(message).status(status).end()


    } catch (error) {

        res.send(message).status(status).end()

    }

   
}

