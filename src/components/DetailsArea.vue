<template>
  <div v-if="activeParty !== null">
    <party-detailed-view/>
    <section-switch/>
    <div class="info-area">
      <members-section v-show="activeSection === sectionTypes.MEMBERS"/>
      <expenses-section v-show="activeSection === sectionTypes.EXPENSES"/>
      <transfers-section v-show="activeSection === sectionTypes.TRANSFERS"/>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

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
      ...mapState('parties', ['activeParty']),
      ...mapState('app', ['activeSection'])
    },
  }
</script>

<style scoped>

</style>