<template>
  <li>
    <span v-if="sender && receiver">
      <span v-show="!editMode">
        {{sender.name}}
      </span>
      <span v-show="editMode">
        <select v-model.number="updatedTransfer.senderId">
          <option v-for="member in activeParty.members" v-bind:value="member.id" :key="member.id">
            {{ member.name }}
          </option>
        </select>
      </span>-->

      <span v-show="!editMode">
        {{receiver.name}}
      </span>
      <span v-show="editMode">
        <select v-model.number="updatedTransfer.receiverId">
          <option v-for="member in activeParty.members" v-bind:value="member.id" :key="member.id">
            {{ member.name }}
          </option>
        </select>
      </span>,

      <span v-show="!editMode">
        {{transfer.amount}}
      </span>
      <span v-show="editMode">
        <input type="text" v-model.number="updatedTransfer.amount">
      </span>,

      <span v-show="!editMode">
        {{transfer.name}}
      </span>
      <span v-show="editMode">
        <input type="text" v-model.trim="updatedTransfer.name">
      </span>

      <span v-show="!editMode">
        <ion-icon name="create" @click="startEdit"></ion-icon>
        <ion-icon name="ios-trash" @click="removeTransferHandler"></ion-icon>
      </span>
      <span v-show="editMode">
        <ion-icon name="checkmark" @click="confirmEdit"></ion-icon>
        <ion-icon name="close" @click="cancelEdit"></ion-icon>
      </span>
    </span>
  </li>
</template>

<script>
  import {mapGetters, mapActions, mapState} from 'vuex'

  export default {
    name: "TransfersItem",
    props: ['transfer'],
    data() { return {
      editMode: false,
      updatedTransfer: {},
    }},
    computed: {
      ...mapState('parties', ['activeParty']),
      ...mapGetters('parties', ['getMemberById',]),

      sender() {
        if (this.transfer){
          return this.getMemberById(this.transfer.senderId)
        }
      },
      receiver() {
        if (this.transfer){
          return this.getMemberById(this.transfer.receiverId)
        }
      }
    },
    methods: {
      ...mapActions('parties', [
        'removeTransfer',
        'updateTransfer',
      ]),

      removeTransferHandler() {
        this.removeTransfer(this.transfer.id)
      },

      startEdit() {
        this.editMode = true
        this.updatedTransfer = Object.assign({}, this.transfer)
      },

      confirmEdit() {
        this.updateTransfer(this.updatedTransfer)
        this.editMode = false
      },

      cancelEdit() {
        this.editMode = false

      },
    }

  }
</script>

<style scoped>

</style>