<template>
  <div>
    <ul>
      <li v-for="coefficient in editableCoefficients" :key="coefficient.id">
        <span v-if="columnGetter(coefficient[columnKey])">
          {{ getColumnRepr(columnGetter(coefficient[columnKey])) }}:
          <input type="number" v-model.number="coefficient.coefficient">
        </span>
      </li>
    </ul>
    <button @click="saveCoeffs">
      Сохранить
    </button>
  </div>
</template>

<script>
  import {mapGetters, mapState, mapActions} from 'vuex'
  import coefPaneModes from './coef-pane-modes'
  let _ = require('lodash')

  export default {
    name: "CoefficientsPane",
    props: ['mode', 'modeKey'],
    data() { return {
      editableCoefficients: [],
      originalCoefficients: [],
    }},

    computed: {
      ...mapGetters('coefficients', [
        'getCoefficientsBy',
        'coefficientsSum',
      ]),
      ...mapGetters({party: 'parties/selectedParty'}),
      ...mapGetters('members', [
        'getMemberById',
        'membersCount'
      ]),
      ...mapGetters('expenses', ['getExpenseById']),
      ...mapState('members', ['members']),
      ...mapState('expenses', ['expenses']),

      columnGetter() {
        if (this.mode === coefPaneModes.MEMBER) {
          return this.getExpenseById
        }
        if (this.mode === coefPaneModes.EXPENSE) {
          return this.getMemberById
        }
      },
      field() { return this.mode },
      columnKey() {
        if (this.mode === coefPaneModes.MEMBER) {
          return coefPaneModes.EXPENSE
        }
        if (this.mode === coefPaneModes.EXPENSE) {
          return coefPaneModes.MEMBER
        }
      },
    },

    methods: {
      ...mapActions('coefficients', ['updateCoefficient']),

      getMyCoefficients() {
        // Deep copying Vuex array is necessary
        this.editableCoefficients = _.cloneDeep(this.getCoefficientsBy(this.field, this.modeKey))
        this.originalCoefficients = _.cloneDeep(this.editableCoefficients)
      },

      getColumnRepr(columnObj) {
        if (this.mode === coefPaneModes.MEMBER) {
          return columnObj.note
        }
        if (this.mode === coefPaneModes.EXPENSE) {
          return columnObj.name
        }
      },

      saveCoeffs() {
        let updatedCoeffs = this.editableCoefficients.filter(
          (coeff, index) => coeff.coefficient !== this.originalCoefficients[index].coefficient
        )
        console.log(updatedCoeffs)
        updatedCoeffs.forEach(coeff => this.updateCoefficient(coeff))
      },
    },

    watch: {
      selectedPartyId: {
        immediate: true,
        handler: 'getMyCoefficients',
      },
      coefficientsSum: {
        handler: function () {
          this.getMyCoefficients()
        },
      },
    },

  }
</script>

<style scoped>

</style>