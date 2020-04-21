<script>
  import {mapState} from 'vuex'
  import coefPaneModes from "../coefficients/coef-pane-modes"
  
  import MemberItem from "./MemberItem"
  import MemberCreateForm from "./MemberCreateForm";
  
  export default {
    name: "MembersSection",
    components: {
      MemberItem,
      MemberCreateForm,
    },
    data() { return {
      coefPaneModes,
      coeffPaneSwitches: {},
    }},
    computed: {
      ...mapState('parties', {party: 'activeParty'}),
      members() { return this.party.members }
    },
  }
</script>

<template>
  <table class="table is-fullwidth">
    <tr>
      <th>Имя</th>
      <th>Сколько я должен?</th>
      <th></th>
    </tr>
    <member-item v-for="member in party.members" :member="member" :key="member.id"/>
    <member-create-form/>
  </table>
</template>

<style scoped lang="scss">
@import 'styles.scss';

table {
  @include mobile {
    font-size: 1.3rem;
  }
}
</style>
