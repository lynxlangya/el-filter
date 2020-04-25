<template>
  <div class="page">
    <el-filter
      :data="filterInfo.data"
      :field-list="filterInfo.fieldList"
      :list-type-info="listTypeInfo"
      @handleFilter="handleFilter"
      @handleReset="handleReset"
      @handleEvent="handleEvent"
    />
  </div>
</template>
<script>
/**
 * @author 🌈MARS <wangdaoo66@gmail.com>
 * @desc 📝test
 * @copyright 🤝2020 尽人事, 行王道
 */
export default {
  name: 'App',
  data () { 
    return {
      filterInfo: {
        data: {
          name: null,
          age: null,
          count: 0,
          sex: 1,
          date: null,
          dateTime: null,
          range: null
        },
        fieldList: [
          { label: '姓名', type: 'input', value: 'name' },
          { label: '年龄', type: 'input', value: 'age', disabled: true },
          { label: '计数', type: 'inputNumber', value: 'count', min: 1, max: 10 },
          { label: '性别', type: 'select', value: 'sex', list: 'sexList' },
          { label: '日期', type: 'date', value: 'date' },
          { label: '创建时间', type: 'date', value: 'dateTime', dateType: 'datetime', clearable: true  },
          { label: '时间区间', type: 'date', value: 'range', dateType: 'daterange' }
        ],
        /**搜索/重置区域是否隐藏 */
        // btnHidden: true,
        /**组件尺寸 */
        // size: 'small',
        /**默认展示搜索条件 */
        count: 4,
        /**label/item 宽度 */
        // width: {
        //   labelWidth: 110,
        //   itemWidth: 220
        // },
        /**配置项 */
        btnStyle: [
          { icon: 'el-icon-search', text: '过滤',type: 'primary' },
          { icon: 'el-icon-refresh', text: '重置' }
        ]
      },
      listTypeInfo: {
        sexList: [
          { id: 1, name: '男' },
          { id: 2, name: '女' },
          { id: 3, name: '保密' },
        ]
      }
    }
  },

  mounted () {

  },

  methods: {
    /**搜索 */
    handleFilter (row) {
      console.log(row);
    },
    /**重置 */
    handleReset (row) {
      console.log(row);
    },
    /**焦点失去事件 */
    handleEvent (row) {
      console.log(row);
    }
  }
}
</script>
<style lang="css" scoped>
.page {
  background: #fff;
  padding: 5px 10px 3px 10px;
  border-bottom: 2px solid #f0f1f4;
}
</style>