<template>
  <div class="content">
    <template v-for="(item, index) in fieldList">
      <div
          v-show="!foldBtnHidden && icon === 'close' ? index < count : true"
          :key="index"
      >
        <div class="item-style">
          <span class="label-style" :style="{width: width.labelWidth + 'px'}">{{ item.label }}</span>
          <!-- 普通输入框 -->
          <el-input
              v-if="item.type === 'input'"
              v-model.trim="defaultData[item.value]"
              :size="size"
              :style="{width: width.itemWidth + 'px'}"
              :type="item.type"
              :disabled="item.disabled"
              :placeholder="getPlaceholder(item)"
              @keyup.enter.native="handleFilter"
              @blur="handleEvent($event, item.value)"
          />
          <!-- 日期/时间 -->
          <el-date-picker
              v-if="item.type === 'date'"
              v-model="defaultData[item.value]"
              :size="size"
              :style="{width: width.itemWidth + 'px'}"
              :type="item.dateType"
              :picker-options="item.TimePickerOptions"
              :clearable="item.clearable"
              :disabled="item.disabled"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              :placeholder="getPlaceholder(item)"
              @change="handleEvent($event, item.value, 'change')"
          />
          <!-- 选择框 -->
          <el-select
              v-if="item.type === 'select'"
              v-model="defaultData[item.value]"
              :size="size"
              :style="{width: width.itemWidth + 'px'}"
              :disabled="item.disabled"
              :clearable="item.clearable"
              :filterable="item.filterable"
              :multiple="item.multiple"
              :placeholder="getPlaceholder(item)"
              @change="handleEvent($event, item.value, 'change')"
          >
            <el-option
                v-for="childItem in listTypeInfo[item.list]"
                :key="childItem.id"
                :label="childItem.name"
                :value="childItem.id"
                :disabled="childItem.disabled"
            />
          </el-select>
          <!-- 计数器 -->
          <el-input-number
              v-if="item.type === 'inputNumber'"
              v-model="defaultData[item.value]"
              :size="size"
              :style="{width: width.itemWidth + 'px'}"
              :min="item.min"
              :max="item.max"
              @change="handleEvent($event, item.value, 'change')"
          />
        </div>
      </div>
    </template>
    <div
        v-if="!btnHidden && fieldList.length !== 1"
        class="btn-style"
    >
      <el-button
          :type="btnStyle[0].type"
          :size="size"
          :plain="btnStyle[0].plain"
          :round="btnStyle[0].round"
          :icon="btnStyle[0].icon"
          :disabled="btnStyle[0].disabled"
          @click="handleFilter"
      >
        {{ btnStyle[0].text }}
      </el-button>
      <el-button
          :type="btnStyle[1].type"
          :size="size"
          :plain="btnStyle[1].plain"
          :round="btnStyle[1].round"
          :disabled="btnStyle[1].disabled"
          :icon="btnStyle[1].icon"
          @click="handleReset"
      >
        {{ btnStyle[1].text }}
      </el-button>
    </div>
    <el-button
        v-if="!foldBtnHidden && !btnHidden && fieldList.length > count"
        type="text"
        @click="icon === 'open' ? icon = 'close' : icon = 'open'"
        style="margin-left: 6px;"
    >{{ icon === 'open' ? '收起' : '展开' }}
      <i :class="icon === 'open' ? 'el-icon-caret-top' : 'el-icon-caret-bottom'" />
    </el-button>
  </div>
</template>
<script>
/**
 * @author 🌈MARS <wangdaoo66@gmail.com>
 * @desc 📝vue + element-ui 中后台搜索组件
 * @copyright 🤝2020 尽人事, 行王道
 */
export default {
  name: 'myFilter',
  props: {
    /**字段默认数据 */
    data: {
      type: Object,
      default: () => {},
      required: true
    },
    /**字段配置项 */
    fieldList: {
      type: Array,
      default: () => [],
      required: true
    },
    /**相关的列表 */
    listTypeInfo: {
      type: Object,
      default: () => {}
    },
    /**按钮区域是否隐藏 */
    btnHidden: {
      type: Boolean,
      default: false
    },
    foldBtnHidden: {
      type: Boolean,
      default: false
    },
    /**组件尺寸 */
    size: {
      type: String,
      default: 'mini'
    },
    /**默认搜索数 */
    count: {
      type: Number,
      default: 4
    },
    /**组件及label宽度 */
    width: {
      type: Object,
      default: () => ({
        labelWidth: 110,
        itemWidth: 220
      })
    },
    /**按钮配置 */
    btnStyle: {
      type: Array,
      default: () => [
        { icon: null, text: '搜索', disabled: false, type: 'primary', plain: false, round: false },
        { icon: null, text: '重置', disabled: false, type: null, plain: false, round: false }
      ]
    }
  },
  data: () => ({
    defaultData: {},
    icon: 'close'
  }),
  mounted () {
    /**
     * 子组件无法直接修改父组件传递过来的值
     * 于是将父组件传递的值首先赋值给 defaultData
     * 在搜索条件中同样使用 defaultData
     * 永远保持 props 传递的 data 纯洁度
     */
    this.defaultData = {...this.data}
  },
  methods: {
    /**
     * @func 占位符显示
     * @param {Object} row
     * @desc 📝
     */

    getPlaceholder (row) {
      let placeholder
      if (row.type === 'input') {
        placeholder = '请输入' + row.label
      } else if (row.type === 'select' || row.type === 'time' || row.type === 'date') {
        placeholder = '请选择' + row.label
      } else {
        placeholder = row.label
      }
      return placeholder
    },
    /**
     * @func 事件处理
     * @desc 📝
     */
    handleEvent (event, val, change) {
      let obj = {
        value: change === 'change' ? event : event.target.value,
        label: val
      }
      this.$emit('handleEvent', obj)
    },
    /**
     * @func 搜索
     * @desc 📝
     */
    handleFilter () {
      this.$emit('handleFilter', this.defaultData)
    },
    /**
     * @func 重置
     * @desc 📝
     */
    handleReset () {
      this.defaultData = {...this.data}
      this.$emit('handleReset', this.defaultData)
    }
  }
}
</script>
<style lang="css" scoped>
.content {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}
.content .item-style {
  margin: 6px auto;
  line-height: 1;
}
.content .item-style .label-style {
  display: inline-block;
  justify-self: end;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  text-align: right;
  margin-right: 12px;
  color: #222222;
}
.btn-style {
  margin: 6px 0 6px auto;
}
</style>
