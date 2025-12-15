// 다른 파일에서 데이터와 기능을 가져옵니다 (import)
import { projects, blogPosts } from './data.js';
import { initTheme } from './theme.js';

// 1. 테마 기능 실행
initTheme();

// 2. 프로젝트 목록 화면에 그리기
const projectContainer = document.querySelector('#projects .grid');

if (projectContainer) {
    projectContainer.innerHTML = '';

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'card clickable-card'; // 클래스 추가: 클릭 가능하다는 표시
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.desc}</p>
            <small style="color:#007bff">${project.tags.join(', ')}</small>
        `;
        
        // ⭐ 추가된 핵심 로직: 카드를 클릭하면 정해진 URL로 이동
        card.addEventListener('click', () => {
            if (project.url) {
                window.location.href = project.url; // 해당 주소로 페이지 이동
            }
        });

        projectContainer.appendChild(card);
    });
}

const blogContainer = document.querySelector('.blog-list');

if (blogContainer) { 
    blogPosts.forEach(post => {
        const article = document.createElement('article');
        // ...
        article.innerHTML = `
            <h3><a href="${post.url}">${post.title}</a></h3> 
            <span class="date">${post.date}</span>
            <p>${post.summary}</p>
        `;

        blogContainer.appendChild(article);
    });
}