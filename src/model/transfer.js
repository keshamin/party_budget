import Repo from '@/repo/party-repo'

class Transfer {
  constructor({id, name, amount, senderId, receiverId}) {
    this.id = id
    this.name = name
    this.amount = amount
    this.senderId = senderId
    this.receiverId = receiverId
  }
}

Transfer.create = function({party, name, amount, senderId, receiverId}) {
  return new this({id: Repo.genTransferId(party), name, amount, senderId, receiverId})
}

export default Transfer

