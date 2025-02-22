// 可以这样加载 .vue 文件
// loadVueComponent('./Button.vue').then(...)


const { createApp, ref } = Vue;

// 创建应用实例
const app = {
  components: {
    Button: Vue.defineAsyncComponent(() => loadVueComponent('./Button.vue'))
  },
  setup() {
    const count = ref(0);
    const playBtnText = ref('点了没有反应的按钮');
    const playBtnDisabled = ref(false);
    const counterBtnClass = ref('');
    const playBtnClick = ref(null);
    const ICON_POSITIONS = ref(null);

    const handleCount = () => {
      count.value++;
    };

    const showMessage = () => window.alert('学前端，来之道 —— 陪伴式自学前端圈子');

    // 加载常量
    loadVueComponent('./Button.vue').then(module => {
      ICON_POSITIONS.value = module.ICON_POSITIONS;
    });

    return {
      count,
      playBtnText,
      playBtnDisabled,
      counterBtnClass,
      playBtnClick,
      handleCount,
      showMessage,
      ICON_POSITIONS,
      setCounterStyle(cls) {
        counterBtnClass.value = cls;
      },
      setPlayBtnAction() {
        playBtnText.value = '我们的口号是...';
        playBtnClick.value = showMessage;
      }
    };
  },
  template: `
    <div>
      <!-- 计数器部分 -->
      <div id="counter">
        <Button 
          :text="'计数:' + count + ', 点击计数+1'"
          :onClick="handleCount"
          :className="counterBtnClass"
        />
      </div>
      <br/><br/>

      <!-- 样式控制按钮 -->
      <div class="row">
        <Button 
          className="btn1"
          text="把计数器变大，颜色变红"
          :onClick="() => setCounterStyle('btn1')"
        />
        <Button 
          className="btn2"
          text="把计数器变成透明"
          :onClick="() => setCounterStyle('btn2')"
        />
      </div>
      <br/><br/><br/><br/>

      <!-- 可控按钮部分 -->
      <div id="play">
        <Button 
          :text="playBtnText"
          :disabled="playBtnDisabled"
          :onClick="playBtnClick"
        />
      </div>
      <br/><br/>

      <!-- 控制按钮组 -->
      <div class="row">
        <Button 
          text="让上面的按钮喊出我们的口号！"
          :onClick="setPlayBtnAction"
        />
        <Button 
          text="禁用上面的按钮"
          :onClick="() => playBtnDisabled = true"
        />
        <Button 
          text="解禁上面的按钮"
          :onClick="() => playBtnDisabled = false"
        />
        <Button 
          text="无法点击的按钮"
          disabled
        />
      </div>
      <br/><br/><br/><br/>

      <!-- 图标按钮展示 -->
      <div class="row">
        <Button 
          icon='<img class="icon-logo" src="./assets/logo.jpg" />'
          :onClick="showMessage"
        />
        <Button 
          text="search"
          icon='<img src="./assets/search.svg" />'
          :onClick="showMessage"
        />
        <Button 
          text="start"
          icon='<img src="./assets/power.svg" />'
          :iconPosition="ICON_POSITIONS?.END"
          :onClick="showMessage"
        />
      </div>
    </div>
  `
};

// 创建并挂载应用
createApp(app).mount('#app'); 