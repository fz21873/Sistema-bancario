import { app } from "./app";
import { addNewTransaction } from "./endpoints/addNewTransaction";
import { createAccount } from "./endpoints/createAccount";
import { deleteAccount } from "./endpoints/deleteAccount";

import { getAccount } from "./endpoints/getAccount";
import { getBalance } from "./endpoints/getBalance";
import { updateAccount } from "./endpoints/updateAccount";
import { withdrawFull } from "./endpoints/withdrawFull";

app.get("/account", getAccount)
app.post("/account", createAccount)
app.put("/account/:cpf", updateAccount)
app.delete("/account/:cpf", deleteAccount)

app.get("/account/:cpf/balance", getBalance)
app.put("/account/:cpf/transaction", addNewTransaction)

app.put("/account/:cpf/withdrawfull", withdrawFull)

