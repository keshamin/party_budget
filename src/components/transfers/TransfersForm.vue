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
        const validationResult = this.validate()

        if (!validationResult.valid) { return }

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
      },

      validate() {
        let result = {valid: null, errors: []}

        if (!this.transferAmount > 0) {
          result.errors.push('Сумма перевода должна быть больше 0!')
        }

        if (this.transferSenderId === null) {
          result.errors.push('Выберите отправителя перевода!')
        }

        if (this.transferReceiverId === null) {
          result.errors.push('Выберите получателя перевода!')
        }

        if (this.transferReceiverId === this.transferSenderId) {
          result.errors.push('Отправитель и получатель перевода не должны совпадать!')
        }

        result.valid = result.errors.length > 0 ? false : true
        return result
      },
    }
  }
</script>

<template>
<tbody>
  <tr>
    <td colspan="5" style="border-bottom: unset">
      Новый перевод
    </td>
  </tr>
  <tr>
    <td colspan="4">
      <div class="edit-fields-row">
        <div class="field">
          <div class="label">
            Кто
          </div>
          <div class="control">
            <div class="select">
              <select v-model.number="transferSenderId">
                <option v-for="member in activeParty.members" v-bind:value="member.id" :key="member.id">
                  {{ member.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="label">
            Кому
          </div>
          <div class="control">
            <div class="select">
              <select v-model.number="transferReceiverId">
                <option v-for="member in activeParty.members" v-bind:value="member.id" :key="member.id">
                  {{ member.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="edit-fields-row">
        <div class="field">
          <div class="label">
            Сколько
          </div>
          <div class="control">
            <input type="text" class="input" v-model.number="transferAmount">
          </div>
        </div>
        <div class="field">
          <div class="label">
            Заметка
          </div>
          <div class="control">
            <input type="text" class="input" v-model.trim="transferNote">
          </div>
        </div>
      </div>
    </td>
    <td>
      <div class="field">
        <div class="label">&nbsp;</div>
        <button class="button" @click="createTransferHandler">
        <span class="icon">
          <i class="fas fa-plus"></i>
        </span>
        <span class="is-hidden-mobile">Добавить</span>
      </button>
      </div>
      
    </td>
  </tr>
</tbody>
  <!-- <div>
    Новый перевод<br>
    <label>
      Заметка:<br>
      <input type="text" v-model="transferNote"><br>
    </label>
    <label>
      Сумма:<br>
      <input type="number" v-model.number="transferAmount"><br>
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
  </div> -->
</template>


<style scoped lang="scss">
@import 'styles.scss';

.icon {
  @include mobile {
    margin: 0 auto !important;
  }
}

.edit-fields-row {
  display: flex;

  & > div {
    flex: 1;

    & > input, select {
      width: 100% !important;
    }
  }

  & > div:not(:last-child) {
    padding-right: 0.5rem;
  }
}

tr:last-child td {
  border-bottom: 1px solid rgb(219, 219, 219) !important;
}

</style>