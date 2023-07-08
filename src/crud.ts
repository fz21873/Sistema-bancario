import fs from 'fs'
import { Account, Transaction } from './types'
import { writeInDB } from './writeInDB'


export const CRUD = {
    accounts: JSON.parse(
        fs.readFileSync("src/account.json", 'utf-8')
    ),
    createAccount(path: string, data: Account) {

        this.accounts.push(data)
        fs.writeFileSync(path, JSON.stringify(
            this.accounts, null, 2
        ))
    },
    
    updateAcount(cpf: string, newName?: string,balance?:number) {

        const upDateItem = this.accounts.find((count: Account) => count.cpf === cpf)
      
        if (upDateItem) {
            if(newName!=="") upDateItem.name = newName

            if(balance !== undefined) upDateItem.balance = balance
           
            writeInDB(this.accounts)
            return true
        } else {
            return false
        }
    },
    
    deleteAccount(cpf: string) {

        const removeItem = this.accounts.findIndex((count: Account) => count.cpf === cpf);
        this.accounts.splice(removeItem, 1)
       
        if (removeItem < 0) {
            return false
        }else{
           
            writeInDB(this.accounts)
            return true
        }
    },

        addTransaction(cpf: string, newTransaction: Transaction) {

        const addTransactionItem = this.getAccountByCpf(cpf);        
  
        if (addTransactionItem) {
            addTransactionItem.transactions.push(newTransaction)          
            writeInDB(this.accounts)
            return true
        } else {
            return false
        }

    },

    getAccountByCpf(cpf: string) {
        return this.accounts.find((count: Account) => count.cpf === cpf)
    },

    getAccount(cpf: any, name:any) {
        
        return this.accounts.find((count: Account) => count.cpf === cpf && count.name === name)
    },

    
}

 