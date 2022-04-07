<template>
  <div>
    <button @click="prevPage" :disabled="page === 1" :class="setDisabled(page === 1)" type="button">
        left
    </button>
    <button v-for="x in countpage" :key="x" :class="isPage(x)" @click="changePage(x)" type="button">
        {{ x }}
    </button>
    <button @click="nextPage" :disabled="page === countpage" :class="setDisabled(page === countpage)" type="button">
        Right
    </button>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"
export default {
    methods: {
        prevPage() {
            let tmppage = this.$store.state.ModuleTodos2.page
            let calc = (tmppage > 1)? tmppage - 1 : 1
            this.$store.state.ModuleTodos2.page = calc
            this.$store.state.ModuleTodos2.startnumber = (calc * this.getMaxPerPage) - this.getMaxPerPage
        },
        nextPage() {
            let tmppage = this.$store.state.ModuleTodos2.page
            let calc = (tmppage < this.countpage)? tmppage + 1 : this.countpage
            this.$store.state.ModuleTodos2.page = calc
            this.$store.state.ModuleTodos2.startnumber = (calc * this.getMaxPerPage) - this.getMaxPerPage
        },
        changePage(x) {
            this.$store.state.ModuleTodos2.page = x
            this.$store.state.ModuleTodos2.startnumber = (x * this.getMaxPerPage) - this.getMaxPerPage
        },
        isPage(x) {
            if (this.page === x) {
                return 'bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
            }
            return "text-blue-500 bg-transparent border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        },
        setDisabled(param) {
            let color = 'blue'
            let btn = `text-${color}-500 bg-transparent border border-solid border-${color}-500 hover:bg-${color}-500 hover:text-white active:bg-${color}-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`
            if (param) {
                // color = 'gray'
                btn = 'bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
            }
            // return `text-${color}-500 bg-transparent border border-solid border-${color}-500 hover:bg-${color}-500 hover:text-white active:bg-${color}-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`
            return btn
        }
    },
    computed: {
        ...mapState('ModuleTodos2', [
            'todos',
            'page',
            'countpage',
            'startnumber'
        ]),
        ...mapGetters('ModuleTodos2', [
            'getMaxPerPage',
        ])
    }
}
</script>

<style>

</style>