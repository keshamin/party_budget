import Repo from '@/repo/party-repo'

class Member {
  constructor({id, name}) {
    this.id = id
    this.name = name
  }
}

Member.create = function({name, party}) {
  return new this({id: Repo.genMemberId(party), name: name})
}

export default Member

