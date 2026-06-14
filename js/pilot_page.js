// docs/js/pilot_page.js

document.addEventListener("DOMContentLoaded", () => {
  const feedEl    = document.getElementById("pilot-updates-feed");
  const dirEl     = document.getElementById("pilot-directory");
  const allFeedEl = document.getElementById("all-updates-feed");

  if (feedEl) {
    initPilotPage(feedEl);
  } else if (dirEl) {
    initPilotDirectory(dirEl);
  } else if (allFeedEl) {
    initAllUpdatesFeed(allFeedEl);
  }
});

// ---------------------------------------------------------------------------
// Pilot page mode
// ---------------------------------------------------------------------------

function initPilotPage(feedEl) {
  const raw = window.location.pathname;
  const base = raw.endsWith("/") ? raw : raw.replace(/\/[^/]+$/, "/");

  const shortName = base.replace(/\/$/, "").split("/").pop();
  const rssLink = document.getElementById("pilot-rss-link");
  if (rssLink && shortName) {
    rssLink.href = "/feeds/" + shortName + ".xml";
    rssLink.removeAttribute("hidden");
  }

  fetch(base + "pilot.json")
    .then(r => {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then(pilot => {
      hydratePilotFields(pilot);
      hydratePhaseStepper(pilot.status);
    })
    .catch(() => {
      const notice = document.createElement("p");
      notice.className = "pilot-data-notice";
      notice.textContent = "Pilot data not yet aggregated — check back shortly.";
      const header = document.querySelector(".pilot-detail-header") ||
                     document.querySelector("[data-pilot-field]")?.closest("section") ||
                     document.querySelector("article");
      if (header) header.before(notice);
    });

  // Inject filter bar above feed
  const filterBar = document.createElement("div");
  filterBar.id = "pilot-updates-filter-bar";
  filterBar.hidden = true;
  feedEl.before(filterBar);

  fetch(base + "updates_index.json")
    .then(r => {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then(index => {
      renderUpdatesFeed(feedEl, index, base);
      const hash = window.location.hash;
      if (hash.startsWith("#update=")) {
        const slug = hash.slice(8);
        const entry = index.find(e => e.slug === slug);
        if (entry) openUpdateModal(entry, base);
      }
    })
    .catch(() => {
      feedEl.innerHTML = '<p class="pilot-data-notice">No updates posted yet.</p>';
    });
}

// ---------------------------------------------------------------------------
// Aggregated feed mode (journey/feed.md)
// ---------------------------------------------------------------------------

function pilotPageAbsPath(url) {
  if (!url) return "";
  if (url.startsWith("/")) return url;
  // Strip leading ../ or ./ segments and ensure a leading slash
  const clean = url.replace(/^(\.\.\/|\.\/)+/, "");
  return "/" + clean;
}

function initAllUpdatesFeed(feedEl) {
  fetch("/journey/all_updates_index.json")
    .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(index => renderAllUpdatesFeed(feedEl, index))
    .catch(() => {
      feedEl.innerHTML = '<p class="pilot-data-notice">No updates available yet.</p>';
    });
}

function renderAllUpdatesFeed(feedEl, index) {
  if (!index.length) {
    feedEl.innerHTML = '<p class="pilot-data-notice">No updates posted yet.</p>';
    return;
  }

  // Populate filter dropdowns
  const pilotSel  = document.getElementById("feed-filter-pilot");
  const typeSel   = document.getElementById("feed-filter-type");
  const strandSel = document.getElementById("feed-filter-strand");

  const pilots  = [...new Set(index.map(e => e.pilot_name).filter(Boolean))].sort();
  const types   = [...new Set(index.map(e => e.type).filter(Boolean))].sort();
  const strands = [...new Set(index.map(e => e.work_strand).filter(Boolean))].sort();

  pilots.forEach(v  => { const o = document.createElement("option"); o.value = v; o.textContent = v; pilotSel?.appendChild(o); });
  types.forEach(v   => { const o = document.createElement("option"); o.value = v; o.textContent = v; typeSel?.appendChild(o); });
  strands.forEach(v => { const o = document.createElement("option"); o.value = v; o.textContent = v; strandSel?.appendChild(o); });

  // Filter state
  let activePilot = "", activeType = "", activeStrand = "";

  function applyFeedFilters() {
    feedEl.querySelectorAll(".pilot-update-card").forEach(card => {
      const show = (!activePilot  || card.dataset.pilot  === activePilot)
                && (!activeType   || card.dataset.type   === activeType)
                && (!activeStrand || card.dataset.strand === activeStrand);
      card.style.display = show ? "" : "none";
    });
  }

  pilotSel?.addEventListener("change",  () => { activePilot  = pilotSel.value;  applyFeedFilters(); });
  typeSel?.addEventListener("change",   () => { activeType   = typeSel.value;   applyFeedFilters(); });
  strandSel?.addEventListener("change", () => { activeStrand = strandSel.value; applyFeedFilters(); });

  // Render cards
  index.forEach(entry => {
    const card = document.createElement("a");
    card.className = "pilot-update-card";
    card.href = pilotPageAbsPath(entry.pilot_page_url) + "#update=" + entry.slug;
    card.addEventListener("click", e => {
      e.preventDefault();
      const base = pilotPageAbsPath(entry.pilot_page_url);
      openUpdateModal(entry, base);
    });
    card.dataset.pilot  = entry.pilot_name  || "";
    card.dataset.type   = entry.type        || "";
    card.dataset.strand = entry.work_strand || "";

    const meta = document.createElement("div");
    meta.className = "update-card-meta";

    // Pilot name chip
    if (entry.pilot_name) {
      const chip = document.createElement("span");
      chip.className = "pilot-name-chip";
      chip.textContent = entry.pilot_name;
      meta.appendChild(chip);
    }

    // Type badge
    if (entry.type) {
      const badge = document.createElement("span");
      const typeClass = "update-type-" + (entry.type.toLowerCase().replace(/\s+/g, "-") || "general");
      badge.className = "update-type-badge " + typeClass;
      badge.textContent = entry.type;
      meta.appendChild(badge);
    }

    const dateSpan = document.createElement("span");
    dateSpan.className = "update-date";
    dateSpan.textContent = formatDate(entry.date);
    meta.appendChild(dateSpan);

    card.appendChild(meta);

    const title = document.createElement("h4");
    title.className = "update-title";
    title.textContent = entry.title || entry.slug;
    card.appendChild(title);

    if (entry.authors?.length) {
      const authors = document.createElement("p");
      authors.className = "update-authors";
      authors.textContent = entry.authors.map(a => a.name || String(a)).join(", ");
      card.appendChild(authors);
    }

    if (entry.summary) {
      const summary = document.createElement("p");
      summary.className = "update-summary";
      summary.textContent = entry.summary;
      card.appendChild(summary);
    }

    feedEl.appendChild(card);
  });
}

// ---------------------------------------------------------------------------
// Pilot directory mode (journey home page)
// ---------------------------------------------------------------------------

const ROUND_COLORS = {
  "round1": { border: "#1565c0", bg: "#e3f2fd", text: "#0d47a1" },
  "round2": { border: "#2e7d32", bg: "#e8f5e9", text: "#1b5e20" },
  "round3": { border: "#e65100", bg: "#fff3e0", text: "#bf360c" }
};

function initPilotDirectory(dirEl) {
  fetch("/journey/all_pilots.json")
    .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(pilots => renderPilotDirectory(dirEl, pilots))
    .catch(() => {
      dirEl.innerHTML = '<p class="pilot-data-notice">Pilot directory not yet aggregated — check back shortly.</p>';
    });
}

function renderPilotDirectory(dirEl, pilots) {
  if (!pilots.length) {
    dirEl.innerHTML = '<p class="pilot-data-notice">No pilots onboarded yet.</p>';
    return;
  }

  const rounds = ["round1", "round2", "round3"];

  rounds.forEach(roundKey => {
    const roundPilots = pilots.filter(p => p.round === roundKey);
    if (!roundPilots.length) return;

    const colors = ROUND_COLORS[roundKey] || ROUND_COLORS["round1"];
    const roundNum = roundKey.replace("round", "");

    const heading = document.createElement("h3");
    heading.style.color = colors.border;
    heading.textContent = "Round " + roundNum;
    dirEl.appendChild(heading);

    const container = document.createElement("div");
    container.className = "pilot-cards-container";

    roundPilots.forEach(p => {
      const card = document.createElement("div");
      card.className = "pilot-card";
      card.style.borderLeftColor = colors.border;

      const title = document.createElement("h4");
      if (p.pilot_page_url) {
        const a = document.createElement("a");
        a.href = p.pilot_page_url;
        a.textContent = p.name || p.short_name || "Pilot";
        a.style.color = colors.border;
        title.appendChild(a);
      } else {
        title.textContent = p.name || p.short_name || "Pilot";
        title.style.color = colors.border;
      }
      card.appendChild(title);

      const meta = document.createElement("div");
      meta.className = "pilot-meta";

      if (p.work_strand) {
        const ws = document.createElement("span");
        ws.className = "pilot-detail-badge";
        ws.style.background = "#e8eaf6";
        ws.style.color = "#283593";
        ws.style.fontSize = "0.6rem";
        ws.style.fontWeight = "600";
        ws.style.padding = "0.1rem 0.4rem";
        ws.style.borderRadius = "8px";
        ws.style.marginRight = "0.4rem";
        ws.textContent = p.work_strand;
        meta.appendChild(ws);
      }

      if (p.status) {
        const statusBadge = document.createElement("span");
        statusBadge.className = "pilot-status-badge";
        const color = PHASE_COLORS[p.status] || "#78909c";
        statusBadge.style.background = color;
        statusBadge.textContent = p.status;
        meta.appendChild(statusBadge);
      }

      if (meta.childNodes.length) card.appendChild(meta);

      if (p.description) {
        const desc = document.createElement("p");
        desc.className = "pilot-desc";
        const text = p.description;
        desc.textContent = text.length > 200 ? text.slice(0, 200) + "…" : text;
        card.appendChild(desc);
      }

      if (p.locations?.length) {
        const locs = document.createElement("div");
        locs.className = "pilot-meta";
        locs.style.marginTop = "0.4rem";
        locs.textContent = p.locations
          .map(l => [countryFlag(l.country_code), l.city].filter(Boolean).join(" "))
          .join(" · ");
        card.appendChild(locs);
      }

      container.appendChild(card);
    });

    dirEl.appendChild(container);
  });
}

// ---------------------------------------------------------------------------
// Field hydration
// ---------------------------------------------------------------------------

const PHASE_COLORS = {
  "Selected":              "#78909c",
  "Onboarding":            "#f9a825",
  "EXPLORE":               "#f9a825",
  "VALIDATE":              "#424242",
  "DEFINE":                "#1976d2",
  "IMPLEMENT":             "#388e3c",
  "Contribution":          "#0097a7",
  "Legacy & Replication":  "#5d4037"
};

function hydratePilotFields(pilot) {
  document.querySelectorAll("[data-pilot-field]").forEach(el => {
    const key = el.dataset.pilotField;
    const val = pilot[key];

    if (key === "name") {
      if (val) {
        el.textContent = val;
        document.title = val + " — LDT4SSC Knowledge Hub";
        const headerTopic = document.querySelector("[data-md-component='header-topic'] .md-ellipsis");
        if (headerTopic) headerTopic.textContent = val;
      }
      return;
    }

    if (key === "contact") {
      const name = val?.name || "";
      if (name) {
        el.textContent = name;
      } else {
        el.closest(".pilot-info-item")?.style.setProperty("display", "none");
      }
      return;
    }

    if (key === "round") {
      el.textContent = val ? "Round " + val.replace(/\D/g, "") : "";
      return;
    }

    if (key === "status") {
      if (val) {
        el.textContent = val;
        const color = PHASE_COLORS[val];
        if (color) el.style.setProperty("background", color);
      }
      return;
    }

    if (val) {
      el.textContent = val;
    } else {
      el.closest(".pilot-info-item")?.style.setProperty("display", "none");
    }
  });

  document.querySelectorAll("[data-pilot-list]").forEach(el => {
    const key = el.dataset.pilotList;
    const items = pilot[key];
    if (!Array.isArray(items) || !items.length) {
      el.closest(".pilot-info-item")?.style.setProperty("display", "none");
      return;
    }
    el.textContent = "";

    if (key === "locations") {
      el.textContent = items
        .map(l => [countryFlag(l.country_code), l.city].filter(Boolean).join(" "))
        .join(", ");

    } else if (key === "consortium") {
      el.textContent = items
        .map(c => c.name + (c.role ? ` (${c.role})` : ""))
        .join(", ");

    } else if (key === "focus_areas") {
      items.forEach(fa => {
        const chip = document.createElement("span");
        chip.className = "pilot-focus-chip";
        chip.textContent = fa;
        el.appendChild(chip);
      });

    } else if (key === "external_links") {
      items.forEach(link => {
        const a = document.createElement("a");
        a.href = link.url;
        a.textContent = link.label || link.url;
        a.target = "_blank";
        a.rel = "noopener";
        el.appendChild(a);
        el.appendChild(document.createTextNode(" "));
      });
    }
  });
}

function countryFlag(code) {
  if (!code || code.length !== 2) return "";
  const base = 0x1F1E6 - 65;
  return String.fromCodePoint(base + code.toUpperCase().charCodeAt(0),
                               base + code.toUpperCase().charCodeAt(1));
}

// ---------------------------------------------------------------------------
// Phase stepper
// ---------------------------------------------------------------------------

const PHASE_ORDER = ["Onboarding", "EXPLORE", "VALIDATE", "DEFINE", "IMPLEMENT", "Contribution", "Legacy & Replication"];

function hydratePhaseStepper(status) {
  const activeIdx = PHASE_ORDER.findIndex(
    p => p.toLowerCase() === (status || "").toLowerCase()
  );
  document.querySelectorAll(".pilot-phase-step[data-phase]").forEach(el => {
    const idx = PHASE_ORDER.indexOf(el.dataset.phase);
    el.classList.toggle("completed", activeIdx >= 0 && idx < activeIdx);
    el.classList.toggle("active",    idx === activeIdx);
  });
}

// ---------------------------------------------------------------------------
// Updates feed
// ---------------------------------------------------------------------------

const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function formatDate(iso) {
  if (!iso) return "";
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return iso;
  const mon = MONTH_NAMES[parseInt(m[2], 10) - 1] || "";
  return `${parseInt(m[3], 10)} ${mon} ${m[1]}`;
}

let activeTag = null;

function applyTagFilter() {
  document.querySelectorAll(".pilot-update-card").forEach(card => {
    const tags = JSON.parse(card.dataset.tags || "[]");
    card.style.display = (!activeTag || tags.includes(activeTag)) ? "" : "none";
  });
  document.querySelectorAll(".update-tag-chip").forEach(chip => {
    chip.classList.toggle("active", chip.dataset.tag === activeTag);
  });
}

function renderTagBar(index) {
  const bar = document.getElementById("pilot-updates-filter-bar");
  if (!bar) return;

  const allTags = [...new Set(index.flatMap(e => e.tags || []))].sort();
  if (!allTags.length) return;

  bar.hidden = false;
  bar.textContent = "";

  const label = document.createElement("span");
  label.className = "filter-bar-label";
  label.textContent = "Filter:";
  bar.appendChild(label);

  allTags.forEach(tag => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "update-tag-chip";
    chip.dataset.tag = tag;
    chip.textContent = tag;
    chip.addEventListener("click", () => {
      activeTag = (activeTag === tag) ? null : tag;
      applyTagFilter();
    });
    bar.appendChild(chip);
  });
}

function renderUpdatesFeed(feedEl, index, base) {
  if (!index.length) {
    feedEl.innerHTML = '<p class="pilot-data-notice">No updates posted yet.</p>';
    return;
  }

  renderTagBar(index);

  index.forEach(entry => {
    const btn = document.createElement("button");
    btn.className = "pilot-update-card";
    btn.dataset.slug = entry.slug;
    btn.dataset.tags = JSON.stringify(entry.tags || []);
    btn.type = "button";

    const meta = document.createElement("div");
    meta.className = "update-card-meta";

    if (entry.type) {
      const badge = document.createElement("span");
      const typeClass = "update-type-" + (entry.type.toLowerCase().replace(/\s+/g, "-") || "general");
      badge.className = "update-type-badge " + typeClass;
      badge.textContent = entry.type;
      meta.appendChild(badge);
    }

    const dateSpan = document.createElement("span");
    dateSpan.className = "update-date";
    dateSpan.textContent = formatDate(entry.date);
    meta.appendChild(dateSpan);

    btn.appendChild(meta);

    const title = document.createElement("h4");
    title.className = "update-title";
    title.textContent = entry.title || entry.slug;
    btn.appendChild(title);

    if (entry.authors?.length) {
      const authors = document.createElement("p");
      authors.className = "update-authors";
      authors.textContent = entry.authors.map(a => a.name || String(a)).join(", ");
      btn.appendChild(authors);
    }

    if (entry.summary) {
      const summary = document.createElement("p");
      summary.className = "update-summary";
      summary.textContent = entry.summary;
      btn.appendChild(summary);
    }

    if (entry.tags?.length) {
      const tagRow = document.createElement("div");
      tagRow.className = "update-tag-row";
      entry.tags.forEach(tag => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "update-tag-chip";
        chip.dataset.tag = tag;
        chip.textContent = tag;
        chip.addEventListener("click", e => {
          e.stopPropagation();
          activeTag = (activeTag === tag) ? null : tag;
          applyTagFilter();
        });
        tagRow.appendChild(chip);
      });
      btn.appendChild(tagRow);
    }

    btn.addEventListener("click", () => openUpdateModal(entry, base));
    feedEl.appendChild(btn);
  });
}

// ---------------------------------------------------------------------------
// Modal
// ---------------------------------------------------------------------------

async function openUpdateModal(entry, base) {
  let raw;
  try {
    const resp = await fetch(base + "updates/" + entry.slug + ".md");
    if (!resp.ok) throw new Error(resp.status);
    raw = await resp.text();
  } catch {
    return;
  }

  const body = raw.replace(/^---[\s\S]*?\n---\n?/, "");

  const modal = document.getElementById("pilot-update-modal");
  if (!modal) return;

  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";

  const panel = document.createElement("div");
  panel.className = "modal-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "true");

  const closeBtn = document.createElement("button");
  closeBtn.className = "modal-close";
  closeBtn.setAttribute("aria-label", "Close");
  closeBtn.textContent = "×";

  // Header with meta from index
  const header = document.createElement("div");
  header.className = "modal-header";

  if (entry.type) {
    const typeBadge = document.createElement("span");
    const typeClass = "update-type-" + (entry.type.toLowerCase().replace(/\s+/g, "-") || "general");
    typeBadge.className = "update-type-badge " + typeClass;
    typeBadge.textContent = entry.type;
    header.appendChild(typeBadge);
    header.appendChild(document.createTextNode(" "));
  }

  const dateSpan = document.createElement("span");
  dateSpan.className = "modal-date";
  dateSpan.textContent = formatDate(entry.date);
  header.appendChild(dateSpan);

  const titleEl = document.createElement("h3");
  titleEl.className = "modal-title";
  titleEl.textContent = entry.title || entry.slug;
  header.appendChild(titleEl);

  if (entry.authors?.length) {
    const authorsEl = document.createElement("p");
    authorsEl.className = "modal-authors";
    authorsEl.textContent = entry.authors.map(a => a.name || String(a)).join(", ");
    header.appendChild(authorsEl);
  }

  const bodyDiv = document.createElement("div");
  bodyDiv.className = "modal-body";
  bodyDiv.innerHTML = marked.parse(body);

  panel.appendChild(closeBtn);
  panel.appendChild(header);
  panel.appendChild(bodyDiv);

  modal.innerHTML = "";
  modal.appendChild(backdrop);
  modal.appendChild(panel);
  modal.removeAttribute("hidden");

  history.replaceState(null, "", "#update=" + entry.slug);

  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);
}

function closeModal() {
  const modal = document.getElementById("pilot-update-modal");
  if (!modal) return;
  modal.setAttribute("hidden", "");
  modal.innerHTML = "";
  history.replaceState(null, "", window.location.pathname);
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});
