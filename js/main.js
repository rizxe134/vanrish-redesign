(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile nav
  var toggle = document.querySelector('.nav__toggle'), menu = document.getElementById('menu');
  toggle.addEventListener('click', function(){
    var open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', open); menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){
    if (menu.classList.contains('open')) toggle.click(); }); });
  document.querySelectorAll('.dd>button').forEach(function(b){
    b.addEventListener('click', function(){ b.setAttribute('aria-expanded', b.getAttribute('aria-expanded') !== 'true'); });
  });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape'){
    document.querySelectorAll('.dd>button[aria-expanded=true]').forEach(function(b){ b.setAttribute('aria-expanded','false'); });
    if (menu.classList.contains('open')) toggle.click(); }});

  // Calendly popup (falls back to /talk-to-experts/ link if Calendly fails)
  document.querySelectorAll('[data-calendly]').forEach(function(a){
    a.addEventListener('click', function(e){
      if (window.Calendly){ e.preventDefault(); Calendly.initPopupWidget({url:'https://calendly.com/rajnish-vanrish/30min'}); }
    });
  });

  // Chat: keep live toggleChat() contract, also show panel
  var chat = document.getElementById('chatbot');
  var origToggle = window.toggleChat;
  window.toggleChat = function(){
    var open = !chat.classList.contains('open');
    chat.classList.toggle('open', open);
    document.getElementById('chat-body').style.display = open ? 'block' : 'none';
    chat.querySelector('.chat-header').setAttribute('aria-expanded', open);
    if (open) document.getElementById('user-input').focus();
  };
  document.getElementById('user-input').addEventListener('keydown', function(e){
    if (e.key === 'Enter' && window.sendMessage) sendMessage('/chatbot-api.php'); });

  // Contact form stub
  document.querySelector('.form').addEventListener('submit', function(e){
    e.preventDefault(); this.querySelector('button').textContent = 'Thanks — we\'ll be in touch'; });

  // Marquee: duplicate for seamless loop
  var track = document.querySelector('.marquee__track');
  if (!reduce) track.innerHTML += track.innerHTML.replace(/<a /g, '<a aria-hidden="true" tabindex="-1" ');

  if (reduce || !window.gsap) return;
  document.documentElement.classList.add('js-motion');
  gsap.registerPlugin(ScrollTrigger);

  if (window.Lenis){
    var lenis = new Lenis({ duration: 1.1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function(t){ lenis.raf(t * 1000); }); gsap.ticker.lagSmoothing(0);
  }

  gsap.to('.hero__title .line>span', { y: 0, duration: 1.1, ease: 'power3.out', stagger: .12, delay: .1 });
  gsap.to('.hero .reveal', { opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .1, delay: .45 });

  ScrollTrigger.batch('main section:not(.hero) .reveal', {
    start: 'top 88%', once: true,
    onEnter: function(els){ gsap.to(els, { opacity: 1, y: 0, duration: .8, ease: 'power3.out', stagger: .08 }); }
  });

  // Marquee (transform only), pauses on hover/focus
  var loop = gsap.to(track, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 });
  track.addEventListener('mouseenter', function(){ loop.pause(); });
  track.addEventListener('mouseleave', function(){ loop.play(); });
  track.addEventListener('focusin', function(){ loop.pause(); });
  track.addEventListener('focusout', function(){ loop.play(); });

  // Subtle hero grid parallax
  gsap.to('.hero__grid', { yPercent: 20, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
})();
