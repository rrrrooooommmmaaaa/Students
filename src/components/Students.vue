<template>
    <div class="bdy" :class="theme === 0 ? 'dark' : 'light'">
        <button class="toggle" @click="toggleTheme">Переключить тему этой страницы</button>
        <button @click="logout()">Выйти</button><br>
        <!-- реализация поиска по ФИО -->
        <div class="form-group">
            <input type="text" id="dynamic-label-input" v-model="search" placeholder="Поиск по ФИО">
            <label for="dynamic-label-input">Можно и поискать =)</label>
        </div>
        <table>
            <tr>
                    <th>Фото</th>
                    <th>Имя</th>
                    <th>Выполнение ПР</th>
                    <th>Группа</th>
                    <th>Оценка</th>
                    <th>Кнопка удаления</th>
                    <th>Редактирование студента</th>
                </tr>
			<tr v-for="item in students" v-bind:key="item._id" v-bind:style="item.name.toUpperCase().indexOf(search.toUpperCase())>-1 && search.length > 0 ? 'background-color: #49a09d'  : null">
                <template v-if="item._id !== editStudentId">
                    <td>
                        <router-link :to="'/student-info/' + item._id">
                            <img :src="item.photo" alt="Фото студента" width="150" height="150">
                        </router-link>
                    </td>
                    <td>
                        <router-link :to="'/student-info/' + item._id" style="text-decoration: none; outline: none; color: #fff;">
                            {{item.name}}
                        </router-link>
                    </td>
                    <td><input type="checkbox" v-model="item.isDonePr"></td>
                    <td>{{item.group}}</td>
                    <td>{{item.mark}}</td>
                    <td><img v-bind:src="loadDel" v-show="item.group === getCurrentUser.group" width="80px" style="display: block; margin-left: auto; margin-right: auto;" @click="deleteStudent(item._id)"></td>
                    <td><img v-bind:src="loadPen" width="80px" style="display: block; margin-left: auto; margin-right: auto;" @click="setEditStudent(item)"></td>
                </template>
                <template v-else>
                    <td><input type="text" v-model="editState.photo"></td>
                    <td><input type="text" v-model="editState.name"></td>
                    <td><input type="checkbox" v-model="editState.isDonePr"></td>
                    <td>
                        <select v-model="editState.group">
                            <option value="RPZ 18 1/9">RPZ 18 1/9</option>
                            <option value="RPZ 18 2/9">RPZ 18 2/9</option>
                        </select>
                    </td>
                    <td><input type="text" v-model="editState.mark"></td>
                    <td></td> <!-- чтобы оттянуть кнопку сохранения изменений вправо -->
                    <td><img v-bind:src="loadOK" width="80px" style="display: block; margin-left: auto; margin-right: auto;" @click="editStudent(item)"></td>
                </template>
			</tr>
		</table>

        <!-- Реализация примера со счетчиком -->
        <br><hr><br>
        <div class="count">
            <button @click="() => { setCount(count - 1) }">-</button>
            <label class="count_text">Количество студентов → {{ count }}</label>
            <button @click="() => { setCount(count + 1) }">+</button>
        </div>

        <br><hr><br>
        <!-- Добавление студента -->
		<div class="addStudent">
            <label>Фото -> </label>
            <input v-model="addForm.photo">
            <label>Имя -></label>
            <input v-model="addForm.name">
            <label>ПР -></label>
            <input type="checkbox" v-model="addForm.isDonePr">
            <label>Группа -></label>
            <select v-model="addForm.group">
                <option value="RPZ 18 1/9">RPZ 18 1/9</option>
                <option value="RPZ 18 2/9">RPZ 18 2/9</option>
            </select>
            <label>Оценка -> </label>
            <input v-model="addForm.mark">
            <button @click="addStudent()">Добавить студента</button>
        </div>
        <br><hr><br>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import del from '../img/delete.png'
import pen from '../img/pen.svg.png'
import OK from '../img/OK.png'

export default {
    data() {
        return {
            students: [],
            search: '',
            piece: '',
            editStudentId: '',
            addForm: {
                group: '',
                isDonePr: false,
                name: '',
                mark: '',
                photo: '',
            },
            editState: {
                photo: '',
                mark: '',
                group: '',
                isDonePr: false,
                name: '',
            },
        }
    },
    mounted: function () {
        axios.get('http://46.101.212.195:3000/students').then((response) => {
            this.setCount(response.data.length)
            this.students = response.data
        })
    },
    computed: {
        loadDel() {
            return del
        },
        loadPen() {
            return pen
        },
        loadOK() {
            return OK
        },
        count() {
            return this.$store.getters.getCount
        },
        theme() {
            return this.$store.getters.getTheme
        },
        getCurrentUser() {
            return this.$store.getters.getUser
        },
    },
    methods: {
        deleteStudent(studId) {
            axios.delete("http://46.101.212.195:3000/students/" + studId).then(()=>{
                this.students = this.students.filter((element) => {
                    return element._id !== studId;
                });
            })
        },
        addStudent() {
            axios.post('http://46.101.212.195:3000/students', {
                photo: this.addForm.photo,
                name: this.addForm.name,
                group: this.addForm.group,
                isDonePr: this.addForm.isDonePr,
                mark: this.addForm.mark,
            }).then((response) => this.students.push(response.data))
        },
        setEditStudent(student) {
            this.editStudentId = student._id
            this.editState = { ...student }
            console.log(this.editStudentId, this.editState)
        },
        editStudent(student) {
            axios.put('http://46.101.212.195:3000/students/' + student._id, {
                photo: this.editState.photo,
                name: this.editState.name,
                group: this.editState.group,
                isDonePr: this.editState.isDonePr,
                mark: this.editState.mark,
            }).then((response) => {
                const { photo, name, group, isDonePr, mark } = response.data
                student.photo = photo
                student.name = name
                student.group = group;
                student.isDonePr = isDonePr
                student.mark = mark
                
                this.editStudentId = ''
            })
        },
        setCount(value) {
            this.$store.commit('setCount', value);
        },
        toggleTheme() {
            this.$store.commit('toggleTheme');
        },
        logout() {
            this.$store.commit('setUser', null)
            this.$router.push('/login')
        }
    },
}
</script>

<style scoped>
    .toggle {
        width: 450px;
    }

    .count {
        text-align: center;
    }

    .count_text {
        margin-left: 40px;
        margin-right: 40px;
    }

    .addStudent {
        text-align: center;
    }
</style>
