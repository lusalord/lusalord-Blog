export function initTheme() {
    const toggleButton = document.createElement('button');
    toggleButton.textContent = "🌙 다크 모드";
    toggleButton.style.position = "fixed";
    toggleButton.style.bottom = "20px";
    toggleButton.style.right = "20px";
    toggleButton.style.padding = "10px 15px";
    toggleButton.style.borderRadius = "20px";
    toggleButton.style.cursor = "pointer";
    toggleButton.style.zIndex = "1000"; // 다른 요소보다 위에 있게
    
    document.body.appendChild(toggleButton);

    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // 버튼 텍스트 변경
        if (document.body.classList.contains('dark-mode')) {
            toggleButton.textContent = "☀️ 라이트 모드";
            toggleButton.style.backgroundColor = "#fff";
            toggleButton.style.color = "#333";
        } else {
            toggleButton.textContent = "🌙 다크 모드";
            toggleButton.style.backgroundColor = "#333";
            toggleButton.style.color = "#fff";
        }
    });
}