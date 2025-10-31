/* ---------- Fondo canvas (estrellas + partículas rojas suaves) ---------- */
const canvas = document.getElementById('fondo');
const ctx = canvas.getContext('2d');
let w, h;
function resizeCanvas() {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const particles = [];
const N = Math.floor((w*h) / 90000) + 60; // cantidad proporcional al tamaño

for (let i=0;i<N;i++){
  particles.push({
    x: Math.random()*w,
    y: Math.random()*h,
    r: Math.random()*1.6+0.4,
    dx: (Math.random()-0.5)*0.2,
    dy: (Math.random()-0.5)*0.2,
    color: 'rgba(255,255,255,0.75)',
    glow: Math.random()*10+6
  });
}

function draw() {
  // fondo rojo sutil
  const g = ctx.createLinearGradient(0,0,0,h);
  g.addColorStop(0,'#e60000');
  g.addColorStop(1,'#c10000');
  ctx.fillStyle = g;
  ctx.fillRect(0,0,w,h);

  particles.forEach(p=>{
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.shadowBlur = p.glow;
    ctx.shadowColor = p.color;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < -10) p.x = w+10;
    if (p.x > w+10) p.x = -10;
    if (p.y < -10) p.y = h+10;
    if (p.y > h+10) p.y = -10;
  });

  ctx.shadowBlur = 0;
  requestAnimationFrame(draw);
}
draw();

/* ---------- Filtrado y navegación ---------- */
const allProducts = Array.from(document.querySelectorAll('.product-card'));
const tabs = document.querySelectorAll('.nav-tab');
let currentCategory = 'all'; // 'all', 'hombre', 'mujer', 'unisex', or specific like 'camisetasH'

function clearActiveTabs(){
  tabs.forEach(t=>t.classList.remove('active'));
}
function showAllProducts(){
  clearActiveTabs(); document.getElementById('tab-todos').classList.add('active');
  hideAllSubcats();
  clearSubActive();
  currentCategory = 'all';
  filterProducts();
  window.scrollTo({top:0,behavior:'smooth'});
}
function showSubcategories(group){
  clearActiveTabs();
  document.getElementById('tab-'+group).classList.add('active');
  // mostrar barra correspondiente
  hideAllSubcats();
  clearSubActive();
  if(group === 'hombre') document.getElementById('sub-hombre').style.display = 'flex';
  if(group === 'mujer') document.getElementById('sub-mujer').style.display = 'flex';
  if(group === 'unisex') document.getElementById('sub-unisex').style.display = 'flex';

  currentCategory = group;
  filterProducts();
  window.scrollTo({top:120,behavior:'smooth'});
}
function hideAllSubcats(){
  document.getElementById('sub-hombre').style.display = 'none';
  document.getElementById('sub-mujer').style.display = 'none';
  document.getElementById('sub-unisex').style.display = 'none';
}

function clearSubActive(){
  document.querySelectorAll('.subcategory-btn').forEach(btn => btn.classList.remove('active'));
}

/* Filtrar por subcategoria exacta */
function showProducts(category){
  clearSubActive();
  // mantener subcats visibles para permitir navegación
  currentCategory = category;
  filterProducts();
  window.scrollTo({top:120,behavior:'smooth'});
}

/* Función de filtrado combinado (categoría + búsqueda) */
function filterProducts(){
  const searchValue = document.getElementById('searchInput').value.toLowerCase().trim();
  allProducts.forEach(p => {
    const cat = p.getAttribute('data-category') || '';
    const title = p.querySelector('h3').textContent.toLowerCase();
    let show = false;

    // Verificar categoría
    if(currentCategory === 'all'){
      show = true;
    } else if(currentCategory === 'hombre'){
      show = ['camisetasH','busosH','conjuntosH','gorrasH','accesoriosH','zapatosH'].includes(cat);
    } else if(currentCategory === 'mujer'){
      show = ['topsM','cropM','accesoriosM'].includes(cat);
    } else if(currentCategory === 'unisex'){
      show = ['buzosU','camisetasU'].includes(cat);
    } else {
      show = cat === currentCategory;
    }

    // Verificar búsqueda
    if(show && searchValue){
      show = title.includes(searchValue) || cat.toLowerCase().includes(searchValue);
    }

    p.style.display = show ? 'block' : 'none';
  });
}

/* Event listener para búsqueda */
document.getElementById('searchInput').addEventListener('input', filterProducts);

/* ---------- Carrusel dentro de cada tarjeta ---------- */
function nextImage(e, btn){
  e.stopPropagation();
  const wrap = btn.closest('.image-carousel');
  if(!wrap) return;
  const imgs = Array.from(wrap.querySelectorAll('.carousel-image'));
  const currentIndex = imgs.findIndex(img => img.classList.contains('active'));
  imgs[currentIndex].classList.remove('active');
  const nextIndex = (currentIndex + 1) % imgs.length;
  imgs[nextIndex].classList.add('active');
}
function prevImage(e, btn){
  e.stopPropagation();
  const wrap = btn.closest('.image-carousel');
  if(!wrap) return;
  const imgs = Array.from(wrap.querySelectorAll('.carousel-image'));
  const currentIndex = imgs.findIndex(img => img.classList.contains('active'));
  imgs[currentIndex].classList.remove('active');
  const nextIndex = (currentIndex - 1 + imgs.length) % imgs.length;
  imgs[nextIndex].classList.add('active');
}

/* Cuando se hace click en la card, evitamos abrir modal doble si se clickea en botones del carousel */
function openModal(title, sizes, colors, price){
  const modal = document.getElementById('productModal');
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalSizes').innerText = sizes;
  document.getElementById('modalColors').innerText = colors;
  document.getElementById('modalPrice').innerText = price;
  modal.style.display = 'flex';
}
function openModalFromBtn(event,title,sizes,colors,price){
  event.stopPropagation();
  openModal(title,sizes,colors,price);
}
function closeModal(){
  document.getElementById('productModal').style.display = 'none';
}

/* Imagen ampliada */
function showImageModal(event, src){
  event.stopPropagation();
  const im = document.getElementById('imageModalImg');
  im.src = src;
  document.getElementById('imageModal').style.display = 'flex';
}
function closeImageModal(){
  document.getElementById('imageModal').style.display = 'none';
  document.getElementById('imageModalImg').src = '';
}

/* Event listeners para navegación */
document.getElementById('tab-todos').addEventListener('click', showAllProducts);
document.getElementById('tab-hombre').addEventListener('click', () => showSubcategories('hombre'));
document.getElementById('tab-mujer').addEventListener('click', () => showSubcategories('mujer'));
document.getElementById('tab-unisex').addEventListener('click', () => showSubcategories('unisex'));

// Event listeners para subcategorías
document.querySelectorAll('.subcategory-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    clearSubActive();
    this.classList.add('active');
    const category = this.getAttribute('data-category');
    showProducts(category);
  });
});

/* Evitar que los botones dentro de card abran el modal principal por el onclick del card */
document.addEventListener('click', function(e){
  // si el click fue en un prev/next, ya se maneja
});



/* Inicial: mostrar todos */
showAllProducts();
