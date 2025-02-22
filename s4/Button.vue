<template>
  <button 
    :class="buttonClasses"
    :disabled="disabled"
    @click="handleClick"
  >
    <span v-if="iconPosition === ICON_POSITIONS.START" class="zd-btn-icon" v-html="icon"></span>
    <span>{{ text || $slots.default }}</span>
    <span v-if="iconPosition === ICON_POSITIONS.END" class="zd-btn-icon" v-html="icon"></span>
  </button>
</template>

<script>
const ICON_POSITIONS = {
  START: 'start',
  END: 'end'
};

const Button = {
  name: 'Button',
  ICON_POSITIONS,  // 作为组件的静态属性
  props: {
    text: String,
    icon: String,
    iconPosition: {
      type: String,
      default: ICON_POSITIONS.START
    },
    disabled: {
      type: Boolean,
      default: false
    },
    className: String,
    onClick: Function
  },
  setup() {
    return {
      ICON_POSITIONS
    }
  },
  computed: {
    buttonClasses() {
      return {
        'zd-btn': true,
        'z-disabled': this.disabled,
        [this.className]: !!this.className
      }
    }
  },
  methods: {
    handleClick(e) {
      if (this.disabled) return;
      if (this.onClick) {
        this.onClick(e);
      } else {
        this.$emit('click', e);
      }
    }
  }
};

export default Button;
</script>

<style>
.zd-btn {
  box-sizing: border-box;
  outline: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 22px;
  height: 32px;
  padding: 0 15px;
  border: 1px solid transparent;
  border-radius: 6px;
  font-weight: 400;
  color: #fff;
  background: #1677ff;
  white-space: nowrap;
  text-align: center;
  cursor: pointer;
}

.zd-btn--icon-end {
  flex-direction: row-reverse;
}

.zd-btn > span {
  display: inline-block;
  line-height: 1;
}

.zd-btn-icon {
  font-size: 0;
}

.zd-btn.z-disabled {
  pointer-events: none;
  border-color: #d9d9d9;
  color: rgba(0, 0, 0, .25);
  background: rgba(0, 0, 0, .04);
}
</style> 