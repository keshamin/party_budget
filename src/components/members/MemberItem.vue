<template>
  <li>
    <span v-show="!editMode">{{member.name}}</span>
    <span v-show="editMode"><input type="text" v-model="updatedMember.name"></span>
    Total Due: {{totalDue.toFixed(2)}}

    <span v-show="!editMode">
      <ion-icon name="create" @click="startEdit"></ion-icon>
      <ion-icon name="ios-trash" @click="removeMemberHandler"></ion-icon>
    </span>
    <span v-show="editMode">
      <ion-icon name="checkmark" @click="confirmEdit"></ion-icon>
      <ion-icon name="close" @click="cancelEdit"></ion-icon>
    </span>
    <coefficients-pane :mode="coefPaneModes.MEMBER" :mode-key="member.id"/>
  </li>
</template>

<script>
  import {mapActions, mapMutations, mapGetters} from 'vuex'
  import CoefficientsPane from "../coefficients/CoefficientsPane";
  import coefPaneModes from "../coefficients/coef-pane-modes"

  export default {
    name: "MemberItem",
    components: {CoefficientsPane},
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

<style scoped>

</style>
