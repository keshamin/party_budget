<template>
  <div v-show="coefficients.length">
    <ul>
      <li v-for="coefficient in editableCoefficients" :key="coefficient.id">
        <span v-if="columnGetter(coefficient[columnKey])">
          {{ getColumnRepr(columnGetter(coefficient[columnKey])) }}:
          <input type="number" v-model.number="coefficient.coeff">
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

    created() {
      this.getMyCoefficients()
    },

    computed: {
      ...mapGetters('parties', [
        'getMemberById',
        'getExpenseById',
        'getCoefficientsBy',
        'coefficientsSum',
      ]),
      coefficients() {
        return this.getCoefficientsBy(this.field, this.modeKey)
      },

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
      ...mapActions('parties', ['updateCoefficients']),

      getMyCoefficients() {
        // Deep copying Vuex array is necessary
        this.editableCoefficients = _.cloneDeep(this.getCoefficientsBy(this.field, this.modeKey))
        this.originalCoefficients = _.cloneDeep(this.editableCoefficients)
      },

      getColumnRepr(columnObj) {
        if (this.mode === coefPaneModes.MEMBER) {
          return columnObj.name
        }
        if (this.mode === coefPaneModes.EXPENSE) {
          return columnObj.name
        }
      },

      saveCoeffs() {
        let updatedCoeffs = this.editableCoefficients.filter(
          (coeff, index) => coeff.coeff !== this.originalCoefficients[index].coeff
        )
        this.updateCoefficients(updatedCoeffs)
      },
    },

    watch: {
      // This watch is for when coeffs are edited via some other section
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