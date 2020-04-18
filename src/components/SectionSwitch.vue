<template>
  <div class="tabs is-fullwidth is-medium is-boxed">
    <ul>
      <li v-for="section in sections" :key="section.type" :class="{'is-active': section.type === activeSection}">
        <a @click="switchSection(section.type)">
          <span>{{ section.label }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import sectionTypes from "@/components/section-types";
import {mapActions, mapState} from 'vuex';

export default {
  name: "SectionSwitch",
  data() {
    return {
      sections: [
        { type: sectionTypes.MEMBERS, label: "Участники" },
        { type: sectionTypes.EXPENSES, label: "Расходы" },
        { type: sectionTypes.TRANSFERS, label: "Переводы" }
      ]
    };
  },
  computed: {
    ...mapState('app', ['activeSection'])
  },
  methods: {
    ...mapActions('app', ['switchSection'])
  }
};
</script>

<style scoped>
.tabs {
  margin-top: 1.2rem; 
}
</style>