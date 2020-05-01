<script>
import ExpenseRow from './ExpenseRow'
import CoefficientsPane from './../coefficients/CoefficientsPane'
import coefPaneModes from './../coefficients/coef-pane-modes'

export default {
    name: 'ExpenseItem',
    components: {
        ExpenseRow, 
        CoefficientsPane
    },
    props: ['expense'],
    data() { return {
        showCoeffs: false,
        coefPaneModes
    }},
    methods: {
        switchCoeffs() {
            this.showCoeffs = !this.showCoeffs
        }
    }
}
</script>

<template>
<tbody>
    <expense-row :expense="expense" @switch-coeffs="switchCoeffs"/>
    <coefficients-pane v-show="showCoeffs" :mode="coefPaneModes.EXPENSE" :mode-key="expense.id"
        :colspan="4"/>
</tbody>
</template>
