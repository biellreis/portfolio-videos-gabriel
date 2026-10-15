// ==========================================================================
// GABRIEL REIS — PORTFÓLIO DE VÍDEOS VERTICAIS
// Player Vertical 9:16 Nativo, Diagramação sem Viúvas, Visualizações e Motion
// ==========================================================================

(function () {
  "use strict";

  const projects = window.PORTFOLIO_PROJECTS || [];
  let activeCategory = "all";

  const wrapperEl = document.getElementById("projects-wrapper");
  const catButtons = document.querySelectorAll(".cat-btn");

  const SVG_PLAY = `<svg viewBox="0 0 24 24"><polygon points="6 4 20 12 6 20 6 4"></polygon></svg>`;
  const SVG_PAUSE = `<svg viewBox="0 0 24 24"><line x1="8" y1="5" x2="8" y2="19"></line><line x1="16" y1="5" x2="16" y2="19"></line></svg>`;
  const SVG_PLAY_MINI = `<svg viewBox="0 0 24 24"><polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none"></polygon></svg>`;
  const SVG_VOL_ON = `<svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>`;
  const SVG_VOL_OFF = `<svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
  const SVG_FULLSCREEN = `<svg viewBox="0 0 24 24"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>`;

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function formatNum(n) {
    return Number(n || 0).toLocaleString("pt-BR");
  }

  function formatTime(sec) {
    if (!sec || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }

  // Previne linhas viúvas (palavra isolada na última linha) unindo as duas últimas palavras
  function noWidow(text) {
    if (!text) return "";
    return String(text).trim().replace(/\s+([^\s]+)$/, "&nbsp;$1");
  }

  // Constrói o Player Vertical 9:16 com HTML5 <video> nativo
  function buildPlayerHTML(p) {
    return `
      <div class="project-media-col motion-video d-2">
        <div class="vplayer" data-code="${p.code}">
          <video
            class="vplayer-video"
            src="${p.video}"
            poster="${p.thumb}"
            preload="metadata"
            playsinline
            loop
          ></video>

          <!-- Botão Central de Play Personalizado -->
          <div class="vplayer-center-overlay" data-role="toggle-play">
            <div class="play-btn-circle" aria-label="Reproduzir vídeo">
              ${SVG_PLAY}
            </div>
          </div>

          <!-- Barra Minimalista de Controles do Player -->
          <div class="vplayer-controls">
            <div class="vplayer-progress-area" data-role="scrub">
              <div class="vplayer-progress-track">
                <div class="vplayer-progress-fill"></div>
              </div>
            </div>
            <div class="vplayer-bar-row">
              <div class="vplayer-left-btns">
                <button type="button" class="ctrl-icon-btn" data-role="btn-play" aria-label="Play ou Pause">
                  ${SVG_PLAY_MINI}
                </button>
                <button type="button" class="ctrl-icon-btn" data-role="btn-mute" aria-label="Som">
                  ${SVG_VOL_ON}
                </button>
                <span class="vplayer-time">0:00</span>
              </div>
              <div class="vplayer-right-btns">
                <button type="button" class="ctrl-icon-btn" data-role="btn-fullscreen" aria-label="Tela cheia">
                  ${SVG_FULLSCREEN}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Constrói os Números de Curtidas, Comentários e Visualizações
  function buildStatsHTML(p) {
    return `
      <div class="project-stats motion-fade d-3">
        <div class="stat-block">
          <span class="stat-num" data-count="${p.likes}">0</span>
          <span class="stat-caption">Curtidas</span>
        </div>
        <div class="stat-block">
          <span class="stat-num" data-count="${p.comments}">0</span>
          <span class="stat-caption">Comentários</span>
        </div>
        <div class="stat-block">
          <span class="stat-num" data-count="${p.views}">0</span>
          <span class="stat-caption">Visualizações</span>
        </div>
      </div>
    `;
  }

  // Constrói cada sessão de acordo com o contexto (4 variações limpas)
  function buildSectionHTML(p) {
    const idx = pad(p.id);
    const playerHTML = buildPlayerHTML(p);
    const statsHTML = buildStatsHTML(p);
    const safeTitle = noWidow(p.title);
    const safeDesc = noWidow(p.description);

    if (p.layout === "center-stage") {
      return `
        <article class="project-section layout-center-stage" id="projeto-${p.id}">
          <div class="project-inner">
            <div class="project-grid">
              <!-- Coluna Esquerda: Identificação e Título Bold -->
              <div class="project-info-col">
                <div class="project-meta-top motion-fade d-1">
                  <span class="project-num">${idx}</span>
                  <span class="project-cat-badge">${p.category}</span>
                </div>
                <h2 class="project-title motion-fade d-2">${safeTitle}</h2>
                <div class="project-bottom-meta motion-fade d-3">
                  <span>${p.client} · ${p.context}</span>
                </div>
              </div>

              <!-- Coluna Central: Vídeo Vertical 9:16 -->
              ${playerHTML}

              <!-- Coluna Direita: Descrição Curta, Números e Formatos -->
              <div class="project-info-col">
                <p class="project-desc motion-fade d-2">${safeDesc}</p>
                ${statsHTML}
                <div class="project-bottom-meta motion-fade d-4">
                  <span>${p.formats}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="section-divider"></div>
        </article>
      `;
    }

    return `
      <article class="project-section layout-${p.layout}" id="projeto-${p.id}">
        <div class="project-inner">
          <div class="project-grid">
            <div class="project-info-col">
              <div class="project-meta-top motion-fade d-1">
                <span class="project-num">${idx}</span>
                <span class="project-cat-badge">${p.category}</span>
                <span class="project-context-text">${p.client} · ${p.context}</span>
              </div>
              <h2 class="project-title motion-fade d-2">${safeTitle}</h2>
              <p class="project-desc motion-fade d-2">${safeDesc}</p>
              ${statsHTML}
              <div class="project-bottom-meta motion-fade d-4">
                <span>${p.formats}</span>
              </div>
            </div>

            ${playerHTML}
          </div>
        </div>
        <div class="section-divider"></div>
      </article>
    `;
  }

  function renderPortfolio() {
    const list =
      activeCategory === "all"
        ? projects
        : projects.filter((p) => p.categorySlug === activeCategory);

    wrapperEl.innerHTML = list.map(buildSectionHTML).join("");
    bindVideoPlayers();
    setupScrollMotion();
  }

  function pauseAllExcept(currentVideo) {
    document.querySelectorAll(".vplayer-video").forEach((vid) => {
      if (vid !== currentVideo && !vid.paused) {
        vid.pause();
      }
    });
  }

  function bindVideoPlayers() {
    document.querySelectorAll(".vplayer").forEach((playerEl) => {
      const video = playerEl.querySelector(".vplayer-video");
      const playBtn = playerEl.querySelector('[data-role="btn-play"]');
      const muteBtn = playerEl.querySelector('[data-role="btn-mute"]');
      const fsBtn = playerEl.querySelector('[data-role="btn-fullscreen"]');
      const scrubArea = playerEl.querySelector('[data-role="scrub"]');
      const progressFill = playerEl.querySelector(".vplayer-progress-fill");
      const timeEl = playerEl.querySelector(".vplayer-time");

      function togglePlay() {
        if (video.paused) {
          pauseAllExcept(video);
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }

      video.addEventListener("click", togglePlay);
      playerEl
        .querySelector('[data-role="toggle-play"]')
        .addEventListener("click", (e) => {
          e.stopPropagation();
          togglePlay();
        });

      playBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        togglePlay();
      });

      video.addEventListener("play", () => {
        playerEl.classList.add("is-playing");
        playBtn.innerHTML = SVG_PAUSE;
      });

      video.addEventListener("pause", () => {
        playerEl.classList.remove("is-playing");
        playBtn.innerHTML = SVG_PLAY_MINI;
      });

      video.addEventListener("timeupdate", () => {
        if (video.duration) {
          const pct = (video.currentTime / video.duration) * 100;
          progressFill.style.width = `${pct}%`;
          timeEl.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
        }
      });

      video.addEventListener("loadedmetadata", () => {
        if (video.duration) {
          timeEl.textContent = `0:00 / ${formatTime(video.duration)}`;
        }
      });

      scrubArea.addEventListener("click", (e) => {
        e.stopPropagation();
        const rect = scrubArea.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        if (video.duration) {
          video.currentTime = ratio * video.duration;
        }
      });

      muteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        video.muted = !video.muted;
        muteBtn.innerHTML = video.muted ? SVG_VOL_OFF : SVG_VOL_ON;
      });

      fsBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        } else if (playerEl.requestFullscreen) {
          playerEl.requestFullscreen().catch(() => {});
        } else if (video.webkitEnterFullscreen) {
          video.webkitEnterFullscreen();
        }
      });
    });
  }

  function animateMetric(el) {
    if (el.dataset.done === "1") return;
    el.dataset.done = "1";
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 950;
    const start = performance.now();

    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = formatNum(Math.round(eased * target));
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = formatNum(target);
      }
    }
    requestAnimationFrame(tick);
  }

  let scrollObserver = null;
  function setupScrollMotion() {
    if (scrollObserver) scrollObserver.disconnect();

    scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sec = entry.target;
          if (entry.isIntersecting) {
            sec.classList.add("in-view");
            sec.querySelectorAll("[data-count]").forEach(animateMetric);
          } else {
            const vid = sec.querySelector(".vplayer-video");
            if (vid && !vid.paused) {
              vid.pause();
            }
          }
        });
      },
      { threshold: 0.18 }
    );

    document.querySelectorAll(".project-section").forEach((sec) => {
      scrollObserver.observe(sec);
    });
  }

  // Filtro de categorias no Menu Superior
  catButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.cat;
      catButtons.forEach((b) => b.classList.toggle("active", b === btn));
      renderPortfolio();
      const target = document.getElementById("projects-wrapper");
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 68;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
  });

  renderPortfolio();
})();
