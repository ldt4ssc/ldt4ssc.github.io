// docs/js/resources_poc.js

document.addEventListener("DOMContentLoaded", () => {
  // Only run on pages that actually have the filters/cards
  const cardsContainer = document.getElementById("resource-cards");
  const categoryFilterContainer = document.getElementById("filter-category");
  const resourceCategorySelect = document.getElementById("filter-resource-category");
  const scopeSelect = document.getElementById("filter-scope");
  const searchInput = document.getElementById("filter-search");
  const sortSelect = document.getElementById("sort-by");
  const resultsCount = document.getElementById("results-count");
  const clearFiltersBtn = document.getElementById("clear-filters");

  if (!cardsContainer || !categoryFilterContainer || !resourceCategorySelect || !scopeSelect || !searchInput || !sortSelect) {
    return;
  }

  // Data source configuration
  const GOOGLE_SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTO6rJ2HcNnnLBsvb_N-_Wo3tfvcWp2oGEwvUDPmfROGPk72kMClBq8M_qzXweyM-_MaJ62BITMJp1Z/pub?gid=0&single=true&output=csv";
  const LOCAL_JSON_FALLBACK = "/assets/resources_poc.json";
  const USE_GOOGLE_SHEETS = true; // Toggle between Google Sheets and local JSON

  let allResources = [];
  let selectedMims = new Set(); // Track selected MIM filters
  let selectedLayers = new Set(); // Track selected Layer filters
  let selectedScopes = new Set(); // Track selected Scope filters
  let selectedOrigins = new Set(); // Track selected Origin filters

  // Define the canonical order for layers
  const LAYER_ORDER = [
    "Data sources",
    "Data acquisition",
    "Connectivity",
    "Data management",
    "Analytics",
    "Services",
    "Visualisation"
  ];

  // Thematic area color schemes
  const THEMATIC_AREA_COLORS = {
    "Connectivity": {
      bg: '#ffe4d6',
      border: '#ff6b1a',
      text: '#753800',
      badge: '#ffb088'
    },
    "Analytics": {
      bg: '#fff5d9',
      border: '#e6a800',
      text: '#473821',
      badge: '#ffd870'
    },
    "Data acquisition": {
      bg: '#ebf7dd',
      border: '#5fa83b',
      text: '#11734b',
      badge: '#b8e394'
    },
    "Data sources": {
      bg: '#e3f2fd',
      border: '#1976d2',
      text: '#0a53a8',
      badge: '#90caf9'
    },
    "Visualisation": {
      bg: '#e0eff3',
      border: '#00acc1',
      text: '#215a6c',
      badge: '#80deea'
    },
    "Services": {
      bg: '#ffebe9',
      border: '#e53935',
      text: '#b10202',
      badge: '#ef9a9a'
    },
    "Data management": {
      bg: '#f3e5f5',
      border: '#8e24aa',
      text: '#5a3286',
      badge: '#ce93d8'
    },
    default: {
      bg: '#f5f5f5',
      border: '#9e9e9e',
      text: '#212121',
      badge: '#e0e0e0'
    }
  };

  const GREY_BADGE_STYLE = {
    bg: '#e0e0e0',
    text: '#424242'
  };

  const MIM_COLORS = {
    MIM0: { bg: '#d1589f', text: '#fbe7f1' },
    MIM1: { bg: '#f58122', text: '#facda6' },
    MIM2: { bg: '#facd0f', text: '#fff1d0' },
    MIM3: { bg: '#88b25b', text: '#d7e6ce' },
    MIM4: { bg: '#f3888e', text: '#ffd8d5' },
    MIM5: { bg: '#d398c5', text: '#ead6e6' },
    MIM6: { bg: '#566cb4', text: '#b4bbdd' },
    MIM7: { bg: '#deae7e', text: '#f4e7de' },
    MIM8: { bg: '#c0b3a9', text: '#f5f4f2' }
  };

  const MIM_DESCRIPTIONS = {
    MIM0: 'Accessing data',
    MIM1: 'Interlinking data',
    MIM2: 'Representing data',
    MIM3: 'Exchanging data',
    MIM4: 'Personal data',
    MIM5: 'Interoperable AI',
    MIM6: 'Securing data',
    MIM7: 'Geospatial data',
    MIM8: 'Local Digital Twins'
  };

  // Origin colour map — bg/text for each allowed origin value
  const ORIGIN_COLORS = {
    'LDT4SSC':                 { bg: '#fffde7', text: '#7a5c00' },
    'Data Spaces':             { bg: '#1565c0', text: '#ffffff' },
    'AI for Smart Cities':     { bg: '#6a1b9a', text: '#ffffff' },
    'Local Digital Twins':     { bg: '#2e7d32', text: '#ffffff' },
    'CitiVERSE':               { bg: '#00838f', text: '#ffffff' },
    'Interoperability & MIMs': { bg: '#e65100', text: '#ffffff' },
    'Cities Network':          { bg: '#4e342e', text: '#ffffff' }
  };

  // Helper function: Parse comma-separated MIMs into array
  function parseMims(mimsString) {
    if (!mimsString) return [];
    return mimsString
      .split(',')
      .map(m => m.trim())
      .filter(m => m.match(/^MIM\d$/));
  }

  // Helper function: Parse comma-separated scopes into array
  function parseScopes(scopeString) {
    if (!scopeString) return [];
    return scopeString
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
  }

  // Helper function: Map CSV row to resource object
  function mapCsvRowToResource(row, index) {
    // Combine long name and description for the description field
    const shortName = row["Short name"] || "";
    const longName = row["Long name"] || "";
    const desc = row.Description || "";
    const effectiveLongName = longName && longName.trim() !== shortName.trim() ? longName : "";
    const combinedDescription = effectiveLongName && desc ? `${effectiveLongName}. ${desc}` : effectiveLongName || desc;

    // Extract dynamic links from columns A, B, C, D, E
    const links = [
      { text: row["A Resource"], url: row["A Link"] },
      { text: row["B Resource"], url: row["B Link"] },
      { text: row["C Resource"], url: row["C Link"] },
      { text: row["D Resource"], url: row["D Link"] },
      { text: row["E Resource"], url: row["E Link"] },
    ].filter(link => link.text && link.url); // Only include links with both text and URL

    return {
      id: row.Index || `r${String(index + 1).padStart(3, '0')}`,
      short_name: row["Short name"] || "",
      long_name: row["Long name"] || "",
      maintainer: row.Maintainer || "",
      version: row.Version || "",
      category: row.Category || "",
      thematic_area: row.Layer || "",
      scope: parseScopes(row.Scope),
      origin: row.Origin ? row.Origin.trim() : "",
      mims: parseMims(row.MIMs),
      links: links,
      description: combinedDescription,
      type: "technical", // Default value, not in sheet
      tags: [] // Default value, not in sheet
    };
  }

  // Fetch CSV from Google Sheets
  function fetchGoogleSheetsCsv(url) {
    return fetch(url)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      });
  }

  // Parse CSV data and map to resources
  function parseAndMapCsvData(csvText) {
    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true
    });

    return parsed.data
      .filter(row => row["KH?"] === "Y") // Only include rows where KH? column equals "Y"
      .map((row, index) => mapCsvRowToResource(row, index))
      .filter(r => r.short_name); // Only include rows with a short name
  }

  // Load local JSON fallback
  function loadLocalJson() {
    return fetch(LOCAL_JSON_FALLBACK)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      });
  }

  // Main data loading function with fallback
  async function loadResources() {
    if (USE_GOOGLE_SHEETS) {
      try {
        console.log("Loading resources from Google Sheets:", GOOGLE_SHEETS_CSV_URL);
        const csvData = await fetchGoogleSheetsCsv(GOOGLE_SHEETS_CSV_URL);
        const resources = parseAndMapCsvData(csvData);
        console.log(`Loaded ${resources.length} resources from Google Sheets`);
        return resources;
      } catch (error) {
        console.warn("Failed to load Google Sheets, falling back to local JSON:", error);
        return loadLocalJson();
      }
    } else {
      console.log("Loading resources from local JSON:", LOCAL_JSON_FALLBACK);
      return loadLocalJson();
    }
  }

  console.log("Initializing resources loader...");

  loadResources()
    .then((data) => {
      allResources = Array.isArray(data) ? data : [];
      populateLayerFilters();
      populateResourceCategoryOptions(allResources);
      populateScopeFilters(allResources);
      populateOriginFilters(allResources);
      populateMimFilters();
      renderResources();
    })
    .catch((err) => {
      console.error("Error loading resources:", err);
      cardsContainer.innerHTML = "<p class='error-message'>Unable to load resources. Please try again later.</p>";
    });

  function populateLayerFilters() {
    const layerFilterContainer = document.getElementById("filter-category");
    if (!layerFilterContainer) return;

    // Use the predefined LAYER_ORDER array for consistent ordering
    layerFilterContainer.innerHTML = LAYER_ORDER.map(layer => {
      const colors = THEMATIC_AREA_COLORS[layer] || THEMATIC_AREA_COLORS.default;
      // Use badge color for background, text color for text, border color for border (same as cards)
      return `
        <label class="layer-checkbox-label">
          <input type="checkbox" value="${layer}" data-layer="${layer}">
          <span class="layer-checkbox-badge" style="background-color: ${colors.badge}; color: ${colors.text}; --border-color: ${colors.border};">
            ${layer}
          </span>
        </label>
      `;
    }).join('');

    // Add event listeners to checkboxes
    layerFilterContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', handleLayerFilterChange);
    });
  }

  function populateResourceCategoryOptions(resources) {
    const categories = Array.from(
      new Set(resources.map((r) => r.category).filter(Boolean))
    ).sort();

    resourceCategorySelect.innerHTML = '<option value="">All Categories</option>';
    categories.forEach((cat) => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      resourceCategorySelect.appendChild(opt);
    });
  }

  function populateScopeFilters(resources) {
    const scopeFilterContainer = document.getElementById("filter-scope");
    if (!scopeFilterContainer) return;

    const allScopes = Array.from(
      new Set(resources.flatMap(r => Array.isArray(r.scope) ? r.scope : []).filter(Boolean))
    ).sort();

    scopeFilterContainer.innerHTML = allScopes.map(scope => `
      <label class="scope-checkbox-label">
        <input type="checkbox" value="${scope}" data-scope="${scope}">
        <span class="scope-checkbox-badge">${scope}</span>
      </label>
    `).join('');

    scopeFilterContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', handleScopeFilterChange);
    });
  }

  function handleScopeFilterChange(event) {
    const scope = event.target.value;
    if (event.target.checked) {
      selectedScopes.add(scope);
    } else {
      selectedScopes.delete(scope);
    }

    const scopeFilterContainer = document.getElementById("filter-scope");
    if (scopeFilterContainer) {
      if (selectedScopes.size > 0) {
        scopeFilterContainer.classList.add('has-selection');
      } else {
        scopeFilterContainer.classList.remove('has-selection');
      }
    }

    renderResources();
  }

  function populateOriginFilters(resources) {
    const originFilterContainer = document.getElementById("filter-origin");
    if (!originFilterContainer) return;

    const allOrigins = Array.from(
      new Set(resources.map(r => r.origin).filter(Boolean))
    ).sort();

    originFilterContainer.innerHTML = allOrigins.map(origin => {
      const colors = ORIGIN_COLORS[origin] || { bg: '#9e9e9e', text: '#ffffff' };
      return `
        <label class="origin-checkbox-label">
          <input type="checkbox" value="${origin}" data-origin="${origin}">
          <span class="origin-checkbox-badge${origin === 'LDT4SSC' ? ' origin-badge--ldt4ssc' : ''}" style="background-color: ${colors.bg}; color: ${colors.text};"${origin === 'LDT4SSC' ? ' title="Within-project resource"' : ''}>${origin}</span>
        </label>
      `;
    }).join('');

    originFilterContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', handleOriginFilterChange);
    });
  }

  function handleOriginFilterChange(event) {
    const origin = event.target.value;
    if (event.target.checked) {
      selectedOrigins.add(origin);
    } else {
      selectedOrigins.delete(origin);
    }

    const originFilterContainer = document.getElementById("filter-origin");
    if (originFilterContainer) {
      if (selectedOrigins.size > 0) {
        originFilterContainer.classList.add('has-selection');
      } else {
        originFilterContainer.classList.remove('has-selection');
      }
    }

    renderResources();
  }

  function populateMimFilters() {
    const mimFilterContainer = document.getElementById("filter-mims");
    if (!mimFilterContainer) return;

    const allMims = ["MIM0", "MIM1", "MIM2", "MIM3", "MIM4", "MIM5", "MIM6", "MIM7", "MIM8"];

    mimFilterContainer.innerHTML = allMims.map(mim => {
      const colors = MIM_COLORS[mim];
      const description = MIM_DESCRIPTIONS[mim] || '';
      return `
        <label class="mim-checkbox-label mim-tooltip-wrapper">
          <input type="checkbox" value="${mim}" data-mim="${mim}">
          <span class="mim-checkbox-badge" style="background-color: ${colors.bg}; color: ${colors.text};">${mim}</span>
          <div class="mim-tooltip">${mim}: ${description}</div>
        </label>
      `;
    }).join('');

    // Add event listeners to checkboxes
    mimFilterContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', handleMimFilterChange);
    });
  }

  function handleMimFilterChange(event) {
    const mim = event.target.value;
    if (event.target.checked) {
      selectedMims.add(mim);
    } else {
      selectedMims.delete(mim);
    }

    // Update has-selection class based on whether any MIMs are selected
    const mimFilterContainer = document.getElementById("filter-mims");
    if (mimFilterContainer) {
      if (selectedMims.size > 0) {
        mimFilterContainer.classList.add('has-selection');
      } else {
        mimFilterContainer.classList.remove('has-selection');
      }
    }

    renderResources();
  }

  function handleLayerFilterChange(event) {
    const layer = event.target.value;
    if (event.target.checked) {
      selectedLayers.add(layer);
    } else {
      selectedLayers.delete(layer);
    }

    // Update has-selection class based on whether any layers are selected
    const layerFilterContainer = document.getElementById("filter-category");
    if (layerFilterContainer) {
      if (selectedLayers.size > 0) {
        layerFilterContainer.classList.add('has-selection');
      } else {
        layerFilterContainer.classList.remove('has-selection');
      }
    }

    renderResources();
  }

  function renderResources() {
    const resourceCategoryFilter = resourceCategorySelect.value;
    const searchTerm = searchInput.value.toLowerCase().trim();
    const sortBy = sortSelect.value;

    let filtered = allResources.filter((r) => {
      // Filter by selected Layers (OR logic - show if resource matches ANY selected layer)
      if (selectedLayers.size > 0) {
        if (!selectedLayers.has(r.thematic_area)) return false;
      }
      if (resourceCategoryFilter && r.category !== resourceCategoryFilter) return false;
      if (selectedScopes.size > 0) {
        const resourceScopes = Array.isArray(r.scope) ? r.scope : [];
        if (!resourceScopes.some(s => selectedScopes.has(s))) return false;
      }
      if (selectedOrigins.size > 0 && !selectedOrigins.has(r.origin)) return false;

      // Filter by selected MIMs (OR logic - show if resource has ANY selected MIM)
      if (selectedMims.size > 0) {
        const resourceMims = Array.isArray(r.mims) ? r.mims : [];
        const hasSelectedMim = resourceMims.some(mim => selectedMims.has(mim));
        if (!hasSelectedMim) return false;
      }

      if (searchTerm) {
        const haystack = (
          (r.title || "") +
          " " +
          (r.description || "") +
          " " +
          (r.tags || []).join(" ")
        ).toLowerCase();
        if (!haystack.includes(searchTerm)) return false;
      }

      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      if (sortBy === "title") {
        return (a.title || "").localeCompare(b.title || "");
      } else if (sortBy === "mim") {
        // Sort by MIM levels (MIM0-MIM8)
        const getMimOrder = (mims) => {
          if (!Array.isArray(mims) || mims.length === 0) return 99;
          const numbers = mims.map(m => parseInt(m.replace('MIM', '')) || 99);
          return Math.min(...numbers);
        };
        return getMimOrder(a.mims) - getMimOrder(b.mims);
      } else if (sortBy === "thematic-area") {
        return (a.thematic_area || "").localeCompare(b.thematic_area || "");
      }
      return 0;
    });

    // Update results count
    updateResultsCount(filtered.length, allResources.length);

    if (!filtered.length) {
      cardsContainer.innerHTML = `
        <div class="no-results">
          <svg class="no-results-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <h3>No resources found</h3>
          <p>Try adjusting your filters or search term</p>
        </div>
      `;
      return;
    }

    const cardItems = filtered.map((r) => createCard(r));
    cardsContainer.innerHTML = cardItems.join("");

    // Restore scroll position if a card badge was clicked
    if (window._lastClickedCardTitle) {
      setTimeout(() => {
        // Find the card with the matching title
        const cards = document.querySelectorAll('.resource-card h3');
        for (const titleElement of cards) {
          if (titleElement.textContent.trim() === window._lastClickedCardTitle) {
            const card = titleElement.closest('.resource-card');
            if (card) {
              const rect = card.getBoundingClientRect();
              const scrollTop = window.scrollY + rect.top - 100; // 100px offset from top
              window.scrollTo({
                top: scrollTop,
                behavior: 'smooth'
              });
              break;
            }
          }
        }
        delete window._lastClickedCardTitle;
      }, 50);
    }
  }

  function createCard(resource) {
    const colors = THEMATIC_AREA_COLORS[resource.thematic_area] || THEMATIC_AREA_COLORS.default;

    const tagsHtml = (resource.tags || [])
      .map((t) => `<span class="resource-tag">${escapeHtml(t)}</span>`)
      .join(" ");

    // Generate MIM badges (multiple MIMs possible)
    const mimsArray = Array.isArray(resource.mims) ? resource.mims : [];
    const mimBadgesHtml = mimsArray
      .map((mim) => {
        const mimColors = MIM_COLORS[mim] || { bg: '#cccccc', text: '#333333' };
        const description = MIM_DESCRIPTIONS[mim] || '';
        return `<span class="mim-tooltip-wrapper"><span class="mim-badge clickable" data-mim="${mim}" style="background-color: ${mimColors.bg}; color: ${mimColors.text};" onclick="toggleMimFilter('${mim}', event)"><span class="mim-badge-label">${escapeHtml(mim)}</span></span><div class="mim-tooltip">${mim}: ${description}</div></span>`;
      })
      .join("");

    // Generate category badge (grey)
    const categoryBadge = resource.category
      ? `<span class="grey-badge" style="background-color: ${GREY_BADGE_STYLE.bg}; color: ${GREY_BADGE_STYLE.text};">${escapeHtml(resource.category)}</span>`
      : '';

    // Generate scope badges (clickable, one per scope value)
    const scopeBadgesHtml = Array.isArray(resource.scope) && resource.scope.length > 0
      ? resource.scope.map(s => `<span class="grey-badge clickable" style="background-color: ${GREY_BADGE_STYLE.bg}; color: ${GREY_BADGE_STYLE.text}; cursor: pointer;" onclick="toggleScopeFilter('${escapeHtml(s)}', event)">${escapeHtml(s)}</span>`).join(' ')
      : '';

    // Generate origin badge (clickable, shown only when origin is set)
    const originColors = resource.origin ? (ORIGIN_COLORS[resource.origin] || { bg: '#9e9e9e', text: '#ffffff' }) : null;
    const originBadge = resource.origin
      ? `<span class="origin-badge clickable${resource.origin === 'LDT4SSC' ? ' origin-badge--ldt4ssc' : ''}" style="background-color: ${originColors.bg}; color: ${originColors.text};"${resource.origin === 'LDT4SSC' ? ' title="Within-project resource"' : ''} onclick="toggleOriginFilter('${escapeHtml(resource.origin)}', event)">${escapeHtml(resource.origin)}</span>`
      : '';

    return `
<article class="resource-card" style="background-color: ${colors.bg}; border-left-color: ${colors.border};">
  <div class="card-header">
    <div class="card-header-left">
      <h3 style="color: ${colors.text};">${escapeHtml(resource.short_name || "")}</h3>
      ${originBadge}
    </div>
    <div class="mim-badges-container">
      ${mimBadgesHtml || '<span class="mim-badge" style="background-color: #cccccc; color: #666666;"><span class="mim-badge-label">No MIM</span></span>'}
    </div>
  </div>
  <p class="card-description">${escapeHtml(resource.description || "")}</p>

  <div class="card-content">
    <div class="card-meta">
      <div class="meta-row">
        <span class="meta-label">Layer:</span>
        <span class="category-badge clickable ${selectedLayers.has(resource.thematic_area) ? 'selected' : ''}" style="background-color: ${colors.badge}; color: ${colors.text}; --border-color: ${colors.border}; cursor: pointer;" onclick="toggleLayerFilter('${escapeHtml(resource.thematic_area || "")}', event)">
          ${escapeHtml(resource.thematic_area || "")}
        </span>
      </div>
      ${resource.category ? `
      <div class="meta-row">
        <span class="meta-label">Category:</span>
        ${categoryBadge}
      </div>` : ''}
      ${scopeBadgesHtml ? `
      <div class="meta-row meta-row--scope">
        <span class="meta-label">Scope:</span>
        <div class="scope-badges-stack">${scopeBadgesHtml}</div>
      </div>` : ''}
      ${resource.maintainer ? `
      <div class="meta-row">
        <span class="meta-label">Maintainer:</span>
        <span class="meta-value">${escapeHtml(resource.maintainer)}</span>
      </div>` : ''}
      ${resource.version ? `
      <div class="meta-row">
        <span class="meta-label">Version:</span>
        <span class="meta-value">${escapeHtml(resource.version)}</span>
      </div>` : ''}
    </div>

    ${tagsHtml ? `<div class="card-tags">${tagsHtml}</div>` : ""}
  </div>

  <div class="card-footer">
    <div class="resource-links">
      ${(resource.links || []).length > 0
        ? (resource.links || []).map(link => `
          <a href="${escapeHtml(link.url)}" class="resource-link-button" target="_blank" rel="noopener">
            ${getLinkEmoji(link.text)} ${escapeHtml(link.text)}
          </a>
        `).join("")
        : '<span class="no-links">No links available</span>'
      }
    </div>
  </div>
</article>`;
  }

  function updateResultsCount(filtered, total) {
    if (resultsCount) {
      const activeFilters = [
        selectedLayers.size > 0 ? 'layers' : '',
        resourceCategorySelect.value,
        selectedScopes.size > 0 ? 'scopes' : '',
        selectedOrigins.size > 0 ? 'origins' : '',
        searchInput.value,
        selectedMims.size > 0 ? 'mims' : ''
      ].filter(Boolean).length;

      let countText = `Showing <strong>${filtered}</strong> of <strong>${total}</strong> resources`;
      if (activeFilters > 0) {
        countText += ` <span class="filter-indicator">(${activeFilters} filter${activeFilters > 1 ? 's' : ''} active)</span>`;
      }
      resultsCount.innerHTML = countText;

      // Show/hide clear button
      if (clearFiltersBtn) {
        clearFiltersBtn.style.display = activeFilters > 0 ? 'inline-block' : 'none';
      }
    }
  }

  function clearFilters() {
    selectedLayers.clear();
    resourceCategorySelect.value = "";
    selectedScopes.clear();
    searchInput.value = "";
    sortSelect.value = "title";
    selectedMims.clear();

    // Uncheck all Layer checkboxes and remove has-selection class
    const layerFilterContainer = document.getElementById("filter-category");
    if (layerFilterContainer) {
      layerFilterContainer.classList.remove('has-selection');
    }
    document.querySelectorAll('#filter-category input[type="checkbox"]').forEach(cb => {
      cb.checked = false;
    });

    // Uncheck all MIM checkboxes and remove has-selection class
    const mimFilterContainer = document.getElementById("filter-mims");
    if (mimFilterContainer) {
      mimFilterContainer.classList.remove('has-selection');
    }
    document.querySelectorAll('#filter-mims input[type="checkbox"]').forEach(cb => {
      cb.checked = false;
    });

    // Uncheck all scope checkboxes and remove has-selection class
    const scopeFilterContainer = document.getElementById("filter-scope");
    if (scopeFilterContainer) {
      scopeFilterContainer.classList.remove('has-selection');
    }
    document.querySelectorAll('#filter-scope input[type="checkbox"]').forEach(cb => {
      cb.checked = false;
    });

    // Uncheck all origin checkboxes and remove has-selection class
    selectedOrigins.clear();
    const originFilterContainer = document.getElementById("filter-origin");
    if (originFilterContainer) {
      originFilterContainer.classList.remove('has-selection');
    }
    document.querySelectorAll('#filter-origin input[type="checkbox"]').forEach(cb => {
      cb.checked = false;
    });

    renderResources();
  }

  window.toggleMimFilter = function(mim, event) {
    // Store the clicked card's title to find it later
    if (event) {
      const card = event.target.closest('.resource-card');
      if (card) {
        const title = card.querySelector('h3');
        if (title) {
          window._lastClickedCardTitle = title.textContent.trim();
        }
      }
    }

    const checkbox = document.querySelector(`input[data-mim="${mim}"]`);
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
      checkbox.dispatchEvent(new Event('change'));
    }
  };

  window.toggleLayerFilter = function(layer, event) {
    // Store the clicked card's title to find it later
    if (event) {
      const card = event.target.closest('.resource-card');
      if (card) {
        const title = card.querySelector('h3');
        if (title) {
          window._lastClickedCardTitle = title.textContent.trim();
        }
      }
    }

    const checkbox = document.querySelector(`input[data-layer="${layer}"]`);
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
      checkbox.dispatchEvent(new Event('change'));
    }
  };

  window.toggleScopeFilter = function(scope, event) {
    // Store the clicked card's title to find it later
    if (event) {
      const card = event.target.closest('.resource-card');
      if (card) {
        const title = card.querySelector('h3');
        if (title) {
          window._lastClickedCardTitle = title.textContent.trim();
        }
      }
    }

    const checkbox = document.querySelector(`input[data-scope="${scope}"]`);
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
      checkbox.dispatchEvent(new Event('change'));
    }
  };

  window.toggleOriginFilter = function(origin, event) {
    if (event) {
      const card = event.target.closest('.resource-card');
      if (card) {
        const title = card.querySelector('h3');
        if (title) {
          window._lastClickedCardTitle = title.textContent.trim();
        }
      }
    }

    const checkbox = document.querySelector(`input[data-origin="${origin}"]`);
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
      checkbox.dispatchEvent(new Event('change'));
    }
  };

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Get emoji for link button based on text content
  function getLinkEmoji(text) {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('doc') || lowerText.includes('specification') || lowerText.includes('spec')) return '📄';
    if (lowerText.includes('manual') || lowerText.includes('catalog') || lowerText.includes('director')) return '📖';
    if (lowerText.includes('marketplace') || lowerText.includes('store')) return '🛒';
    if (lowerText.includes('git') || lowerText.includes('source') || lowerText.includes('code') || lowerText.includes('repo')) return '💻';
    if (lowerText.includes('api')) return '🔌';
    if (lowerText.includes('demo') || lowerText.includes('example')) return '🎯';
    if (lowerText.includes('download')) return '⬇️';
    if (lowerText.includes('video') || lowerText.includes('tutorial')) return '🎬';
    if (lowerText.includes('web') || lowerText.includes('site') || lowerText.includes('home')) return '🌐';
    if (lowerText.includes('wiki')) return '🌍';
    if (lowerText.includes('blueprint')) return '🏗️';
    return '🔗'; // Default link emoji
  }

  // Event listeners
  [resourceCategorySelect, sortSelect].forEach((el) => {
    el.addEventListener("change", renderResources);
  });

  searchInput.addEventListener("input", renderResources);

  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", clearFilters);
  }
});