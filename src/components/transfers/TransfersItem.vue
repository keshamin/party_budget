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
        return null
      },
      receiver() {
        if (this.transfer){
          return this.getMemberById(this.transfer.receiverId)
        }
        return null
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

<template>
<tr>
  <td v-show="!editMode">
    <p>{{sender.name}}</p>
    
  </td>
  <td v-show="!editMode">
    <p>{{receiver.name}}</p>
    
  </td>
  <td v-show="!editMode">
    <p>{{transfer.amount}}</p>
    
  </td>
  <td v-show="!editMode">
    <p>{{transfer.name}}</p>
    
  </td>
  <td colspan="4" v-show="editMode">
    <div class="edit-fields-row">
      <div class="field">
        <div class="label">
          Кто
        </div>
        <div class="control">
          <div v-show="editMode" class="select">
            <select v-model.number="updatedTransfer.senderId">
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
          <div v-show="editMode" class="select">
            <select v-model.number="updatedTransfer.receiverId">
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
          <input v-show="editMode" type="text" class="input" v-model.number="updatedTransfer.amount">
        </div>
      </div>
      <div class="field">
        <div class="label">
          Заметка
        </div>
        <div class="control">
          <input v-show="editMode" type="text" class="input" v-model.trim="updatedTransfer.name">
        </div>
      </div>
    </div>
  </td>

  <td>
    <span v-show="!editMode">
      <div class="field is-grouped">
        <div class="dropdown is-right is-hoverable post-options">
          <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu-post">
              <span class="icon is-small">
                <i class="fas fa-ellipsis-h" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu-post" role="menu">
            <div class="dropdown-content">
              <a class="dropdown-item is-size-5" @click="startEdit">
                <span class="icon">
                  <i class="fas fa-edit"></i>
                </span>
                &nbsp;Редактировать
              </a>
              <a class="dropdown-item is-size-5" @click="removeTransferHandler">
                <span class="icon">
                  <i class="fas fa-trash"></i>
                </span>
                &nbsp;Удалить
              </a>
            </div>
          </div>
        </div>
      </div>
    </span>
    <span v-show="editMode" class="yn-buttons">
      <div class="field">
        <div class="label">&nbsp;</div>
        <button class="button" @click="confirmEdit">
          <span class="icon">
            <i class="fas fa-check"></i>
          </span>
          <span class="is-hidden-mobile">ОК</span>
        </button>
        <button class="button" @click="cancelEdit">
          <span class="icon">
            <i class="fas fa-times"></i>
          </span>
          <span class="is-hidden-mobile">Отмена</span>
        </button>
      </div>
    </span>
  </td>
</tr>
</template>

<style scoped lang="scss">
@import 'styles.scss';

.icon {
  @include mobile {
    margin: 0 auto !important;
  }
}

.yn-buttons button {
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: unset;
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
</style>
