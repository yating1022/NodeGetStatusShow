/*
 * Claymorphism — Custom JS
 * Fluffy, inflatable, macaron-colored digital clay.
 * Every element is a soft object you want to poke.
 */

;(function () {
  'use strict'

  /* ─── 0. Default to light mode for first-time visitors ─── */
  ;(function () {
    try {
      var stored = localStorage.getItem('nodeget.theme')
      if (!stored) {
        localStorage.setItem('nodeget.theme', 'light')
        document.documentElement.classList.remove('dark')
      }
    } catch (_) {}
  })()

  /* ─── 1. Preload Google Fonts ─── */
  function loadFonts() {
    var link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = 'https://fonts.googleapis.com'
    document.head.appendChild(link)

    var link2 = document.createElement('link')
    link2.rel = 'preconnect'
    link2.href = 'https://fonts.gstatic.com'
    link2.crossOrigin = 'anonymous'
    document.head.appendChild(link2)

    var fontLink = document.createElement('link')
    fontLink.rel = 'stylesheet'
    fontLink.href =
      'https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@400;500;600;700&display=swap'
    document.head.appendChild(fontLink)
  }

  loadFonts()

  /* ─── 2. Apply Baloo 2 to site name ─── */
  function applyFonts() {
    var siteNameEl = document.querySelector('header a span.font-semibold')
    if (siteNameEl) {
      siteNameEl.style.fontFamily = "'Baloo 2', 'Nunito', sans-serif"
      siteNameEl.style.fontWeight = '700'
    }
  }

  /* ─── 3. Clay Button Physics — Jelly squish ─── */
  function setupClayPhysics() {
    document.addEventListener('mousedown', function (e) {
      var btn = e.target.closest('button, a[role="button"]')
      if (!btn) return
      // Skip icon buttons (h-9 w-9) — CSS :active handles them
      if (btn.classList.contains('h-9') && btn.classList.contains('w-9')) return
      btn.style.transform = 'scale(0.93)'
      btn.style.transition = 'transform 100ms cubic-bezier(0.34, 1.56, 0.64, 1)'
      btn.style.boxShadow =
        'inset 5px 5px 10px rgba(150, 145, 190, 0.18), ' +
        'inset -5px -5px 10px rgba(255, 255, 255, 0.55)'
    })

    document.addEventListener('mouseup', function () {
      var pressed = document.querySelectorAll('[style*="scale(0.93)"]')
      pressed.forEach(function (el) {
        el.style.transform = ''
        el.style.boxShadow = ''
        // Spring bounce-back
        el.style.transition = 'all 400ms cubic-bezier(0.34, 1.56, 0.64, 1)'
        setTimeout(function () { el.style.transition = '' }, 450)
      })
    })

    document.addEventListener('mouseleave', function (e) {
      if (e.target && e.target.style && e.target.style.transform === 'scale(0.93)') {
        e.target.style.transform = ''
        e.target.style.boxShadow = ''
      }
    }, true)
  }

  /* ─── 4. Card Entrance — Soft clay pop-in ─── */
  function animateCards() {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target
            el.style.opacity = '1'
            el.style.transform = 'translateY(0) scale(1)'
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.06, rootMargin: '-30px' },
    )

    var mutObs = new MutationObserver(function () {
      var cards = document.querySelectorAll('.card-soft')
      cards.forEach(function (card, i) {
        if (card.dataset.clayInit) return
        card.dataset.clayInit = '1'
        card.style.opacity = '0'
        card.style.transform = 'translateY(20px) scale(0.96)'
        card.style.transition =
          'opacity 500ms cubic-bezier(0.34, 1.56, 0.64, 1), ' +
          'transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1), ' +
          'box-shadow 400ms ease-out'
        card.style.transitionDelay = Math.min(i * 100, 500) + 'ms'
        observer.observe(card)
      })
    })

    mutObs.observe(document.getElementById('root'), { childList: true, subtree: true })
  }

  /* ─── 5. Inject Floating Macaron Blobs (desktop only) ─── */
  function injectClayBlobs() {
    if (window.innerWidth < 1024) return

    var bg = document.querySelector('.bg-soft, .bg-background')
    if (!bg) return

    var parent = bg.parentNode

    var container = document.createElement('div')
    container.setAttribute('aria-hidden', 'true')
    Object.assign(container.style, {
      position: 'fixed',
      inset: '0',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: '-1',
    })

    var blobs = [
      {
        top: '-5%',
        left: '-8%',
        size: '50vh',
        color: 'rgba(139, 92, 246, 0.08)',
        anim: 'clay-float',
        dur: '10s',
      },
      {
        top: '20%',
        right: '-10%',
        size: '45vh',
        color: 'rgba(244, 114, 182, 0.07)',
        anim: 'clay-float-alt',
        dur: '12s',
        delay: '2s',
      },
      {
        bottom: '5%',
        left: '10%',
        size: '40vh',
        color: 'rgba(251, 203, 109, 0.08)',
        anim: 'clay-float',
        dur: '11s',
        delay: '4s',
      },
      {
        bottom: '25%',
        right: '15%',
        size: '35vh',
        color: 'rgba(109, 210, 160, 0.07)',
        anim: 'clay-float-alt',
        dur: '13s',
        delay: '1s',
      },
    ]

    blobs.forEach(function (b) {
      var blob = document.createElement('div')
      Object.assign(blob.style, {
        position: 'absolute',
        width: b.size,
        height: b.size,
        borderRadius: '50%',
        background: 'radial-gradient(circle, ' + b.color + ' 0%, transparent 70%)',
        filter: 'blur(50px)',
        animation: b.anim + ' ' + b.dur + ' ease-in-out infinite',
        animationDelay: b.delay || '0s',
        top: b.top || 'auto',
        bottom: b.bottom || 'auto',
        left: b.left || 'auto',
        right: b.right || 'auto',
      })
      container.appendChild(blob)
    })

    parent.appendChild(container)
  }

  /* ─── 6. Replace loading spinner with clay animation ─── */
  function replaceLoader() {
    function tryReplace() {
      var loadingDiv = document.querySelector('.py-24.flex.flex-col.items-center.gap-3.text-muted-foreground')
      if (!loadingDiv || loadingDiv.dataset.clayLoader) return
      // Verify it's the loader (has animate-spin SVG or "连接后端" text)
      var spinner = loadingDiv.querySelector('.animate-spin')
      var text = loadingDiv.querySelector('span')
      if (!spinner && !(text && text.textContent.indexOf('连接') !== -1)) return

      loadingDiv.dataset.clayLoader = '1'
      // Remove gap-3, add gap-8
      loadingDiv.classList.remove('gap-3')
      loadingDiv.classList.add('gap-8')

      // Get logo from navbar
      var logoSrc = ''
      var navLogo = document.querySelector('header img')
      if (navLogo) logoSrc = navLogo.src

      // Build clay loader HTML
      var html = ''
      if (logoSrc) {
        html += '<img src="' + logoSrc + '" alt="" class="clay-loader-logo w-16 h-16 rounded-2xl object-contain">'
      }
      html += '<div class="clay-loader" aria-label="加载中"><span></span><span></span><span></span></div>'
      loadingDiv.innerHTML = html
    }

    // Try immediately and on mutations
    tryReplace()
    var obs = new MutationObserver(tryReplace)
    obs.observe(document.getElementById('root'), { childList: true, subtree: true })

    // Stop watching after 30s (loading shouldn't take that long)
    setTimeout(function () { obs.disconnect() }, 30000)
  }

  /* ─── Init ─── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }

  function init() {
    applyFonts()
    setupClayPhysics()
    animateCards()
    injectClayBlobs()
    replaceLoader()
  }
})()
