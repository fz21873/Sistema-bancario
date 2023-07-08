
export const atualizarBalance = (balane:number,valueTransaction:number,
  typeTransaction:string)=>{

    if(typeTransaction.toLowerCase() === "entrada") return  balane + valueTransaction
     
    if(typeTransaction.toLowerCase() === "saida") return  Math.abs(balane - valueTransaction)


   


  }