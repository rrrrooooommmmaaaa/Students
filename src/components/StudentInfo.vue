<template>
    <div class="info" style="display: flex;" :class="theme === 0 ? 'dark' : 'light'">
        <th><img :src="student.photo" @click="activeModal = true"></th>
        <div style="margin-top: 72px;">
            <label><p class="bdy">{{ "Имя: " + student.name }}</p></label>
            <label><p class="bdy">Выполнение ПР: <input type="checkbox" v-model="student.isDonePr" disabled=true></p></label>
            <label><p class="bdy">{{ "Группа: " + student.group }}</p></label>
            <label><p class="bdy">{{ "Оценка: " + student.mark }}</p></label>
            <label><br><br><p class="bdy">{{ "Количество студентов уже в другом комоненте → " + count }}</p></label>
            <modal v-if="activeModal" @close="activeModal = false">
                <img slot="body" :src="student.photo" alt="Фото студента">
            </modal>
        </div>
        
    </div>
</template>

<script>
    import axios from 'axios'
    import Modal from './Modal.vue'

    export default {
        components: { Modal },
        props: {
            id: '',
        },
        data() {
            return {
                student: {},
                activeModal: false,
            }
        },
        computed: {
            count() {
                return this.$store.getters.getCount
            },
            theme() {
                return this.$store.getters.getTheme
            }
        },
        methods: {
            setCount(value) {
                this.$store.commit('setCount', value);
            },
        },
        mounted() {
            axios.get("http://46.101.212.195:3000/students/" + this.id).then((response) => this.student = response.data)
        }
    }
</script>