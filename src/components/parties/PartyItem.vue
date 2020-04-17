<script>
  import {mapState, mapActions} from 'vuex'
  import PartyState from '../../model/party-states'

  export default {
    name: "PartyItem",
    props: ['party'], 
    computed: {
      ...mapState('parties', ['activeParty']),
      isSelected() { return this.activeParty && this.activeParty.id === this.party.id },
      isCompleted() { return this.party.state === PartyState.completed },
      isInProgress() { return this.party.state === PartyState.inProgress },
    },
    methods: {
      ...mapActions('parties', ['selectParty'])
    }
  }
</script>

<template>
  <div @click="selectParty(party.id)" class="clickable box party-item"
   :class="{'is-selected': isSelected, 'is-completed': isCompleted, 'is-in-progress': isInProgress}">
    <span class="subtitle">  
      {{ party.name }}
    </span>
    <!-- <span v-if="activeParty && activeParty.id === party.id"></span> -->
  </div>
</template>

<style scoped lang="scss">
@import 'styles.scss';
.party-item {
  border: 2px solid $dark;

  &.is-selected {
    border-width: 4px;
    & > .subtitle {
      @extend .is-size-4;
      @extend .has-text-weight-bold;
    }
  }
  &.is-completed {
    border-color: $primary;
  }
  &.is-in-progress {
    border-color: $warning;
  }
}

</style>
