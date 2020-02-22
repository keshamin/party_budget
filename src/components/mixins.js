export const withMembersMixin = {
  props: ['members'],
  methods: {
    getMemberById(memberId) {
      return this.members.find(member => member.id === memberId);
    }
  }
};