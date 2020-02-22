import Repo from '@/repo/party-repo'

class Expense {
  constructor({id, name, amount, paidById}) {
    this.id = id
    this.name = name
    this.amount = amount
    this.paidById = paidById
  }
}

Expense.create = function({party, name, amount, paidById}) {
  return new this({id: Repo.genExpenseId(party), name, amount, paidById})
}

export default Expense

