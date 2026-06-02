// ======================================================
//  Ibu Basaria - Masakan Khas Batak
// ======================================================

document.addEventListener('DOMContentLoaded', () => {

  const nav = document.getElementById('main-nav');
  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const backTop = document.getElementById('back-top');
  let mobileOpen = false;

  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
    if (backTop) backTop.classList.toggle('visible', window.scrollY > 400);
  });

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileOpen = !mobileOpen;
      mobileNav.classList.toggle('open', mobileOpen);

      const spans = hamburger.querySelectorAll('span');
      if (mobileOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans.forEach(s => {
          s.style.transform = '';
          s.style.opacity = '';
        });
      }
    });

    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileOpen = false;
        mobileNav.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => {
          s.style.transform = '';
          s.style.opacity = '';
        });
      });
    });
  }

  /* GALLERY MENU MASAKAN */
  const galleryData = [
    {
      src: 'images/Ikanmas.Arsik.jpeg',
      title: 'Ikan Mas Arsik ⭐',
      price: 'Rp 125.000 / ekor',
      category: 'ikan',
      catLabel: 'Menu Favorit'
    },
    {
      src: 'images/AyamGulai.jpeg',
      title: 'Ayam Gule',
      price: 'Rp 220.000 / ayam',
      category: 'ayam',
      catLabel: 'Menu Ayam'
    },
    {
      src: 'images/AyamGota.jpg',
      title: 'Ayam Gota',
      price: 'Rp 220.000 / ayam',
      category: 'ayam',
      catLabel: 'Menu Ayam'
    },
    {
      src: 'images/SayurTaucho.jpg',
      title: 'Sayur Tauco Terong + Udang + Pete',
      price: 'Rp 150.000 / kg',
      category: 'sayur',
      catLabel: 'Menu Sayur'
    },
    {
      src: 'images/BabiKecap.jpg',
      title: 'Babi Kecap',
      price: 'Rp 200.000 / kg',
      category: 'babi',
      catLabel: 'Menu Babi'
    },
    {
      src: 'images/BabiSaksang.jpg',
      title: 'Babi Saksang ⭐',
      price: 'Rp 200.000 / kg',
      category: 'babi',
      catLabel: 'Menu Favorit'
    },
    {
      src: 'images/BabiPanggang.jpg',
      title: 'Babi Panggang',
      price: 'Rp 220.000 / kg',
      category: 'babi',
      catLabel: 'Menu Babi'
    },
    {
      src: 'images/Sayusingkong.jpg',
      title: 'Daun Singkong',
      price: 'Rp 50.000 / kg',
      category: 'sayur',
      catLabel: 'Menu Sayur'
    },
    {
      src: 'images/SopIga.jpg',
      title: 'Sop Iga Babi',
      price: 'Rp 180.000 / kg',
      category: 'babi',
      catLabel: 'Menu Kuah'
    },
    {
      src: 'images/IkanTeriKacang.jpg',
      title: 'Ikan Teri Kacang',
      price: 'Rp 250.000 / kg',
      category: 'ikan',
      catLabel: 'Menu Ikan'
    },
    {
      src: 'images/KetupatKetan.jpg',
      title: 'Ketupat',
      price: 'Rp 4.000 / biji',
      category: 'paket',
      catLabel: 'Menu Tambahan'
    }
  ];

  const grid = document.getElementById('gallery-grid');
  let currentFilter = 'all';
  let currentIndex = 0;
  let filteredItems = [...galleryData];

  function renderGallery(filter) {
    if (!grid) return;

    filteredItems = filter === 'all'
      ? [...galleryData]
      : galleryData.filter(i => i.category === filter);

    grid.innerHTML = '';

    filteredItems.forEach((item, idx) => {
      const el = document.createElement('div');
      el.className = 'gallery-item reveal';
      el.dataset.index = idx;

      el.innerHTML = `
        <img src="${item.src}" alt="${item.title}" loading="lazy" />
        <div class="gallery-overlay">
          <span class="gallery-overlay-cat">${item.catLabel}</span>
          <span class="gallery-overlay-title">${item.title}</span>
          <span class="gallery-overlay-price">${item.price}</span>
        </div>
        <div class="gallery-expand">+</div>
      `;

      el.addEventListener('click', () => openLightbox(idx));
      grid.appendChild(el);
    });

    requestAnimationFrame(() => {
      setTimeout(() => {
        grid.querySelectorAll('.reveal').forEach((el, i) => {
          setTimeout(() => el.classList.add('visible'), i * 80);
        });
      }, 50);
    });
  }

  renderGallery('all');

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderGallery(currentFilter);
    });
  });

  /* LIGHTBOX */
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbTitle = document.getElementById('lb-title');
  const lbCat = document.getElementById('lb-cat');

  function openLightbox(index) {
    if (!lightbox) return;
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    if (!lbImg || !lbTitle || !lbCat) return;

    const item = filteredItems[currentIndex];
    lbImg.style.opacity = '0';

    setTimeout(() => {
      lbImg.src = item.src;
      lbImg.alt = item.title;
      lbTitle.textContent = item.title;
      lbCat.textContent = `${item.catLabel} • ${item.price}`;
      lbImg.style.opacity = '1';
      lbImg.style.transition = 'opacity 0.3s ease';
    }, 150);
  }

  const lbClose = document.getElementById('lb-close');
  const lbPrev = document.getElementById('lb-prev');
  const lbNext = document.getElementById('lb-next');

  if (lbClose) lbClose.addEventListener('click', closeLightbox);

  if (lbPrev) {
    lbPrev.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
      updateLightbox();
    });
  }

  if (lbNext) {
    lbNext.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % filteredItems.length;
      updateLightbox();
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', e => {
    if (!lightbox || !lightbox.classList.contains('open')) return;

    if (e.key === 'Escape') closeLightbox();

    if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
      updateLightbox();
    }

    if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % filteredItems.length;
      updateLightbox();
    }
  });

  /* PILIH PAKET */
  document.querySelectorAll('.btn-book-package').forEach(btn => {
    btn.addEventListener('click', () => {
      const pkg = btn.dataset.package;
      const select = document.getElementById('form-package');

      if (select) select.value = pkg;

      const booking = document.getElementById('booking');
      if (booking) booking.scrollIntoView({ behavior: 'smooth' });

      setTimeout(() => {
        if (select) {
          select.classList.add('highlight');
          setTimeout(() => select.classList.remove('highlight'), 800);
        }
      }, 700);
    });
  });

  /* FORM PEMESANAN */
  const form = document.getElementById('booking-form');
  const formWrap = document.getElementById('form-inner');
  const formSuccess = document.getElementById('form-success');
  const submitBtn = document.getElementById('btn-submit');

  const validators = {
    'form-name': v => v.trim().length >= 3 || 'Nama minimal 3 karakter',
    'form-email': v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Email tidak valid',
    'form-phone': v => /^[0-9+\-\s]{8,15}$/.test(v) || 'Nomor WhatsApp tidak valid',
    'form-package': v => v !== '' || 'Pilih paket pesanan',
    'form-date': v => {
      if (!v) return 'Tanggal pengiriman wajib diisi';

      const d = new Date(v);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (d < today) return 'Pilih tanggal hari ini atau setelahnya';
      return true;
    },
    'form-location': v => v.trim().length >= 5 || 'Alamat pengiriman minimal 5 karakter',
    'form-terms': v => v || 'Harap menyetujui konfirmasi pemesanan'
  };

  function validateField(id) {
    const el = document.getElementById(id);
    const errEl = document.getElementById(id + '-err');

    if (!el || !errEl) return true;

    const val = el.type === 'checkbox' ? el.checked : el.value;
    const result = validators[id] ? validators[id](val) : true;

    if (result === true) {
      el.classList.remove('error');
      errEl.classList.remove('show');
      errEl.textContent = '';
      return true;
    } else {
      el.classList.add('error');
      errEl.classList.add('show');
      errEl.textContent = result;
      return false;
    }
  }

  Object.keys(validators).forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    const evts = el.type === 'checkbox' ? ['change'] : ['blur', 'input'];
    evts.forEach(evt => el.addEventListener(evt, () => validateField(id)));
  });

  const dateInput = document.getElementById('form-date');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();

      const allValid = Object.keys(validators).map(validateField).every(Boolean);

      if (!allValid) {
        const firstErr = form.querySelector('.error');
        if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
      }

      await new Promise(r => setTimeout(r, 1200));

      const nama = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const telepon = document.getElementById('form-phone').value;
      const paket = document.getElementById('form-package').value;
      const tanggal = document.getElementById('form-date').value;
      const alamat = document.getElementById('form-location').value;
      const catatan = document.getElementById('form-notes').value;

      const pesanWA =
        `Halo Ibu Basaria, saya ingin memesan makanan.%0A%0A` +
        `Nama: ${nama}%0A` +
        `Email: ${email}%0A` +
        `No WhatsApp: ${telepon}%0A` +
        `Paket: ${paket}%0A` +
        `Tanggal Pengiriman: ${tanggal}%0A` +
        `Alamat: ${alamat}%0A` +
        `Catatan: ${catatan || '-'}`;

      console.log('Pesanan Ibu Basaria:', {
        nama,
        email,
        telepon,
        paket,
        tanggal,
        alamat,
        catatan,
        waktu: new Date().toISOString()
      });

      if (formWrap) formWrap.style.display = 'none';
      if (formSuccess) formSuccess.classList.add('show');

      if (submitBtn) {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }

      setTimeout(() => {
        window.open(`https://wa.me/6282111318783?text=${pesanWA}`, '_blank');
      }, 800);
    });
  }

  const btnNewOrder = document.getElementById('btn-new-order');
  if (btnNewOrder && form) {
    btnNewOrder.addEventListener('click', () => {
      form.reset();
      if (formWrap) formWrap.style.display = '';
      if (formSuccess) formSuccess.classList.remove('show');
    });
  }

  /* SCROLL REVEAL */
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* BACK TO TOP */
  if (backTop) {
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* SMOOTH SCROLL */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));

      if (target) {
        e.preventDefault();

        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* COUNTER */
  function animateCounter(el, target, duration = 2000) {
    const start = performance.now();

    const update = time => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      el.textContent = Math.round(eased * target) + (el.dataset.suffix || '');

      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }

  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        animateCounter(el, parseInt(el.dataset.target), 2000);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(el => statsObserver.observe(el));

  /* TESTIMONI BERJALAN */
  const track = document.querySelector('.testi-track');
  if (track) {
    const cards = track.innerHTML;
    track.innerHTML += cards;
  }

});
