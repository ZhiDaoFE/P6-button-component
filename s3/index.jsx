const { useState } = React;

const App = () => {
  const [count, setCount] = useState(0);
  const [playBtnText, setPlayBtnText] = useState('点了没有反应的按钮');
  const [playBtnClick, setPlayBtnClick] = useState(null);
  const [playBtnDisabled, setPlayBtnDisabled] = useState(false);
  const [counterBtnClass, setCounterBtnClass] = useState('');

  return (
    <div>
      {/* 计数器部分 */}
      <div id="counter">
        <Button 
          text={`计数:${count}, 点击计数+1`}
          onClick={() => setCount(count + 1)}
          className={counterBtnClass}
        />
      </div>
      <br/><br/>

      {/* 样式控制按钮 */}
      <div className="row">
        <Button 
          className="btn1"
          text="把计数器变大，颜色变红"
          onClick={() => setCounterBtnClass('btn1')}
        />
        <Button 
          className="btn2"
          text="把计数器变成透明"
          onClick={() => setCounterBtnClass('btn2')}
        />
      </div>
      <br/><br/><br/><br/>

      {/* 可控按钮部分 */}
      <div id="play">
        <Button 
          text={playBtnText}
          onClick={playBtnClick}
          disabled={playBtnDisabled}
        />
      </div>
      <br/><br/>

      {/* 控制按钮组 */}
      <div className="row">
        <Button 
          text="让上面的按钮喊出我们的口号！"
          onClick={() => {
            setPlayBtnText('我们的口号是...');
            setPlayBtnClick(() => () => alert('学前端，来之道 —— 陪伴式自学前端圈子'));
          }}
        />
        <Button 
          text="禁用上面的按钮"
          onClick={() => setPlayBtnDisabled(true)}
        />
        <Button 
          text="解禁上面的按钮"
          onClick={() => setPlayBtnDisabled(false)}
        />
        <Button 
          text="无法点击的按钮"
          disabled={true}
          onClick={() => {
            throw new Error('这个函数应该不会被执行！');
          }}
        />
      </div>
      <br/><br/><br/><br/>

      {/* 图标按钮展示 */}
      <div className="row">
        <Button 
          icon={<img className="icon-logo" src="./assets/logo.jpg" />}
          onClick={() => alert('学前端，来之道 —— 陪伴式自学前端圈子')}
        />
        <Button 
          text="search"
          icon={<img src="./assets/search.svg" />}
          onClick={() => alert('学前端，来之道 —— 陪伴式自学前端圈子')}
        />
        <Button 
          text="start"
          icon={<img src="./assets/power.svg" />}
          iconPosition={ICON_POS.END}
          onClick={() => alert('学前端，来之道 —— 陪伴式自学前端圈子')}
        />
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />); 