<template>
  <span v-if="member">
    <li>
      <span v-show="!editMode">
        {{ expense.name }}
      </span>
      <span v-show="editMode">
        <input type="text" v-model.trim="updatedExpense.name">
      </span>,
      <span v-show="!editMode">
        {{ expense.amount }}
      </span>
      <span v-show="editMode">
        <input type="text" v-model.number="updatedExpense.amount">
      </span>,
      <span v-show="!editMode">
        {{ member.name }}
      </span>
      <span v-show="editMode">
        <select v-model.number="updatedExpense.paidById">
          <option v-for="member in activeParty.members" v-bind:value="member.id" :key="member.id">
            {{ member.name }}
          </option>
        </select>
      </span>

      <span v-show="!editMode">
        <ion-icon name="create" @click="startEdit"></ion-icon>
        <ion-icon name="ios-trash" @click="removeExpenseHandler"></ion-icon>
      </span>

      <span v-show="editMode">
        <ion-icon name="checkmark" @click="confirmEdit"></ion-icon>
        <ion-icon name="close" @click="cancelEdit"></ion-icon>
      </span>

      <coefficients-pane :mode="coefPaneModes.EXPENSE" :mode-key="expense.id"/>
    </li>
  </span>
</template>

<script>
  import {mapGetters, mapActions, mapState} from 'vuex'
  import coefPaneModes from '../coefficients/coef-pane-modes'
  import CoefficientsPane from "../coefficients/CoefficientsPane";

  export default {
    name: "ExpenseItem",
    components: {CoefficientsPane},
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

<style scoped>

</style>