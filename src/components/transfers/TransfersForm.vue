<template>
  <div>
    Новый перевод<br>
    <label>
      Заметка:<br>
      <input type="text" v-model="transferNote"><br>
    </label>
    <label>
      Сумма:<br>
      <input type="number" v-model="transferAmount"><br>
    </label>
    <label>
      Отправитель:<br>
      <select v-model="transferSenderId">
          <option v-for="member in activeParty.members" v-bind:value="member.id" :key="member.id">
          {{ member.name }}
        </option>
      </select><br>
    </label>
    <label>
      Получатель:<br>
      <select v-model="transferReceiverId">
          <option v-for="member in activeParty.members" v-bind:value="member.id" :key="member.id">
          {{ member.name }}
        </option>
      </select><br>
    </label>

    <input type="button" value="Создать" @click="createTransferHandler" placeholder="Имя">
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import Transfer from '@/model/transfer'

  export default {
    name: "TransferForm",
    data() {
      return {
        transferNote: '',
        transferAmount: 0,
        transferSenderId: null,
        transferReceiverId: null,
      }
    },
    computed: {
      ...mapState('parties', ['activeParty']),
    },
    methods: {
      ...mapActions('parties', ['addTransfer']),

      async createTransferHandler() {
        const transfer = Transfer.create({
          party: this.activeParty,
          name: this.transferNote,
          amount: this.transferAmount,
          senderId: this.transferSenderId,
          receiverId: this.transferReceiverId,
        })
        this.addTransfer(transfer)
        this.resetInputs()
      },

      resetInputs() {
        this.transferNote = ''
        this.transferAmount = 0
        this.transferSenderId = null
        this.transferReceiverId = null
      }
    }
  }
</script>

<style scoped>

</style>