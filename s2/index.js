document.addEventListener('DOMContentLoaded', () => {
  let count = 0;

  const counter = new Button({
    id: 'counter',
    text: `计数:${count}, 点击计数+1`,
    onClick: () => {
      counter.setText(`计数:${++count}, 点击计数+1`);
    }
  });

  const btn1 = new Button({
    id: 'btn1',
    cls: 'btn1',
    text: '把计数器变大，颜色变红',
    onClick: () => {
      counter.resetClassName().addClassName('btn1');
    }
  });

  const btn2 = new Button({
    id: 'btn2',
    cls: 'btn2',
    onClick: () => {
      counter.resetClassName().addClassName('btn2');
    }
  });

  const playBtn = new Button({
    id: 'play',
  });

  const setWordBtn = new Button({
    id: 'setWord',
    onClick: () => {
      playBtn.setText('我们的口号是...').setOnClick(() => alert('学前端，来之道 —— 陪伴式自学前端圈子'));
    }
  });

  const setDisBtn = new Button({
    id: 'setdis',
    onClick: () => {
      playBtn.setDisabled(true);
    }
  });

  const setAbleBtn = new Button({
    id: 'setable',
    onClick: () => {
      playBtn.setDisabled(false);
    }
  });

  const disabledBtn = new Button({
    id: 'dis',
    disabled: true,
    onClick: () => {
      throw new Error('这个函数应该不会被执行！');
    }
  });

  const iconBtn1 = new Button({
    id: 'icon1',
    icon: '<img class="icon-logo" src="./assets/logo.jpg" />',
    onClick: () => alert('学前端，来之道 —— 陪伴式自学前端圈子')
  });

  const iconBtn2 = new Button({
    id: 'icon2',
    icon: '<svg role="img" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" aria-labelledby="searchIconTitle" stroke="#000" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#000"> <title id="searchIconTitle">Search</title> <path d="M14.4121122,14.4121122 L20,20"/> <circle cx="10" cy="10" r="6"/> </svg>',
    onClick: () => alert('学前端，来之道 —— 陪伴式自学前端圈子')
  });

  const img = document.createElement('img');
  img.src = './assets/power.svg';
  const iconBtn3 = new Button({
    id: 'icon3',
    icon: img,
    iconPosition: 'end',
    onClick: () => alert('学前端，来之道 —— 陪伴式自学前端圈子')
  });
});
