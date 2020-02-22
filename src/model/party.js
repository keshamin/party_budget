import PartyState from './party-states'
import Repo from '@/repo/party-repo'

class Party {
  constructor({id, name, state, members, expenses, coefficients, transfers}) {
    this.id = id
    this.name = name
    this.state = state
    this.members = members
    this.expenses = expenses
    this.coefficients = coefficients
    this.transfers = transfers
  }
}

Party.empty = function() {
  return new this({
    id: null, 
    name: "", 
    state: PartyState.inProgress, 
    members: [], 
    expenses: [],
    coefficients: [],
    transfers: []
  })
}

Party.create = function({name}) {
  let newParty = this.empty()
  newParty.id = Repo.genPartyId()
  newParty.name = name
  return newParty
}

export default Party
