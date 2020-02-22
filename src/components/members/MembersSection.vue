<template>
  <div>
    <div v-show="isLoading" class="loading">Loading...</div>
    <members-list/>
    <member-create-form/>
  </div>
</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex'

  import MembersList from "./MembersList";
  import MemberCreateForm from "./MemberCreateForm";

  export default {
    name: "MembersSection",
    components: {MembersList, MemberCreateForm},
    data() { return {
      isLoading: false,
    }},
    computed: {
      // ...mapState([
      //   'expensesInit',
      //   'transfersInit',
      // ]),
      // ...mapState('members', ['members']),
      ...mapState('parties', ['activeParty']),
      // ...mapState('expenses', ['expenses']),
      // ...mapState('transfers', ['transfers']),
      // ...mapState('coefficients', ['coefficients']),

      totalExpense() {
        return this.activeParty.expenses.reduce((result, value) => result + value.price, 0)
      },
      totalTransfers() {
        return this.activeParty.transfers.reduce((result, value) => result + value.amount, 0)
      }
    },
    methods: {
      // ...mapMutations([
      //   'startMembersInit',
      //   'finishMembersInit',
      // ]),
      // ...mapMutations('members', ['resetMembers']),
      // ...mapActions('members', ['getMembers']),

      // async refreshMembers() {
      //   // Resets members list to [] and fills it
      //   this.resetMembers()
      //   await this.updateMembers()
      // },

      // async updateMembers() {
      //   // Just replaces current members list with an actual one from server
      //   if (this.selectedPartyId !== null) {
      //     this.isLoading = true
      //     await this.getMembers()
      //     this.isLoading = false
      //   }
      // },
    },

    async created() {
      // this.startMembersInit()
      // await this.refreshMembers()
      // this.finishMembersInit()
    },

    watch: {
    //   selectedPartyId: {
    //     handler: function (val, oldVal) {
    //       console.log(`Members refresh: partyId changed: ${oldVal} -> ${val}`)
    //       this.refreshMembers()
    //     },
    //   },
    //   totalExpense: {
    //     handler: function (val, oldVal) {
    //       if (!this.expensesInit) {
    //         console.log(`Members refresh: totalExpense changed: ${oldVal} -> ${val}`)
    //         this.updateMembers()
    //       }
    //     },
    //   },
    //   totalTransfers: {
    //     handler: function (val, oldVal) {
    //       if (!this.transfersInit) {
    //         console.log(`Members refresh: totalTransfers changed: ${oldVal} -> ${val}`)
    //         this.updateMembers()
    //       }
    //     },
    //   },
    //   coefficients: {
    //     // Refresh members if only some of coefficients values changed
    //     handler: function (val, oldVal) {
    //       if (val.length === oldVal.length) {
    //         this.updateMembers()
    //       }
    //     },
    //     // deep: true,
    //   },
    },
  }
</script>

<style scoped>

</style>