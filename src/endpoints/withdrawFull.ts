import { Request, Response } from "express";
import { CRUD } from "../crud";
import { Transaction } from "../types";
import { atualizarBalance } from "../atualizarBalance";

export const withdrawFull = (req: Request, res: Response) => {
  let status = 200;
  let message = 'Transação concluída com sucesso'

    try {

      const cpf = req.params.cpf
      const types = "saida" 
      const date = new Date().toString()
      
      
      const checkValance = CRUD.getAccountByCpf(cpf)
      
        const balance = atualizarBalance(checkValance.balance,checkValance.balance,types)
       
        const newTransaction: Transaction = {
          type:types,
          value:checkValance.balance,
          description: "Nova Transação",
          date

         }
         
        if(checkValance.balance === 0){
          status = 404;
          message = "Você não tem saldo para realizar esta operação"
          throw new Error()
        }

         const result = CRUD.addTransaction(cpf, newTransaction)

         if (!result) {
             status = 404;
             message = "Não existe uma conta com esse cpf"
             throw new Error()
         }else{

          CRUD.updateAcount(cpf,"",balance)

         }

      
     
        res.send(message).status(status).end()


    } catch (error) {

        res.send(message).status(status).end()

    }

   
}

