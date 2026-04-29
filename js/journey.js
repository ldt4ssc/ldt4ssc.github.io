// docs/js/journey.js

document.addEventListener("DOMContentLoaded", () => {
  // Only run on pages that have journey elements
  const timelineTabs = document.getElementById("timeline-tabs");
  if (!timelineTabs) return;

  // ---- Data source configuration ----
  const BASE_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT9r0KcIhKLggTKbkD4HJM5zmCXYoVlTIhhriJw9RvlHdAGdZW7Sf6tq0w6wq9UBbVbNSnhMHn5Uf7e/pub";
  const PILOTS_CSV_URL = BASE_CSV_URL + "?gid=0&single=true&output=csv";
  const DELIVERABLES_CSV_URL = BASE_CSV_URL + "?gid=1738906418&single=true&output=csv";

  // ---- Constants ----
  const COHORT_START = {
    1: { year: 2026, month: 4 },  // May 2026 (0-indexed)
    2: { year: 2026, month: 7 },  // August 2026
    3: { year: 2026, month: 10 }  // November 2026
  };

  const STATUS_STYLES = {
    "Not started":  { cls: "not-started",  label: "Not Started" },
    "In progress":  { cls: "in-progress",  label: "In Progress" },
    "Submitted":    { cls: "submitted",    label: "Submitted" },
    "Under review": { cls: "submitted",    label: "Under Review" },
    "Approved":     { cls: "approved",     label: "Approved" }
  };

  const PHASE_COLORS = {
    "Selected":   "#78909c",
    "Onboarding": "#f9a825",
    "EXPLORE":    "#f9a825",
    "VALIDATE":   "#424242",
    "DEFINE":     "#1976d2",
    "IMPLEMENT":  "#388e3c",
    "Sharing":    "#0097a7",
    "Handover":   "#5d4037"
  };

  const COHORT_COLORS = {
    "C1": { bg: "#e3f2fd", text: "#0d47a1", border: "#1565c0" },
    "C2": { bg: "#e8f5e9", text: "#1b5e20", border: "#2e7d32" },
    "C3": { bg: "#fff3e0", text: "#e65100", border: "#e65100" }
  };

  let allPilots = [];
  let allDeliverables = [];
  let activeCohort = "template";

  // ---- CSV Fetching ----
  function fetchCsv(url) {
    return fetch(url)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      })
      .then(csvText => {
        const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
        return parsed.data;
      });
  }

  function mapPilotRow(row) {
    return {
      id: (row["Pilot ID"] || "").trim(),
      name: (row["Name"] || "").trim(),
      cohort: (row["Cohort"] || "").trim(),
      workStrand: (row["Work Strand"] || "").trim(),
      composition: (row["Composition"] || "").split(",").map(s => s.trim()).filter(Boolean),
      pilotLead: (row["Pilot Lead"] || "").trim(),
      municipalities: (row["Municipalities"] || "").split(",").map(s => s.trim()).filter(Boolean),
      thirdPartyPartners: (row["Third-party partners"] || "").split(",").map(s => s.trim()).filter(Boolean),
      startDate: (row["Start Date"] || "").trim(),
      description: (row["Description"] || "").trim(),
      useCases: (row["Use-Cases"] || "").split(",").map(s => s.trim()).filter(Boolean),
      status: (row["Status"] || "").trim(),
      pageUrl: (row["Page URL"] || "").trim(),
      kh: (row["KH?"] || "").trim()
    };
  }

  function mapDeliverableRow(row) {
    const pd = (row["Deliverable"] || "").trim();
    const sub = (row["Sub-deliverable"] || "").trim();
    return {
      pilotId: (row["Pilot ID"] || "").trim(),
      deliverable: pd,
      subDeliverable: sub,
      fullId: sub ? `${pd}.${sub}` : pd,
      title: (row["Title"] || "").trim(),
      dueDate: (row["Due Date"] || "").trim(),
      status: (row["Status"] || "").trim(),
      submissionDate: (row["Submission Date"] || "").trim()
    };
  }

  // ---- Rendering: Pilot Cards ----
  function renderPilotCards() {
    const container = document.getElementById("pilot-cards");
    if (!container) return;

    const pilots = allPilots.filter(p => p.kh === "Y" && p.name);
    if (!pilots.length) {
      container.innerHTML = `
        <div style="text-align: center; color: #999; padding: 2rem; font-size: 0.85rem;">
          No pilots available yet. Round 1 begins in May 2026.
        </div>`;
      return;
    }

    const cohorts = ["C1", "C2", "C3"];
    let html = "";

    cohorts.forEach(cohort => {
      const cohortPilots = pilots.filter(p => p.cohort === cohort);
      if (!cohortPilots.length) return;

      const colors = COHORT_COLORS[cohort] || COHORT_COLORS["C1"];
      html += `<h4 style="color: ${colors.border}; margin-top: 1.5rem;">Round ${cohort.slice(1)}</h4>`;
      html += `<div class="pilot-cards-container">`;

      cohortPilots.forEach(p => {
        const phaseColor = PHASE_COLORS[p.status] || "#999";
        const cities = p.municipalities.join(", ") || "—";
        const link = p.pageUrl
          ? `<a href="${escapeHtml(p.pageUrl)}">View details &rarr;</a>`
          : "";

        html += `
          <div class="pilot-card" style="border-left-color: ${colors.border};">
            <h4>${escapeHtml(p.name)}</h4>
            <div class="pilot-meta">
              <strong>${escapeHtml(p.workStrand)}</strong> &middot; ${escapeHtml(cities)}
            </div>
            <div class="pilot-desc">${escapeHtml(p.description)}</div>
            <span class="pilot-status-badge" style="background: ${phaseColor};">${escapeHtml(p.status)}</span>
            <br>${link}
          </div>`;
      });

      html += `</div>`;
    });

    container.innerHTML = html;
  }

  // ---- Rendering: Deliverable Tracker ----
  function renderDeliverableTracker() {
    const tbody = document.getElementById("deliverable-tracker-body");
    if (!tbody) return;

    const pilots = allPilots.filter(p => p.kh === "Y" && p.name);
    if (!pilots.length) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; color: #999; padding: 1.5rem; font-size: 0.8rem;">
            Pilot data will appear here once Round 1 begins in May 2026.
          </td>
        </tr>`;
      return;
    }

    const deliverableMap = {};
    allDeliverables.forEach(d => {
      if (!deliverableMap[d.pilotId]) deliverableMap[d.pilotId] = {};
      deliverableMap[d.pilotId][d.fullId] = d;
    });

    let html = "";
    pilots.forEach(p => {
      const pds = deliverableMap[p.id] || {};
      html += `<tr>`;
      html += `<td><strong>${escapeHtml(p.name)}</strong></td>`;
      html += `<td>${escapeHtml(p.cohort)}</td>`;

      const columns = ["PD1", "PD2", "PD3", "PD4", "PD5"];
      columns.forEach(pd => {
        const d = pds[pd] || pds[pd + ".1"];
        html += `<td>${statusBadge(d ? d.status : "")}</td>`;
      });

      const pd2Final = pds["PD2.2"] || null;
      html += `<td>${statusBadge(pd2Final ? pd2Final.status : "")}</td>`;
      html += `</tr>`;
    });

    tbody.innerHTML = html;
  }

  function statusBadge(status) {
    if (!status) return `<span class="status-badge not-started">Not Started</span>`;
    const style = STATUS_STYLES[status] || STATUS_STYLES["Not started"];
    return `<span class="status-badge ${style.cls}">${escapeHtml(style.label)}</span>`;
  }

  // ---- Timeline: Month Headers ----
  // 20 columns: M-2, M-1, M1 … M18
  // Index 0 = M-2, 1 = M-1, 2 = M1, … 19 = M18
  const MONTH_LABELS = ["M-2", "M-1"];
  for (let i = 1; i <= 18; i++) MONTH_LABELS.push(`M${i}`);

  function indexToRelativeMonth(idx) {
    // idx 0 → -2, idx 1 → -1, idx 2 → 1, … idx 19 → 18
    return idx < 2 ? idx - 2 : idx - 1;
  }

  function relativeMonthToIndex(m) {
    // m = -2 → 0, m = -1 → 1, m = 1 → 2, … m = 18 → 19
    return m < 0 ? m + 2 : m + 1;
  }

  function getMonthHeaders() {
    const grid = document.querySelector(".timeline-grid");
    if (!grid) return [];
    const allMonths = grid.querySelectorAll(".timeline-month");
    return Array.from(allMonths).slice(1);
  }

  function getAbsoluteLabel(cohort, relativeMonth) {
    const start = COHORT_START[cohort];
    const offset = relativeMonth > 0 ? relativeMonth - 1 : relativeMonth;
    const totalMonth = start.month + offset;
    const m = ((totalMonth % 12) + 12) % 12; // handle negative months
    const y = start.year + Math.floor(totalMonth / 12);
    return `${String(m + 1).padStart(2, "0")}/${String(y).slice(2)}`;
  }

  function setMonthHeaders(cohort) {
    const headers = getMonthHeaders();
    headers.forEach((el, i) => {
      const relMonth = indexToRelativeMonth(i);
      if (cohort === "template") {
        el.textContent = MONTH_LABELS[i];
      } else {
        el.textContent = getAbsoluteLabel(parseInt(cohort), relMonth);
      }
    });
  }

  // ---- Timeline: Helpers ----

  // Parse DD/MM/YYYY (European) dates
  function parseDate(str) {
    if (!str) return null;
    const m = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (m) return new Date(parseInt(m[3]), parseInt(m[2]) - 1, parseInt(m[1]));
    const d = new Date(str);
    return isNaN(d) ? null : d;
  }

  function getPilotM1(pilot) {
    const d = parseDate(pilot.startDate);
    if (d) return d;
    const cohortNum = parseInt(pilot.cohort.replace("C", ""));
    const cs = COHORT_START[cohortNum];
    if (cs) return new Date(cs.year, cs.month, 1);
    return null;
  }

  function getCurrentMonth(pilot) {
    const start = getPilotM1(pilot);
    if (!start) return null;
    const now = new Date();
    if (now < start) return null;
    const diff = (now.getFullYear() - start.getFullYear()) * 12
               + (now.getMonth() - start.getMonth()) + 1;
    if (diff < 1 || diff > 18) return null;
    return diff;
  }

  function parseDueMonth(dueDate, pilot) {
    if (!dueDate) return null;
    const mMatch = dueDate.match(/M(-?\d+)(?:\s*[-–]\s*M(-?\d+))?/i);
    if (mMatch) return parseInt(mMatch[2] || mMatch[1]);
    const d = parseDate(dueDate);
    const start = getPilotM1(pilot);
    if (d && start) {
      const diff = (d.getFullYear() - start.getFullYear()) * 12
                 + (d.getMonth() - start.getMonth()) + 1;
      if (diff >= -2 && diff <= 18) return diff;
    }
    return null;
  }

  // ---- Timeline: Pilot Rows (grouped by cohort) ----
  function renderTimelinePilotRows(cohortFilter) {
    const grid = document.querySelector(".timeline-grid");
    if (!grid) return;

    // Remove existing pilot rows and cohort headers
    grid.querySelectorAll(".timeline-pilot-label, .timeline-pilot-cell, .timeline-cohort-header").forEach(el => el.remove());

    const pilots = allPilots.filter(p => p.kh === "Y" && p.name);
    if (!pilots.length) return;

    // Build deliverable lookup
    const deliverablesByPilot = {};
    allDeliverables.forEach(d => {
      if (!deliverablesByPilot[d.pilotId]) deliverablesByPilot[d.pilotId] = [];
      deliverablesByPilot[d.pilotId].push(d);
    });

    const cohorts = ["C1", "C2", "C3"];

    cohorts.forEach(cohortKey => {
      const cohortPilots = cohortFilter === "template"
        ? pilots.filter(p => p.cohort === cohortKey)
        : (cohortKey === `C${cohortFilter}` ? pilots.filter(p => p.cohort === cohortKey) : []);

      if (!cohortPilots.length) return;

      const colors = COHORT_COLORS[cohortKey];

      // Cohort separator row
      const separator = document.createElement("div");
      separator.className = "timeline-cohort-header";
      separator.style.borderLeftColor = colors.border;
      separator.style.color = colors.border;
      separator.textContent = `Round ${cohortKey.slice(1)}`;
      grid.appendChild(separator);

      // Pilot rows
      cohortPilots.forEach(p => {
        const currentMonth = getCurrentMonth(p);

        // Map deliverables to grid index positions
        const deliverableAtIdx = {};
        const pilotDels = deliverablesByPilot[p.id] || [];
        pilotDels.forEach(d => {
          const m = parseDueMonth(d.dueDate, p);
          if (m !== null && m >= -2 && m <= 18) {
            const idx = relativeMonthToIndex(m);
            if (!deliverableAtIdx[idx]) deliverableAtIdx[idx] = [];
            deliverableAtIdx[idx].push({
              num: d.deliverable.replace(/^PD/, ""),
              title: d.title || d.fullId
            });
          }
        });

        const nowIdx = currentMonth !== null ? relativeMonthToIndex(currentMonth) : null;

        // Label cell
        const label = document.createElement("div");
        label.className = "timeline-pilot-label";
        if (p.pageUrl) {
          const a = document.createElement("a");
          a.href = p.pageUrl;
          a.textContent = p.name;
          a.style.color = colors.border;
          label.appendChild(a);
        } else {
          label.textContent = p.name;
          label.style.color = colors.border;
        }
        grid.appendChild(label);

        // 20 month cells
        for (let idx = 0; idx < 20; idx++) {
          const cell = document.createElement("div");
          cell.className = "timeline-pilot-cell";

          if (deliverableAtIdx[idx]) {
            deliverableAtIdx[idx].forEach(d => {
              const marker = document.createElement("div");
              marker.className = "timeline-marker pilot-deliverable-marker";
              marker.textContent = d.num;
              marker.setAttribute("data-tooltip", d.title);
              marker.style.borderColor = colors.border;
              marker.style.color = colors.border;
              cell.appendChild(marker);
            });
          }

          if (nowIdx === idx) {
            const nowLine = document.createElement("div");
            nowLine.className = "timeline-now-marker";
            cell.appendChild(nowLine);
          }

          grid.appendChild(cell);
        }
      });
    });
  }

  // ---- Tab click handling ----
  timelineTabs.addEventListener("click", (e) => {
    const tab = e.target.closest(".timeline-tab");
    if (!tab) return;

    timelineTabs.querySelectorAll(".timeline-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    activeCohort = tab.dataset.cohort;
    setMonthHeaders(activeCohort);
    renderTimelinePilotRows(activeCohort);
  });

  // ---- Tooltips (body-appended to escape overflow containers) ----
  let activeTooltip = null;

  function showTooltip(e) {
    const text = e.currentTarget.getAttribute("data-tooltip");
    if (!text) return;
    hideTooltip();
    const tip = document.createElement("div");
    tip.className = "timeline-tooltip";
    tip.textContent = text;
    document.body.appendChild(tip);
    activeTooltip = tip;
    const rect = e.currentTarget.getBoundingClientRect();
    tip.style.top = (rect.top - tip.offsetHeight - 6) + "px";
    let left = rect.left + rect.width / 2 - tip.offsetWidth / 2;
    // Clamp to viewport
    if (left + tip.offsetWidth > window.innerWidth - 4) left = window.innerWidth - tip.offsetWidth - 4;
    if (left < 4) left = 4;
    tip.style.left = left + "px";
  }

  function hideTooltip() {
    if (activeTooltip) {
      activeTooltip.remove();
      activeTooltip = null;
    }
  }

  document.addEventListener("mouseover", (e) => {
    const marker = e.target.closest("[data-tooltip]");
    if (marker && marker.closest(".timeline-grid")) showTooltip({ currentTarget: marker });
  });

  document.addEventListener("mouseout", (e) => {
    const marker = e.target.closest("[data-tooltip]");
    if (marker && marker.closest(".timeline-grid")) hideTooltip();
  });

  // ---- Utilities ----
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // ---- Data Loading ----
  async function loadJourneyData() {
    try {
      console.log("Loading pilot data from Google Sheets...");
      const [pilotsData, deliverablesData] = await Promise.all([
        fetchCsv(PILOTS_CSV_URL),
        fetchCsv(DELIVERABLES_CSV_URL)
      ]);

      allPilots = pilotsData.map(mapPilotRow);
      allDeliverables = deliverablesData.map(mapDeliverableRow);

      console.log(`Loaded ${allPilots.length} pilots, ${allDeliverables.length} deliverables`);

      renderPilotCards();
      renderDeliverableTracker();
      renderTimelinePilotRows(activeCohort);
    } catch (err) {
      console.warn("Failed to load journey data:", err);
    }
  }

  loadJourneyData();
});
