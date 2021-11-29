# el-filter

![ElFilter](http://cdn.wangdaoo.com/20211129162030.png)

## 下载依赖

```yaml
# npm
npm install el-filter --save

# yarn
yarn add el-filter
```

```js
// main.js 引入
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ElFilter from 'el-filter'

Vue.use(ElementUI);
Vue.use(ElFilter);

new Vue({
  render: h => h(App),
}).$mount('#app')
```

## 组件使用

```html
<el-filter
  :data="filterInfo.data"
  :field-list="filterInfo.fieldList"
  :list-type-info="listTypeInfo"
  @handleFilter="handleFilter"
  @handleReset="handleReset"
  @handleEvent="handleEvent"
/>
```

## 属性配置

```js
data: () => ({
  filterInfo: {
    data: {
      name: null,
      age: null,
      count: 1,
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
    ]
  },
  listTypeInfo: {
    sexList: [
      { id: 1, name: '男' },
      { id: 2, name: '女' },
      { id: 3, name: '保密' },
    ]
  }
}),

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
```

## 参数配置

| 参数 | 默认 | 数据类型 | 是否必传 | 说明 |
| ------ | ------ | ------ | ------ | ------ |
| data | {} | Object | 必传 | 字段默认数据 |
| fieldList | [] | Array | 必传 | 字段配置项 |
| listTypeInfo | Object | Object | 非必传 | 下拉列表数据集 |
| btnHidden | false | Boolean | 非必传 | 按钮区域是否隐藏 |
| foldBtnHidden | false | Boolean | 非必传 | 是否取消折叠功能 |
| size | mini | String | 非必传 | 组件尺寸 |
| count | 4 | Number | 非必传 | 默认搜索条数 |
| width | {labelWidth: 110, itemWidth: 220} | Object | 非必传 | 组件及label宽度 |
| btnStyle | [] | Object | 非必传 | 按钮配置项 (见示例 ↓ ) |

**按钮配置项示例:**

```js
// 示例
btnStyle: [
  { icon: 'el-icon-search', text: '过滤',type: 'primary' },
  { icon: 'el-icon-refresh', text: '重置' }
]

// 组件接受参数值
btnStyle: {
  type: Array,
  default: () => [
    { icon: null, text: '搜索', disabled: false, type: 'primary', plain: false, round: false },
    { icon: null, text: '重置', disabled: false, type: null, plain: false, round: false }
  ]
}
```

## 暴露方法及事件

```js
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
```
