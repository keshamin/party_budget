<template>
<tbody>
  <tr>
    <td colspan="3" style="border-bottom: unset">
      Новый участник
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <input type="text" class="input" placeholder="Имя" v-model="memberName">
    </td>
    <td>
      <button class="button" @click="createMemberHandler">
        <span class="icon">
          <i class="fas fa-plus"></i>
        </span>
        <span class="is-hidden-mobile">Добавить</span>
      </button>
    </td>
  </tr>
</tbody>
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

tr:last-child td {
  border-bottom: 1px solid rgb(219, 219, 219) !important;
}

</style>
