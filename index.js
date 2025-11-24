import{a as h,S as b,i as n}from"./assets/vendor-MgecxatS.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();const y="53386228-9ccf01ca4b721fbc8928b7547",g="https://pixabay.com/api/";function L(i,o=1,e=40){return h.get(g,{params:{key:y,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:e}}).then(s=>s.data)}const m=".gallery",w=".loader",p=document.querySelector(m);document.querySelector(w);const S=new b(`${m} a`,{captionsData:"alt",captionDelay:250});function d(i){if(!p)return;const o=i.map(e=>`
    <li class="gallery__item">
        <a class="gallery__link" href="${e.largeImageURL}">
        <div class="photo-card">
            <img class="photo-card__img" src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
            <div class="info">
                <p class="info-item"><b>Likes</b><br>${e.likes}</p>
                <p class="info-item"><b>Views</b><br>${e.views}</p>
                <p class="info-item"><b>Comments</b><br>${e.comments}</p>
                <p class="info-item"><b>Downloads</b><br>${e.downloads}</p>
            </div>
            </div>
        </a>
        </li>
        `).join("");p.insertAdjacentHTML("beforeend",o),S.refresh()}const u=document.querySelector(".form"),f=document.querySelector(".form-input"),a=document.querySelector(".loader"),l=document.querySelector(".gallery");(!u||!f||!a||!l)&&console.error("Required DOM elements not found:",{form:!!u,input:!!f,loader:!!a,gallery:!!l});function $(){a.classList.remove("is-hidden")}function R(){a.classList.add("is-hidden")}function _(i){const o=i.map(e=>`
<li class="gallery__item">
<a href="${e.largeImageURL}">
    <img class="photo-card__img" src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
</a>
<div class="info">
    <p><b>Likes</b><br>${e.likes}</p>
    <p><b>Views</b><br>${e.views}</p>
    <p><b>Comments</b><br>${e.comments}</p>
    <p><b>Downloads</b><br>${e.downloads}</p>
</div>
</li>`).join("");l.insertAdjacentHTML("beforeend",o);try{window.SimpleLightboxInstance?window.SimpleLightboxInstance.refresh():window.SimpleLightboxInstance=new SimpleLightbox(".gallery a",{captionsData:"alt",captionDelay:250})}catch(e){console.warn("SimpleLightbox init warning:",e)}}u.addEventListener("submit",v);function v(i){i.preventDefault();const o=f.value.trim();if(!o){n.warning({title:"Увага",message:"Введіть слово для пошуку.",position:"topRight",timeout:3e3});return}l.innerHTML="",$(),L(o).then(e=>{if(!e||!Array.isArray(e.hits))throw new Error("Неправильна відповідь від API");if(e.hits.length===0){n.info({title:"Нічого не знайдено",message:"Спробуйте інше ключове слово.",position:"topRight",timeout:4e3});return}typeof d=="function"?d(e.hits):_(e.hits),n.success({title:"Знайдено",message:`Знайдено ${e.hits.length} зображень для "${o}"`,position:"topRight",timeout:2500})}).catch(e=>{console.error("Fetch/images error:",e),n.error({title:"Помилка",message:"Не вдалося отримати зображення. Перевірте інтернет або ключ API й спробуйте ще раз.",position:"topRight",timeout:5e3})}).finally(()=>{R()})}
//# sourceMappingURL=index.js.map
