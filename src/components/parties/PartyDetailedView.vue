<script>
  import states from '@/model/party-states'
  import { textifyState } from '@/model/party-states'
  import {mapActions, mapState} from 'vuex'

  export default {
    name: "PartyDetailedView",
    beforeCreate() {
      this.states = states
    },
    data() { return {
      editMode: false,
      updatedParty: {},
      isLoading: false,
    }},
    computed: {
      ...mapState('parties', {party: 'activeParty'}),
      isCompleted() { return this.party.state === states.completed },
      isInProgress() { return this.party.state === states.inProgress }
    },
    methods: {
      ...mapActions('parties', [
        'removeParty',
        'updateParty',
        'changePartyState',
      ]),

      removePartyHandler() {
        this.removeParty(this.party.id)
      },

      startEdit() {
        this.updatedParty = Object.assign({}, this.party)
        this.editMode = true
      },

      async confirmEdit() {
        await this.updateParty(this.updatedParty)
        this.editMode = false
      },

      cancelEdit() {
        this.editMode = false
      },

      async changeState(state) {
        let updatedParty = Object.assign({}, this.party)
        updatedParty.state = state
        this.updateParty(updatedParty)
      },

      async moveToComplete() {
        await this.changeState(states.completed)
      },

      async moveToInProgress() {
        await this.changeState(states.inProgress)
      },
      textifyState
    },
  }
</script>

<template>
  <div>
    <h3 class="title">
      <span v-show="!editMode">
        {{ party.name }}
      </span>
      <span v-show="editMode">
        <input type="text" v-model.trim="updatedParty.name">
      </span>
      - 
      <span :class="{'is-in-progress': isInProgress, 'is-completed': isCompleted}">
        {{ textifyState(party.state) }}
      </span>
    </h3>

    <span v-show="!editMode">
      <button @click="startEdit">
        <ion-icon name="create"></ion-icon>
        Переименовать
      </button>

      <span v-show="party.state === states.inProgress">
        <button @click="moveToComplete">
          <ion-icon name="checkmark"></ion-icon>
          Завершить
        </button>
      </span>
      <span v-show="party.state !== states.inProgress">
        <button @click="moveToInProgress">
          <ion-icon name="hammer"></ion-icon>
          Вернуться к работе
        </button>
      </span>

      <button @click="removePartyHandler">
        <ion-icon name="ios-trash"></ion-icon>
        Удалить
      </button>
    </span>
    <span v-show="editMode">
      <button @click="confirmEdit">
        <ion-icon name="checkmark"></ion-icon>
        OK
      </button>
      <button @click="cancelEdit">
        <ion-icon name="close"></ion-icon>
        Отмена
      </button>
    </span>

  </div>
</template>

<style scoped lang="scss">
@import 'bulma/bulma.sass';

.is-in-progress {
  color: $warning;
}

.is-completed {
  color: $primary;
}

</style>