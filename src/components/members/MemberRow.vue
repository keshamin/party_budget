<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
import coefPaneModes from "../coefficients/coef-pane-modes"

export default {
  name: "MemberRow",
  props: ['member'],
  data() { return {
    updatedMember: {},
    editMode: false,
    coefPaneModes: coefPaneModes,
  }},
  computed: {
    ...mapGetters('parties', ['getMemberTotalDue']),
    totalDue() { 
      return this.getMemberTotalDue(this.member.id)
    }
  },
  methods: {
    ...mapActions('parties', [
      'removeMember',
      'renameMember',
      'updateMember',
      ]),

    async removeMemberHandler() {
      await this.removeMember(this.member.id)
    },

    startEdit() {
      this.updatedMember = Object.assign({}, this.member)
      this.editMode = true
    },

    confirmEdit() {
      this.updateMember(this.updatedMember)
      this.editMode = false
    },

    cancelEdit() {
      this.editMode = false
    },
  }
}
</script>

<template>
  <tr>
    <td>
      <span v-show="!editMode">{{member.name}}</span>
      <span v-show="editMode"><input type="text" class="input" v-model="updatedMember.name"></span>
    </td>
    <td>
      {{totalDue.toFixed(2)}}
    </td>
    <td>
      <span v-show="!editMode">
        <div class="field is-grouped">
          <!-- <p class="control">
            <button class="button" @click="$emit('switch-coeffs')">
              <span class="icon">
                <i class="fas fa-percentage"></i>
              </span>
              <span class="is-hidden-mobile">Коэффициенты</span>
            </button>
          </p> -->
          <!-- <p class="control">
            <button class="button" @click="startEdit">
              <span class="icon">
                <i class="fas fa-edit"></i>
              </span>
              <span class="is-hidden-mobile">Редактировать</span>
            </button>
          </p>
          <p class="control">
            <button class="button" @click="removeMemberHandler">
              <span class="icon">
                <i class="fas fa-trash"></i>
              </span>
              <span class="is-hidden-mobile">Удалить</span>
            </button>
          </p> -->
          <div class="dropdown is-right is-hoverable post-options">
            <div class="dropdown-trigger">
              <button class="button" aria-haspopup="true" aria-controls="dropdown-menu-post">
                <span class="icon is-small">
                  <i class="fas fa-ellipsis-h" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu-post" role="menu">
              <div class="dropdown-content">
                <a class="dropdown-item is-size-5" @click="$emit('switch-coeffs')">
                  <span class="icon">
                    <i class="fas fa-percentage"></i>
                  </span>
                  <span>
                    &nbsp;Коэффициенты
                  </span>
                </a>
                <a class="dropdown-item is-size-5" @click="startEdit">
                  <span class="icon">
                    <i class="fas fa-edit"></i>
                  </span>
                  &nbsp;Переименовать
                </a>
                <a class="dropdown-item is-size-5" @click="removeMemberHandler">
                  <span class="icon">
                    <i class="fas fa-trash"></i>
                  </span>
                  &nbsp;Удалить
                </a>
              </div>
            </div>
          </div>
        </div>
      </span>
      <span v-show="editMode">
        <div class="field is-grouped">
          <p class="control">
            <button class="button" @click="confirmEdit">
              <span class="icon">
                <i class="fas fa-check"></i>
              </span>
              <span class="is-hidden-mobile">ОК</span>
            </button>
          </p>
          <p class="control">
            <button class="button" @click="cancelEdit">
              <span class="icon">
                <i class="fas fa-times"></i>
              </span>
              <span class="is-hidden-mobile">Отмена</span>
            </button>
          </p>
        </div>
      </span>
    </td>
  </tr>
</template>

<style scoped lang="scss">
@import 'styles.scss';

.icon {
  @include mobile {
    margin: 0 auto !important;
  }
}
</style>
