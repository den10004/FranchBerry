const overlay = document.getElementById('modalOverlay');
const openBtns = document.querySelectorAll('#addFranchiseBtn');
const closeBtn = document.getElementById('modalClose');
const form = document.getElementById('modalForm');

function openModal(e) {
  e.preventDefault();
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

openBtns.forEach((btn) => btn.addEventListener('click', openModal));
closeBtn.addEventListener('click', closeModal);

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  console.log('Данные формы:', data);
  closeModal();
  form.reset();
});
