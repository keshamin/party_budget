<template>
    <ul>
      <li v-for="section in sections" :key="section.type">
        <div @click="$emit('section-switched', section.type)" class="clickable">
          {{ section.label }}
        </div>
      </li>
    </ul>
</template>

<script>
  import sectionTypes from '@/components/section-types'

  export default {
    name: "SectionSwitch",
    data() { return {
      sections: [
        {type: sectionTypes.MEMBERS, label: 'Участники'},
        {type: sectionTypes.EXPENSES, label: 'Расходы'},
        {type: sectionTypes.TRANSFERS, label: 'Переводы'},
      ]
    }},
  }
</script>

<style scoped>

</style>