// 다른 파일에서 가져오기
import { projects, blogPosts } from './data.js';
import { initTheme } from './theme.js';

//테마
initTheme();

//프로젝트 목록 화면에 표시하기기
const projectContainer = document.querySelector('#projects .grid');

if (projectContainer) {
    projectContainer.innerHTML = '';

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'card clickable-card';
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.desc}</p>
            <small style="color:#007bff">${project.tags.join(', ')}</small>
        `;
        
        //카드를 클릭하면 카드의 URL로 이동
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