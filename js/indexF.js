// JavaScript 控制登录框的显示和隐藏以及 SVG 图片按钮的动画
var isModalOpen = false; // 登录框的状态

function toggleLoginModal() {
  var loginModal = document.getElementById('login-modal');
  var loginTrigger = document.getElementById('login-trigger');
  
  if (isModalOpen) {
    loginModal.style.right = '-50vh'; // 隐藏登录框
    loginTrigger.classList.remove('rotate'); // 移除旋转样式
  } else {
    loginModal.style.right = '0px'; // 显示登录框
    loginTrigger.classList.add('rotate'); // 添加旋转样式
  }
  
  isModalOpen = !isModalOpen; // 切换状态
}
		
function shakeElement(elementId, amplitude, frequency) {
  var element = document.getElementById(elementId);
  var frame = 0;

  function shake() {
    frame++;
    // 使用正弦波实现缓入缓出效果，并乘以振幅
    var position = amplitude * Math.sin(frame * frequency);
    element.style.transform = 'translateX(' + position + 'px)';
    requestAnimationFrame(shake);
  }

  shake();
}

// 调用函数，开始抖动效果
shakeElement('login-trigger', 4, 0.1); // amplitude: 4px, frequency: 0.05
