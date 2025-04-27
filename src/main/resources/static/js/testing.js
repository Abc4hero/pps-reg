let bannerTimeout;

document.addEventListener('DOMContentLoaded', () => {
    startBannerTimer();

    // Все кнопки на баннере закрывают его
    document.querySelectorAll('#banner .banner-button').forEach(button => {
        button.addEventListener('click', hideBanner);
    });
});

function startBannerTimer() {
    bannerTimeout = setTimeout(showBanner, 5000);
}

function showBanner() {
    const banner = document.getElementById('banner');
    banner.classList.remove('hidden');
    banner.focus();
}

function hideBanner() {
    const banner = document.getElementById('banner');
    banner.classList.add('hidden');
    clearTimeout(bannerTimeout);
    startBannerTimer();
}