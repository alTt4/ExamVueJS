<template>
  <div class="container mx-auto items-center py-5">
      <!-- input -->
      <input v-model="desc" />
      <button @click="handleSave" class="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Save</button>
      <button @click="handleCancel" v-if="isEdit" class="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Cancel</button>
      <!-- Progress Bar -->
      <div class="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
        <div class="bg-blue-600 h-1.5 rounded-full" :style="`width: ${getPercentageDone}`"></div>
      </div>
      {{ getPercentageDone }}
      <br/><br/>

      <ButtonPaging />

      <br/>
      <table>
          <tr v-for="(x,k) in getDataPaging" :key="k">
              <td>{{ startnumber + k + 1 }}.</td>
              <td :class="(x.isdone)? 'line-through italic' : ''">{{ x.desctodos }}</td>
              <td>
                <button @click="handleSetDone(x)" v-if="x.isdone" class="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">UnDone</button>
                <button @click="handleSetDone(x)" v-if="!x.isdone" class="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Done</button>
                <button @click="handleEdit(x)" class="bg-orange-500 text-white active:bg-orange-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Edit</button>
                <button @click="handleDelete(x)" class="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Delete</button>
              </td>
          </tr>
      </table>
  </div>
</template>

<script>
import ButtonPaging from "@/components/Todos2/ButtonPaging.vue"

import { mapState, mapGetters } from "vuex"
export default {
    components: {
        ButtonPaging
    },
    mounted() {
        this.$store.dispatch('ModuleTodos2/getData')
    },
    data () {
        return {
            // var utility \\
            isEdit: false,
            todoitem: {}, // for edit
            // [END] var utility \\

            desc: ''
        }
    },
    methods: {
        async handleSave() {
            if (this.isEdit) {
                let jsn = {
                    idtodos: this.todoitem.idtodos,
                    isdone: this.todoitem.isdone,
                    desctodos: this.desc,
                }
                await this.$store.dispatch('ModuleTodos2/editData', { _id: this.todoitem._id, newdata: jsn })
                this.handleCancel()
                return
            }
            let newId = await this.$store.dispatch('ModuleTodos2/getNewId')
            let jsn = {
                idtodos: newId,
                desctodos: this.desc,
                isdone: false
            }
            await this.$store.dispatch('ModuleTodos2/addData', jsn)
            this.handleCancel()
        },
        async handleCancel() {
            this.isEdit = false
            this.todoitem = {}
            this.desc = ''
        },
        async handleEdit(item) {
            this.isEdit = true
            this.todoitem = item
            this.desc = item.desctodos
        },
        async handleDelete(item) {
            const ask = confirm('You want to Delete?')
            if (ask) {
                await this.$store.dispatch('ModuleTodos2/deleteData', item)
            }
        },
        async handleSetDone(item) {
            let jsn = {
                idtodos: item.idtodos,
                desctodos: item.desctodos,
                isdone: !item.isdone,
            }
            await this.$store.dispatch('ModuleTodos2/editData', { _id: item._id, newdata: jsn })
            this.desc = ''
            return
        }
    },
    computed: {
        ...mapState("ModuleTodos2", [
            'todos',
            'countpage',
            'page',
            'startnumber'
        ]),
        ...mapGetters("ModuleTodos2", [
            'getDataPaging',
            'getMaxPerPage',
            'getPercentageDone'
        ]),
    }
}
</script>

<style>

</style>