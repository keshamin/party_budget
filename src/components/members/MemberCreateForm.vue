<template>
  <div>
    Новый участник<br>
    <label>
        Имя:<br>
        <input type="text" v-model="memberName">
    </label>
    <input type="button" value="Создать" @click="createMemberHandler" placeholder="Имя">
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'

  export default {
    name: "MemberCreateForm",
    data() { return {
      memberName: '',
    }},
    computed: {
      ...mapState('parties', ['activeParty'])
    },
    methods: {
      ...mapActions('parties', ['addMember']),

      createMemberHandler() {
        this.addMember(this.memberName)
        this.memberName = ''
      }
    }
  }
</script>

<style scoped>

</style>