<template>
  <div v-if="activeParty !== null" style="padding-bottom: 50px">
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

<style lang="scss">

table {
  td p, th p {
    // width: 25%;
    display: inline-block;
    word-break: break-word;
  }

  tr th:last-child{
    width:1%;
    white-space:nowrap;
  }

  div.select {
    max-width: 100%;
  }

  input, select {
    font-size: inherit !important;
  }
  button {
    font-size: inherit !important;
  }

  select {
    padding-top: calc(0.5em - 1px) !important;
    padding-bottom: calc(0.5em - 1px) !important;
  }
}

</style>