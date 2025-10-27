// Helpers
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

// Year
$('#yearNow').innerText = new Date().getFullYear();

// Mobile menu toggle
$('#mobileToggle')?.addEventListener('click', () => {
  const navList = $('.nav-list');
  if (navList) navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth scroll
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const el = document.querySelector(a.getAttribute('href'));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
});

// Counters
const counters = $$('.js-count');
const obs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.target;
      let count = 0;
      const step = Math.max(1, Math.floor(target / 100));
      const timer = setInterval(() => {
        count += step;
        if (count >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else el.textContent = count;
      }, 20);
      obs.unobserve(el);
    }
  });
}, { threshold: 0.4 });
counters.forEach(c => obs.observe(c));

// Gallery
const imgs = $$('#gallery .gallery img');
let idx = 0;
function showImg(i){ imgs.forEach((im, j) => im.classList.toggle('active', j === i)); }
function next(){ idx = (idx + 1) % imgs.length; showImg(idx); }
function prev(){ idx = (idx - 1 + imgs.length) % imgs.length; showImg(idx); }
$('.next')?.addEventListener('click', next);
$('.prev')?.addEventListener('click', prev);
setInterval(next, 4000);

// Service Search
$('#serviceSearch').addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  $$('#serviceGrid .service-card').forEach(c => {
    const txt = c.innerText.toLowerCase();
    c.parentElement.style.display = txt.includes(q) ? '' : 'none';
  });
});

// Contact form
const form = $('#contactForm');
const result = $('#contactResult');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#cname').value.trim();
  const email = $('#cemail').value.trim();
  const msg = $('#cmessage').value.trim();
  if (!name || !email || !msg) {
    result.style.display = 'block';
    result.innerHTML = '<div class="text-danger">Please fill all fields.</div>';
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    result.style.display = 'block';
    result.innerHTML = '<div class="text-danger">Please enter a valid email.</div>';
    return;
  }
  result.style.display = 'block';
  result.innerHTML = '<div class="text-success">Message sent! We’ll get back soon.</div>';
  form.reset();
  setTimeout(() => result.style.display = 'none', 4000);
});
$('#contactClear').addEventListener('click', () => form.reset());
