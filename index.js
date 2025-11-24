import{a as d,S as h,i as n}from"./assets/vendor-B-Rlw6V1.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function e(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=e(t);fetch(t.href,o)}})();const g="53386228-9ccf01ca4b721fbc8928b7547",y="https://pixabay.com/api/";function b(s,r=1,e=40){return d.get(y,{params:{key:g,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:e}}).then(i=>i.data)}const m=".gallery",L=".loader",a=document.querySelector(m),c=document.querySelector(L),p=new h(`${m} a`,{captionsData:"alt",captionDelay:250});function w(s){if(!a)return;const r=s.map(e=>`
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
        `).join("");a.insertAdjacentHTML("beforeend",r),p.refresh()}function E(){a&&(a.innerHTML="",p.refresh())}function S(){c&&c.classList.add("is-active")}function v(){c&&c.classList.remove("is-active")}const f=document.getElementById("search-form"),u=document.getElementById("search-input");f?f.addEventListener("submit",R):console.warn("Search form not found: #search-form");function R(s){s.preventDefault();const r=u?u.value.trim():"";if(!r){n.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}E(),S(),b(r).then(e=>{if(!e||!Array.isArray(e.hits))throw new Error("Unexpected response from API");if(e.hits.length===0){n.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}w(e.hits),n.success({title:"Success",message:`Found ${e.hits.length} images for "${r}"`,position:"topRight",timeout:2e3})}).catch(e=>{console.error(e),n.error({title:"Error",message:"Something went wrong while fetching images. Check console.",position:"topRight"})}).finally(()=>{v()})}
//# sourceMappingURL=index.js.map
