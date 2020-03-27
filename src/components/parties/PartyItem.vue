<template>
  <div @click="selectParty(party.id)" class="clickable party-item">
    <span class="party-title">{{ party.name }}</span>
    <!-- <span v-if="activeParty && activeParty.id === party.id"> <--- </span> -->
  </div>
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

<style scoped lang="scss">
@import "styles.scss";

.party-item {
  margin-right: 10px;
  padding: 10px;


  border: 1px solid $darkgreen;
  border-radius: 0.25em;


}

.party-title {
  color: $darkgreen;
  font-weight: bold;
}

</style>