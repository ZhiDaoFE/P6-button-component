const BaseComWithDom = ((document) => {
  return class {
    // _dom;
    // _cls;

    constructor(props = {}) {
      const { root, id, cls } = props;

      if (root && root instanceof HTMLElement) {
        this._dom = root;
      } else if (id) {
        this._dom = document.getElementById(id);
        if (!this._dom) {
          throw new TypeError(`找不到 id 为 ${id} 的元素`);
        }
      } else {
        throw new TypeError('必须要提供 root 或者 id 参数');
      }

      this._cls = cls;
      if (this._cls) {
        this.resetClassName();
      }

      this.init(props);
    }

    init() {
      throw new Error('必须要实现 init 方法');
    }

    getRoot() {
      return this._dom;
    }

    addClassName(cls) {
      if (cls) {
        this._dom.classList.add(...cls.split(/\s+/));
      }

      return this;
    }

    removeClassName(cls) {
      if (cls) {
        this._dom.classList.remove(...cls.split(/\s+/));
      }

      return this;
    }

    resetClassName() {
      this._dom.className = this._cls || '';

      return this;
    }
  }
})(document);

const Button = ((document) => {
  const defaultCls = 'zd-btn';
  return class extends BaseComWithDom {
    // _text;
    // _onClick;

    constructor(props = {}) {
      super({...props, cls: props.cls ? `${props.cls} ${defaultCls}` : defaultCls});
    }

    init(props = {}) {
      const { text, onClick } = props;

      this.setText(text || this.getRoot().innerText).setOnClick(onClick);
    }

    setText(text = '') {
      text = String(text);

      if (text !== this._text) {
        this._text = text;
        this.getRoot().innerText = this._text;
      }

      return this;
    }

    getText() {
      return this._text;
    }

    setOnClick(onClick) {
      if (onClick && typeof onClick !== 'function') {
        throw new TypeError('onClick 必须是个函数');
      }

      if (onClick) {
        if (this._onClick) {
          this.getRoot().removeEventListener('click', this._onClick);
        }
        
        this._onClick = onClick;
        this.getRoot().addEventListener('click', this._onClick);
      }

      return this;
    }

    destory() {
      if (this._onClick) {
        this.getRoot().removeEventListener('click', this._onClick);
      }

      return this;
    }
  }
})(document);