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
});
