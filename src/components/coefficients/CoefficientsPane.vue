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

<template>
  <tr v-show="coefficients.length" class="coef-row">
    <td colspan="3">
      <p class="has-text-grey has-text-weight-semibold	">Коэффициенты участия</p>
      <div class="columns">
        <div class="column">
          <div class="columns is-multiline">
            <div class="column field" v-for="coefficient in editableCoefficients" :key="coefficient.id">
              <div class="label has-text-centered">
                {{ getColumnRepr(columnGetter(coefficient[columnKey])) }}
              </div>
              <div class="control is-centered">
                <input type="number" class="input" v-model.number="coefficient.coeff">
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <button class="button" @click="saveCoeffs">
            <span class="icon">
              <i class="fas fa-check"></i>
            </span>
            <span>Сохранить</span>
          </button>
        </div>
      </div>
    </td>
  </tr>
</template>

<style scoped lang="scss">
.field {
  display: inline-block;
  /* margin-right: 1rem; */

}
.control {
  max-width: 50px;
  margin: 0 auto;
}
.label {
  font-weight: unset;
}

.coef-row {
  border: 1px solid #dbdbdb;
  border-width: 0 0 1px;
}
</style>
