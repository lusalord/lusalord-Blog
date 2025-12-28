// 다른 파일에서 가져오기
import { projects, blogPosts } from './data.js';
import { initTheme } from './theme.js';

//테마
initTheme();

let currentBlogPosts = [...blogPosts];

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

// ⭐ 필터링된 글 목록을 받아서 화면에 그려주는 함수
function renderBlogList(postsToRender) {
    if (!blogContainer) return; // blog.html이 아니면 종료

    // 기존 목록 비우기
    blogContainer.innerHTML = '<h2>개발 블로그</h2>'; 

    postsToRender.forEach(post => {
        const article = document.createElement('article');
        article.className = 'post-item';
        article.innerHTML = `
            <h3><a href="${post.url}">${post.title}</a></h3> 
            <span class="date">${post.date}</span>
            <p>${post.summary}</p>
        `;
        blogContainer.appendChild(article);
    });
}

// JS/script.js 파일 내용에 추가

function initCategoryFilter() {
    const categoryList = document.getElementById('category-list');
    if (!categoryList) return;

    // 1. 모든 카테고리 이름을 중복 없이 추출
    const categories = ['All']; // 'All' 버튼을 기본으로 추가
    const uniqueCategories = new Set(blogPosts.map(post => post.category));
    uniqueCategories.forEach(cat => categories.push(cat));

    let activeCategory = 'All'; // 현재 활성화된 카테고리

    // 2. 버튼 생성 및 이벤트 리스너 연결
    categories.forEach(category => {
        const listItem = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = category;
        button.dataset.category = category; // data 속성으로 카테고리 이름 저장

        if (category === 'All') {
            button.classList.add('active'); // 초기에는 'All'을 활성화
        }

        button.addEventListener('click', () => {
            // 3. 버튼 클릭 시 필터링 실행
            activeCategory = category;
            
            // 모든 버튼의 'active' 클래스 제거
            categoryList.querySelectorAll('button').forEach(btn => {
                btn.classList.remove('active');
            });
            // 클릭한 버튼에만 'active' 클래스 추가
            button.classList.add('active');

            if (category === 'All') {
                // 'All'을 선택하면 모든 글을 표시
                currentBlogPosts = blogPosts;
            } else {
                // 선택된 카테고리에 해당하는 글만 필터링
                currentBlogPosts = blogPosts.filter(post => post.category === category);
            }

            // 4. 필터링된 목록을 화면에 다시 그리기
            renderBlogList(currentBlogPosts);
        });

        listItem.appendChild(button);
        categoryList.appendChild(listItem);
    });

    renderBlogList(blogPosts);
}

// 📌 초기 로딩 시 카테고리 필터 실행
initCategoryFilter();