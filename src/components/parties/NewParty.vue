<script>
import {mapActions} from 'vuex'

export default {
    name: "NewParty",
    methods: {
        ...mapActions('parties', ['createParty']),

        async onClick() {
            const today = new Date()
            const fmt = new Intl.NumberFormat('ru-RU', {minimumIntegerDigits: 2})
            const partyName = `Вечеринка ${fmt.format(today.getDate())}/${fmt.format(today.getMonth() + 1)}`
            const party = {name: partyName}
            await this.createParty(party)
        }
    }

}
</script>

<template>
<div class="box party-item new-party" @click="onClick">
    <span class="subtitle">  
        Новая вечеринка
    </span>
</div>
</template>

<style scoped lang="scss">
@import "styles.scss";

.new-party {
    border: 2px dashed $grey-light;
}
</style>