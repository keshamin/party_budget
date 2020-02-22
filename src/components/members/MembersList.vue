<template>
  <ul>
    <member-item v-for="member in party.members" :member="member" :key="member.id"/>
  </ul>
</template>

<script>
  import {mapState} from 'vuex'

  import MemberItem from "./MemberItem";
  export default {
    name: "MembersList",
    components: {MemberItem},
    computed: {
      ...mapState('parties', {party: 'activeParty'}),
    },
  }
</script>

<style scoped>

</style>
