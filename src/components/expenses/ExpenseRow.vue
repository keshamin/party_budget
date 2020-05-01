<script>
  import {mapGetters, mapActions, mapState} from 'vuex'
  import coefPaneModes from '../coefficients/coef-pane-modes'

  export default {
    name: "ExpenseRow",
    props: ['expense'],
    data() { return {
      editMode: false,
      updatedExpense: {},
      coefPaneModes,
    }},
    async created() {
    }, 
    computed: {
      ...mapState('parties', ['activeParty']),
      ...mapGetters('parties', ['getMemberById', 'getExpenseFeePerLogicalMember']),
      member() {
        return this.getMemberById(this.expense.paidById)
      }
    },
    methods: {
      ...mapActions('parties', [
        'removeExpense',
        'updateExpense',
      ]),

      removeExpenseHandler() {
        this.removeExpense(this.expense.id)
      },

      startEdit() {
        this.editMode = true
        this.updatedExpense = Object.assign({}, this.expense)
      },

      confirmEdit() {
        this.updateExpense(this.updatedExpense)
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
    <td>
      <p v-show="!editMode">{{expense.name}}</p>
      <input v-show="editMode" type="text" class="input" v-model.trim="updatedExpense.name">
    </td>
    <td>
      <p v-show="!editMode">{{expense.amount}}</p>
      <input v-show="editMode" type="text" class="input" v-model.number="updatedExpense.amount">
    </td>
    <td>
      <p v-show="!editMode">{{ member.name }}</p>
      <div v-show="editMode" class="select">
        <select v-model.number="updatedExpense.paidById">
          <option v-for="member in activeParty.members" v-bind:value="member.id" :key="member.id">
            {{ member.name }}
          </option>
        </select>
      </div>
    </td>
    <td>
      <span v-show="!editMode">
        <div class="field is-grouped">
          <!-- <p class="control">
            <button class="button" @click="$emit('switch-coeffs')">
              <span class="icon">
                <i class="fas fa-percentage"></i>
              </span>
              <span class="is-hidden-mobile">Коэффициенты</span>
            </button>
          </p> -->
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
                <a class="dropdown-item is-size-5" @click="$emit('switch-coeffs')">
                  <span class="icon">
                    <i class="fas fa-percentage"></i>
                  </span>
                  <span>
                    &nbsp;Коэффициенты
                  </span>
                </a>
                <a class="dropdown-item is-size-5" @click="startEdit">
                  <span class="icon">
                    <i class="fas fa-edit"></i>
                  </span>
                  &nbsp;Редактировать
                </a>
                <a class="dropdown-item is-size-5" @click="removeExpenseHandler">
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



</style>