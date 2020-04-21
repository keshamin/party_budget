<script>
import MemberRow from './MemberRow'
import CoefficientsPane from './../coefficients/CoefficientsPane'
import coefPaneModes from './../coefficients/coef-pane-modes'

export default {
    name: 'MemberItem',
    components: {
        MemberRow, 
        CoefficientsPane
    },
    props: ['member'],
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
    <member-row :member="member" @switch-coeffs="switchCoeffs"/>
    <coefficients-pane v-show="showCoeffs" :mode="coefPaneModes.MEMBER" :mode-key="member.id"/>
</tbody>
</template>
