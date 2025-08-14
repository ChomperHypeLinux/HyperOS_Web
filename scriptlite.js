document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const lockScreen = document.getElementById('lock-screen');
    const homeScreen = document.getElementById('home-screen');
    const timeDisplay = document.getElementById('time');
    const lockSwipeArea = document.getElementById('lock-swipe-area');
    const appIcons = document.querySelectorAll('.app-icon');
    const closeButtons = document.querySelectorAll('.close-btn');
    const appWindows = document.querySelectorAll('.app-window');

    // Màn hình Loading
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        lockScreen.classList.remove('hidden');
    }, 2000);

    // Đồng hồ real-time
    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        timeDisplay.textContent = `${hours}:${minutes}`;
    }
    setInterval(updateTime, 1000);
    updateTime();

    // Vuốt để mở khóa
    let startY = 0;
    lockSwipeArea.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    });

    lockSwipeArea.addEventListener('touchmove', (e) => {
        const endY = e.touches[0].clientY;
        if (startY - endY > 50) { // Vuốt lên
            lockScreen.classList.add('hidden');
            homeScreen.classList.remove('hidden');
        }
    });

    // Mở ứng dụng
    appIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            const appName = e.currentTarget.dataset.app;
            const appWindow = document.getElementById(`${appName}-app`);
            appWindow.classList.add('open');
            homeScreen.classList.add('blurred'); // Thêm class blurred cho hiệu ứng mờ
        });
    });

    // Đóng ứng dụng
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            appWindows.forEach(app => app.classList.remove('open'));
            homeScreen.classList.remove('blurred'); // Xóa class blurred
        });
    });
});
