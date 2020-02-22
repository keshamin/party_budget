<template>
  <div>
    <transfers-list/>
    <transfers-form/>
  </div>
</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex'

  import TransfersList from "./TransfersList";
  import TransfersForm from "./TransfersForm";

  export default {
    name: "TransfersSection",
    components: {TransfersForm, TransfersList},
  }
</script>

<style scoped>

</style>