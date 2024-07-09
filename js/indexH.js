 // 检测用户设备的函数
 function detectDevice() {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      // 如果是手机设备，跳转到指定的手机页面
      window.location.href = '/phone.html';
    }
  }
  // 当页面加载完成时调用检测函数
  window.onload = detectDevice;