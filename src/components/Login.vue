<template>
    <div>
        <input v-model="input" type="text" placeholder="Введите имя студента" required />
        <button @click="login">Войти</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            input: '',
        }
    },
    methods: {
        login() {
            axios.get("http://46.101.212.195:3000/students/name/"+this.input).then((response) => {
                if((response.data === null) || (response.data.name == "CastError")) {
                    return
                }
                this.$store.commit('setUser', response.data)
                this.$router.push('/');
            })
        }
    }
}
</script>

<style module>
</style>