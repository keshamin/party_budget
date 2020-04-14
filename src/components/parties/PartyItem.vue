<template>
  <li>
    <div @click="selectParty(party.id)" class="clickable">
      ({{ party.id }}) {{ party.name }}
      <span v-if="activeParty && activeParty.id === party.id"> <--- </span>
    </div>
  </li>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    name: "PartyItem",
    computed: {
      ...mapState('parties', ['activeParty'])
    },
    props: ['party'],
    methods: {
      ...mapActions('parties', ['selectParty'])
    }
  }
</script>

<style scoped>

</style>