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
        <input class="input is-large" type="text" v-model.trim="updatedParty.name">
      </span>
    </h3>
    <p class="subtitle is-uppercase has-text-weight-bold	">
      <span :class="{'is-in-progress': isInProgress, 'is-completed': isCompleted}">
        {{ textifyState(party.state) }}
      </span>
    </p>

    <span v-show="!editMode">
      <div class="buttons">
        <button class="button is-medium" @click="startEdit">
          <span class="icon">
            <i class="fas fa-edit"></i>
          </span>
          <span>Переименовать</span>
        </button>

        <button class="button is-medium" :class="{'is-hidden':	party.state === states.completed}" @click="moveToComplete">
          <span class="icon">
            <i class="fas fa-check"></i>
          </span>
          <span>Завершить</span>
        </button>

        <button class="button is-medium" :class="{'is-hidden':	party.state === states.inProgress}" @click="moveToInProgress">
          <span class="icon">
            <i class="fas fa-wrench"></i>
          </span>
          <span>Вернуться к работе</span>
        </button>
        
        <button class="button is-medium" @click="removePartyHandler">
          <span class="icon">
              <i class="fas fa-trash"></i>
            </span>
            <span>Удалить</span>
        </button>
      </div>
    </span>
    <span v-show="editMode">
      <button class="button" @click="confirmEdit">
        <span class="icon">
            <i class="fas fa-check"></i>
          </span>
          <span>ОК</span>
      </button>
      <button class="button" @click="cancelEdit">
        <span class="icon">
            <i class="fas fa-times"></i>
          </span>
          <span>Отмена</span>
      </button>
    </span>

  </div>
</template>

<style scoped lang="scss">
@import 'styles.scss';

h3 {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
}

.is-in-progress {
  color: $dark-yellow;
}

.is-completed {
  color: $primary;
}

</style>