import { Account } from "./types"
import fs from 'fs'

export const writeInDB = (data: Account) => {
  fs.writeFileSync('src/account.json', JSON.stringify(data, null, 2))
}