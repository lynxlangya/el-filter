import ElFilter from './el-filter.vue'

const components = {
  install(Vue) {
    Vue.component(ElFilter.name, ElFilter)
  }
}

if (typeof window !== undefined && window.Vue) {
  window.Vue.use(components)
}

export default components