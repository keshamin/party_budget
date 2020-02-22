<template>
  <div v-if="activeParty !== null">
    <party-detailed-view/>
    <section-switch @section-switched="switchSection"/>
    <div class="info-area">
      <members-section v-show="sectionSwitchValue === sectionTypes.MEMBERS"/>
      <expenses-section v-show="sectionSwitchValue === sectionTypes.EXPENSES"/>
      <transfers-section v-show="sectionSwitchValue === sectionTypes.TRANSFERS"/>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions, mapGetters} from 'vuex'

  import SectionSwitch from "./SectionSwitch";
  import sectionTypes from './section-types'
  import MembersSection from "./members/MembersSection";
  import ExpensesSection from "./expenses/ExpensesSection";
  import TransfersSection from "./transfers/TransfersSection";
  import PartyDetailedView from "./parties/PartyDetailedView";

  export default {
    name: "DetailsArea",
    components: {PartyDetailedView, TransfersSection, ExpensesSection, MembersSection, SectionSwitch},
    data() {
      return {
        sectionTypes,
        sectionSwitchValue: sectionTypes.MEMBERS,
      }
    },
    computed: {
      ...mapState('parties', ['activeParty'])
      // ...mapState([
      //   'expensesInit',
      //   'membersInit',
      // ]),

      // ...mapState('expenses', ['expenses']),
      // ...mapGetters('expenses', ['expensesCount']),

      // ...mapState('members', ['members']),
      // ...mapGetters('members', ['membersCount']),
    },
    created() {
      // this.$eventHub.$on('coefficients-refresh-requested', () => this.refreshCoefficients())
    },
    methods: {
      // ...mapActions('coefficients', ['getCoefficients',]),

      switchSection: function (section) {
        this.sectionSwitchValue = section
      },

      // async refreshCoefficients() {
      //   if (this.isLoading) {
      //     // Already refreshing coefficients
      //     return
      //   }

      //   if (this.selectedPartyId !== null) {
      //     this.isLoading = true
      //     await this.getCoefficients()
      //     this.isLoading = false
      //   }
      // },
    },

    watch: {
      // selectedPartyId: {
      //   handler: 'refreshCoefficients',
      //   immediate: true,
      // },
      // expensesCount: {
      //   handler: function (val, oldVal) {
      //     if (!this.expensesInit) {
      //       console.log(`Coeffs refresh: expensesNum changed: ${oldVal} -> ${val}`)
      //       this.refreshCoefficients()
      //     }
      //   },
      // },
      // membersCount: {
      //   handler: function (val, oldVal) {
      //     if (!this.membersInit) {
      //       console.log(`Coeffs refresh: membersNum changed: ${oldVal} -> ${val}`)
      //       this.refreshCoefficients()
      //     }
      //   },
      // },
    },
  }
</script>

<style scoped>

</style>