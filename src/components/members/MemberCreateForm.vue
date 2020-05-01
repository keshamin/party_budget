<template>
  <tr>
    <td colspan="2">
      <p>Новый участник</p>
      <input type="text" class="input" placeholder="Имя" v-model="memberName">
    </td>
    <td>
      <!-- Following p tag is for vertical aligning input and button -->
      <p>&nbsp;</p> 
      <button class="button" @click="createMemberHandler">
        <span class="icon">
          <i class="fas fa-plus"></i>
        </span>
        <span class="is-hidden-mobile">Добавить</span>
      </button>
    </td>
  </tr>
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
        const validationResult = this.validate()

        if (!validationResult.valid) { return }
        
        this.addMember(this.memberName)
        this.memberName = ''
      },

      validate() {
        let result = {valid: null, errors: []}
        if (!this.memberName.length > 0) {
          result.errors.push('Имя участника не может быть пустым!')
        }

        result.valid = result.errors.length > 0 ? false : true
        return result
      }
    }
  }
</script>

<style scoped lang="scss">
@import 'styles.scss';

.icon {
  @include mobile {
    margin: 0 auto !important;
  }
}
</style>
