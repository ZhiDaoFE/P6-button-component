// 将 ICON_POS 定义为全局变量
const ICON_POS = {
  START: 'start',
  END: 'end',
};

const Button = ({
  className,
  text,
  icon,
  iconPosition = ICON_POS.START,
  disabled = false,
  onClick,
  children,
  ...rest
}) => {
  // 基础类名
  const defaultCls = 'zd-btn';
  const disabledCls = 'z-disabled';
  const iconCls = 'zd-btn-icon';

  // 组合类名
  const buttonClasses = classNames(
    defaultCls,
    className,
    {
      [disabledCls]: disabled,
    }
  );

  // 处理点击事件
  const handleClick = (e) => {
    if (disabled) return;
    if (onClick) {
      onClick(e);
    }
  };

  // 渲染图标
  const renderIcon = () => {
    if (!icon) return null;
    
    return (
      <span className={iconCls}>
        {typeof icon === 'string' ? icon : icon}
      </span>
    );
  };

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      onClick={handleClick}
      {...rest}
    >
      {iconPosition === ICON_POS.START && renderIcon()}
      <span>{text || children}</span>
      {iconPosition === ICON_POS.END && renderIcon()}
    </button>
  );
}; 