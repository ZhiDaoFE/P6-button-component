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
  const disabledCls = 'z-disabled';
  const iconCls = 'zd-btn-icon';
  const iconPosEndCls = 'zd-btn--icon-end';
  const ICON_POS = {
    START: 'start',
    END: 'end'
  };
  return class extends BaseComWithDom {
    // _text;
    // _onClick;
    // _disabled;
    // _iconDom;
    // _textDom;
    // _iconPosition;

    constructor(props = {}) {
      super({...props, cls: props.cls ? `${props.cls} ${defaultCls}` : defaultCls});
    }

    _build() {
      this._text = this.getRoot().innerText;
      this.getRoot().innerHTML = `<span class="${iconCls}"></span><span>${this._text}</span>`;
      this._iconDom = this.getRoot().children[0];
      this._textDom = this.getRoot().children[1];
    }

    init(props = {}) {
      this._build(); 

      const { text, onClick, disabled, iconPosition, icon } = props;
           
      this.setText(text)
        .setIcon(icon)
        .setIconPosition(iconPosition)
        .setDisabled(disabled)
        .setOnClick(onClick);
    }

    setText(text = '') {
      text = String(text);

      if (text !== this._text && this._textDom) {
        this._text = text;
        this._textDom.innerText = this._text;
      }

      return this;
    }

    getText() {
      return this._text;
    }

    setIcon(icon) {
      if (typeof icon === 'string') {
        this._iconDom.innerHTML = icon;
      } else if (icon instanceof HTMLElement) {
        if (this._iconDom.children.length) {
          this._iconDom.replaceChild(icon, this._iconDom.children[0]);
        } else {
          this._iconDom.appendChild(icon);
        }
      }

      return this;
    }

    setDisabled(disabled) {
      this._disabled = !!disabled;

      this[`${this._disabled ? 'add' : 'remove'}ClassName`](disabledCls);

      return this;
    }

    isDisabled() {
      return this._disabled;
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

    setIconPosition(pos) {
      this._iconPosition = pos;
      
      this[`${this._iconPosition === ICON_POS.END ? 'add' : 'remove'}ClassName`](iconPosEndCls);

      return this;
    }

    getIconPosition() {
      return this._iconPosition;
    }

    resetClassName() {
      super.resetClassName();

      if (this._disabled) {
        this.addClassName(disabledCls);
      }

      if (this._iconPosition === ICON_POS.END) {
        this.addClassName(iconPosEndCls);
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