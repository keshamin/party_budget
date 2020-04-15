<template>
  <div style="margin-bottom: 20px">
    <label>
      Название новой вечеринки:
      <input type="text" v-model="partyName" placeholder="Придумайте название для вечеринки">
    </label>
    <input type="button" value="Создать" @click="createPartyHandler">
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: "PartyForm",
    data() { return {
      partyName: '',
    }},
    methods: {
      ...mapActions('parties', [
        'createParty'
      ]),
      async createPartyHandler() {
        let party = {name: this.partyName};
        await this.createParty(party)
        this.partyName = '';
      }
    }
  }
</script>

<style scoped>

</style>