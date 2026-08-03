document.addEventListener('DOMContentLoaded', () => {
  // Dados de Itens do Catálogo (do data/items.data.js)
  const allItems = window.WIKI_ITEMS || [];
  
  // Elementos do DOM
  const totalCatalogCountEl = document.getElementById('total-catalog-count');
  const totalCountEl = document.getElementById('total-count');
  const filteredCountEl = document.getElementById('filtered-count');
  const searchInput = document.getElementById('search-input');
  const slotSelect = document.getElementById('slot-select');
  const armorSelect = document.getElementById('armor-select');
  const sourceSelect = document.getElementById('source-select');
  const ilvlRange = document.getElementById('ilvl-range');
  const ilvlVal = document.getElementById('ilvl-val');
  const sortSelect = document.getElementById('sort-select');
  const btnResetFilters = document.getElementById('btn-reset-filters');
  const btnGridView = document.getElementById('btn-grid-view');
  const btnTableView = document.getElementById('btn-table-view');
  const itemsGridContainer = document.getElementById('items-grid-container');
  const itemsTableContainer = document.getElementById('items-table-container');
  const itemsTableBody = document.getElementById('items-table-body');
  const paginationContainer = document.getElementById('pagination-container');
  const itemModal = document.getElementById('item-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const modalTooltipWrapper = document.getElementById('modal-tooltip-wrapper');
  const btnCopyDiscord = document.getElementById('btn-copy-discord');
  const btnOpenPlanner = document.getElementById('btn-open-planner');
  const floatingTooltip = document.getElementById('floating-tooltip');
  const toastContainer = document.getElementById('toast-container');
  const ecosystemTrigger = document.getElementById('ecosystemTrigger');
  const ecosystemMenu = document.getElementById('ecosystemMenu');

  // Toggle do Menu do Ecossistema A Guilda
  if (ecosystemTrigger && ecosystemMenu) {
    ecosystemTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      ecosystemMenu.classList.toggle('hidden');
    });
    document.addEventListener('click', () => {
      ecosystemMenu.classList.add('hidden');
    });
  }

  // Mapeamento Oficial de Armas para Variantes de Imagens (.jpg)
  const ITEM_WEAPON_VARIANTS = {
    worn_sword: 'sword_a', eastbrook_arming_sword: 'sword_b', ironedge_longsword: 'sword_b',
    thorium_warblade: 'adv_sword_1handed', gravecaller_blade: 'sword_c', emberfang_warblade: 'sword_c',
    redbrook_blade: 'sword_d', crossroads_saber: 'sword_d', mistcallers_edge: 'sword_e',
    zealotsbane_blade: 'sword_e', hoarfrost_edge: 'sword_e', veilsteel_blade: 'sword_b',
    kingsbane_last_oath: 'sword_f', valeborn_spellblade: 'sword_g', maldrecs_soulbinder: 'sword_g',
    highwatch_warblade: 'adv_sword_1handed', eastbrook_greatsword: 'adv_sword_2handed',
    highwatch_greatsword: 'adv_sword_2handed', verlans_oathblade: 'adv_sword_2handed',
    moonscale_saber: 'adv_sword_2handed', wyrmfang_greatblade: 'adv_sword_2handed_color',
    deathless_greatblade: 'adv_sword_2handed_color', final_argument_greatblade: 'adv_sword_2handed_color',
    bonewrought_greatsword: 'adv_sword_2handed_color', direfang_greatblade: 'adv_sword_2handed_color',
    wildheart_tuskblade: 'adv_sword_2handed_color', greatfang_of_the_basin: 'adv_sword_2handed_color',
    rusty_dagger: 'dagger_a', vale_carving_knife: 'dagger_a', mirefen_skinner: 'dagger_a',
    ironvein_pickblade: 'dagger_a', caravan_warden_dirk: 'dagger_a', icevein_dirk: 'dagger_b',
    keen_dirk: 'dagger_b', whetted_iron_dirk: 'dagger_b', mistbinder_kris: 'dagger_b',
    mirejaw_biteblade: 'dagger_b', cultist_flayer: 'dagger_b', tideglass_dirk: 'dagger_b',
    duskfang_dirk: 'dagger_b', moggers_shiv: 'dagger_c', widowfang_dirk: 'dagger_c',
    nhalias_dirgeblade: 'dagger_c', riptide_dirk: 'dagger_c', gutripper_shiv: 'dagger_c',
    fang_of_korzul: 'dagger_c', gravewardens_shiv: 'adv_dagger', drownedmoon_kris: 'adv_dagger',
    sloomtooth_tidefang: 'adv_dagger', skullsplitter_dirk: 'adv_dagger', first_blood_razor: 'adv_dagger',
    mirejaw_fang_knife: 'dagger_a', drowned_choir_fang: 'dagger_c', mistcallers_fang: 'adv_dagger',
    wildheart_fangknife: 'adv_dagger', voidsong_dirk: 'adv_dagger', gnarled_staff: 'staff_a',
    hickory_shortstaff: 'staff_a', fenreed_staff: 'staff_a', craghorn_staff: 'staff_b',
    apprentice_staff: 'staff_b', staff_of_drowned_prayers: 'staff_b', gravecaller_staff: 'staff_c',
    mirejaw_oracle_staff: 'staff_c', hollow_vigil_staff: 'staff_c', emberwood_staff: 'staff_d',
    ironvein_lantern_staff: 'staff_d', elderwood_battle_staff: 'staff_d', staff_of_velkhar: 'staff_d',
    vaels_mist_staff: 'adv_staff', ogre_bonecharm_staff: 'adv_staff', briarroot_staff: 'staff_b',
    cragthorn_greatstaff: 'staff_c', nightfangs_greatstaff: 'adv_staff', gleamwood_stave: 'staff_b',
    staff_of_the_gravewyrm: 'adv_druid_staff', deathless_heartwood: 'adv_druid_staff', drovers_staff: 'adv_druid_staff',
    emberglass_warstaff: 'adv_staff', lunar_tide_greatstaff: 'adv_staff', wildheart_hexwood_staff: 'adv_druid_staff',
    drowned_tide_scepter: 'wand_a', drownedmoon_scepter: 'wand_b', palecoil_rod: 'adv_wand',
    corpse_candle_focus: 'wand_a', nhalias_litany_rod: 'wand_b', stormcallers_focus: 'wand_b',
    scepter_of_the_deathless_court: 'adv_wand', training_mace: 'hammer_a', bronzework_mace: 'hammer_a',
    copper_flanged_mace: 'hammer_a', moggers_copper_cudgel: 'hammer_b', crag_warden_cudgel: 'hammer_b',
    voss_sanctified_mace: 'hammer_c', bogiron_mace: 'hammer_c', bristleback_maul: 'hammer_d',
    brutoks_maul: 'hammer_d', drownedmoon_maul: 'hammer_d', nhalias_bell_maul: 'hammer_d',
    ironshod_maul: 'hammer_d', fenshadow_maul: 'hammer_d', gravewyrm_thornmaul: 'hammer_d',
    maul_of_the_scourged_wilds: 'hammer_d', wildsoul_maul: 'hammer_d', rusty_hatchet: 'axe_a',
    copper_bearded_axe: 'axe_a', drogmars_skullcleaver: 'axe_b', deacons_cleaver: 'axe_c',
    gorraks_cruel_chopper: 'axe_d', arcanite_war_axe: 'axe_d', gorraks_cleaver: 'adv_axe_1handed',
    tradesman_hatchet: 'adv_axe_1handed', gravewyrm_cleaver: 'adv_axe_1handed', pitlords_cleaver: 'adv_axe_1handed',
    tunnelkings_spade: 'adv_axe_2handed', fen_reaver_glaive: 'scythe', tidereaver_gaff: 'spear_a',
    ironbark_boar_spear: 'spear_a', fanglords_beastspear: 'spear_a'
  };

  // Função de Resolução da Imagem do Item
  function getItemIconUrl(item) {
    if (!item) return 'assets/ui/items/worn_sword.webp';

    let cleanId = item.id;
    if (item.isHeroic && cleanId.startsWith('heroic_')) {
      cleanId = cleanId.replace('heroic_', '');
    }
    cleanId = cleanId.replace(/^(mythic|riftforged|timeworn|masterwork|corrupted|ancient|radiant)_/, '');
    cleanId = cleanId.replace(/_\d+$/, '');

    if (ITEM_WEAPON_VARIANTS[cleanId]) {
      return `assets/ui/weapons/${ITEM_WEAPON_VARIANTS[cleanId]}.jpg`;
    }
    if (ITEM_WEAPON_VARIANTS[item.id]) {
      return `assets/ui/weapons/${ITEM_WEAPON_VARIANTS[item.id]}.jpg`;
    }

    return `assets/ui/items/${cleanId}.webp`;
  }

  // Estado da Aplicação
  const state = {
    searchQuery: '',
    selectedQualities: new Set(),
    selectedClasses: new Set(),
    selectedSlot: 'all',
    selectedArmor: 'all',
    selectedSource: 'all',
    minILvl: 1,
    sortBy: 'ilvl-desc',
    viewMode: 'grid', // 'grid' | 'table'
    currentPage: 1,
    pageSize: 60,
    activeSelectedItem: null
  };

  // Inicialização de Contadores
  if (totalCatalogCountEl) totalCatalogCountEl.textContent = allItems.length.toLocaleString('pt-BR');
  if (totalCountEl) totalCountEl.textContent = allItems.length.toLocaleString('pt-BR');

  // Ícones de Slot / Categoria para Fallback
  const slotIcons = {
    head: '🪖', helmet: '🪖', neck: '📿', shoulder: '🛡️', back: '🧥',
    chest: '🥋', wrist: '⌚', hands: '🥊', gloves: '🥊', waist: '🎗️',
    legs: '👖', feet: '🥾', ring: '💍', trinket: '🔮', mainhand: '⚔️',
    offhand: '🛡️', twohand: '🗡️', onehand: '⚔️', ranged: '🏹',
    held_offhand: '📜', bag: '🎒', none: '📦'
  };

  const qualityNames = {
    common: 'Comum', uncommon: 'Incomum', rare: 'Raro',
    epic: 'Épico', legendary: 'Lendário', artifact: 'Artefato'
  };

  const slotNames = {
    head: 'Cabeça', helmet: 'Cabeça', neck: 'Pescoço', shoulder: 'Ombro',
    back: 'Costas', chest: 'Peitoral', wrist: 'Pulso', hands: 'Mãos',
    gloves: 'Mãos', waist: 'Cintura', legs: 'Pernas', feet: 'Pés',
    ring: 'Anel', trinket: 'Trinket', mainhand: 'Mão Principal',
    offhand: 'Mão Secundária', twohand: 'Duas Mãos', onehand: 'Uma Mão',
    ranged: 'À Distância', held_offhand: 'Offhand Caster', bag: 'Bolsa',
    none: 'Outros / Consumíveis'
  };

  const armorNames = {
    cloth: 'Tecido', leather: 'Couro', mail: 'Malha', plate: 'Placa',
    shield: 'Escudo', weapon: 'Arma', none: 'Diversos'
  };

  // --- Event Listeners ---
  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.toLowerCase().trim();
    state.currentPage = 1;
    applyFilters();
  });

  slotSelect.addEventListener('change', (e) => {
    state.selectedSlot = e.target.value;
    state.currentPage = 1;
    applyFilters();
  });

  armorSelect.addEventListener('change', (e) => {
    state.selectedArmor = e.target.value;
    state.currentPage = 1;
    applyFilters();
  });

  sourceSelect.addEventListener('change', (e) => {
    state.selectedSource = e.target.value;
    state.currentPage = 1;
    applyFilters();
  });

  ilvlRange.addEventListener('input', (e) => {
    state.minILvl = parseInt(e.target.value, 10);
    ilvlVal.textContent = state.minILvl > 1 ? `iLvl ${state.minILvl}+` : 'Todos';
    state.currentPage = 1;
    applyFilters();
  });

  sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    state.currentPage = 1;
    applyFilters();
  });

  // Pills de Raridade
  document.querySelectorAll('#quality-pills .pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.dataset.quality;
      if (state.selectedQualities.has(q)) {
        state.selectedQualities.delete(q);
        btn.classList.remove('active');
      } else {
        state.selectedQualities.add(q);
        btn.classList.add('active');
      }
      state.currentPage = 1;
      applyFilters();
    });
  });

  // Pills de Classe (Estilo Build Planner)
  document.querySelectorAll('#class-pills .pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const c = btn.dataset.class;
      if (c === 'all') {
        state.selectedClasses.clear();
        document.querySelectorAll('#class-pills .pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      } else {
        const allBtn = document.querySelector('#class-pills .pill-btn[data-class="all"]');
        if (allBtn) allBtn.classList.remove('active');

        if (state.selectedClasses.has(c)) {
          state.selectedClasses.delete(c);
          btn.classList.remove('active');
        } else {
          state.selectedClasses.add(c);
          btn.classList.add('active');
        }
        if (state.selectedClasses.size === 0 && allBtn) {
          allBtn.classList.add('active');
        }
      }
      state.currentPage = 1;
      applyFilters();
    });
  });

  // Resetar Filtros
  btnResetFilters.addEventListener('click', () => {
    state.searchQuery = '';
    state.selectedQualities.clear();
    state.selectedClasses.clear();
    state.selectedSlot = 'all';
    state.selectedArmor = 'all';
    state.selectedSource = 'all';
    state.minILvl = 1;
    state.sortBy = 'ilvl-desc';
    state.currentPage = 1;

    searchInput.value = '';
    slotSelect.value = 'all';
    armorSelect.value = 'all';
    sourceSelect.value = 'all';
    ilvlRange.value = 1;
    ilvlVal.textContent = 'Todos';
    sortSelect.value = 'ilvl-desc';

    document.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
    const allClassBtn = document.querySelector('#class-pills .pill-btn[data-class="all"]');
    if (allClassBtn) allClassBtn.classList.add('active');
    applyFilters();
  });

  // Alternar Modos de Exibição
  btnGridView.addEventListener('click', () => {
    state.viewMode = 'grid';
    btnGridView.classList.add('active');
    btnTableView.classList.remove('active');
    itemsGridContainer.style.display = 'grid';
    itemsTableContainer.style.display = 'none';
    renderCurrentPage();
  });

  btnTableView.addEventListener('click', () => {
    state.viewMode = 'table';
    btnTableView.classList.add('active');
    btnGridView.classList.remove('active');
    itemsGridContainer.style.display = 'none';
    itemsTableContainer.style.display = 'block';
    renderCurrentPage();
  });

  // Fechar Modal
  btnCloseModal.addEventListener('click', closeModal);
  itemModal.addEventListener('click', (e) => {
    if (e.target === itemModal) closeModal();
  });

  // Copiar Link Discord
  btnCopyDiscord.addEventListener('click', () => {
    if (!state.activeSelectedItem) return;
    const item = state.activeSelectedItem;
    const qName = qualityNames[item.quality] || item.quality;
    const discordText = `**[${item.name}]** *(iLvl ${item.itemLevel} ${qName} - World of Claudecraft)*\n🔗 https://claudecraft-build-planner.pages.dev?item=${encodeURIComponent(item.id)}`;
    
    navigator.clipboard.writeText(discordText).then(() => {
      showToast(`Link de **${item.name}** copiado para o Discord!`);
    }).catch(() => {
      showToast('Falha ao copiar link.', 'error');
    });
  });

  // --- Função Principal de Filtragem ---
  let filteredItems = [];

  function applyFilters() {
    filteredItems = allItems.filter(item => {
      if (state.searchQuery) {
        const matchesName = item.name && item.name.toLowerCase().includes(state.searchQuery);
        const matchesId = item.id && item.id.toLowerCase().includes(state.searchQuery);
        if (!matchesName && !matchesId) return false;
      }

      if (state.selectedQualities.size > 0) {
        if (!state.selectedQualities.has(item.quality)) return false;
      }

      if (state.selectedSlot !== 'all') {
        const s = state.selectedSlot;
        const itemSlot = item.slot || 'none';
        if (s === 'helmet' || s === 'head') {
          if (itemSlot !== 'helmet' && itemSlot !== 'head') return false;
        } else if (s === 'gloves' || s === 'hands') {
          if (itemSlot !== 'gloves' && itemSlot !== 'hands') return false;
        } else if (s === 'feet' || s === 'boots') {
          if (itemSlot !== 'feet' && itemSlot !== 'boots') return false;
        } else {
          if (itemSlot !== s) return false;
        }
      }

      if (state.selectedArmor !== 'all') {
        if (state.selectedArmor === 'weapon') {
          if (item.kind !== 'weapon') return false;
        } else {
          if (item.armorType !== state.selectedArmor) return false;
        }
      }

      if (state.selectedSource !== 'all') {
        const src = (item.source || '').toLowerCase();
        if (state.selectedSource === 'heroic' && !item.isHeroic && !src.includes('heroic')) return false;
        if (state.selectedSource === 'dungeon' && !src.includes('dungeon')) return false;
        if (state.selectedSource === 'raid' && !src.includes('raid')) return false;
        if (state.selectedSource === 'delve' && !src.includes('delve')) return false;
        if (state.selectedSource === 'rift' && !src.includes('rift')) return false;
        if (state.selectedSource === 'zone' && !src.includes('zone')) return false;
        if (state.selectedSource === 'craft' && !src.includes('profession') && !src.includes('crafting')) return false;
        if (state.selectedSource === 'pvp' && !src.includes('pvp') && !src.includes('coliseum')) return false;
      }

      if (item.itemLevel < state.minILvl) return false;

      if (state.selectedClasses.size > 0) {
        if (item.requiredClass && item.requiredClass.length > 0) {
          const match = item.requiredClass.some(c => state.selectedClasses.has(c));
          if (!match) return false;
        }
      }

      return true;
    });

    filteredItems.sort((a, b) => {
      if (state.sortBy === 'ilvl-desc') return b.itemLevel - a.itemLevel;
      if (state.sortBy === 'ilvl-asc') return a.itemLevel - b.itemLevel;
      if (state.sortBy === 'quality-desc') {
        const qRank = { artifact: 6, legendary: 5, epic: 4, rare: 3, uncommon: 2, common: 1 };
        return (qRank[b.quality] || 0) - (qRank[a.quality] || 0);
      }
      if (state.sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (state.sortBy === 'req-desc') return b.reqLevel - a.reqLevel;
      return 0;
    });

    if (filteredCountEl) filteredCountEl.textContent = filteredItems.length.toLocaleString('pt-BR');
    renderCurrentPage();
  }

  // --- Renderização ---
  function renderCurrentPage() {
    const totalPages = Math.ceil(filteredItems.length / state.pageSize) || 1;
    if (state.currentPage > totalPages) state.currentPage = totalPages;

    const startIdx = (state.currentPage - 1) * state.pageSize;
    const pageItems = filteredItems.slice(startIdx, startIdx + state.pageSize);

    if (state.viewMode === 'grid') {
      renderGrid(pageItems);
    } else {
      renderTable(pageItems);
    }

    renderPagination(totalPages);
  }

  // Render Grid Cards com Imagem
  function renderGrid(items) {
    itemsGridContainer.innerHTML = '';
    if (items.length === 0) {
      itemsGridContainer.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--wurm-muted); padding: 3rem;" class="font-mono text-xs">Nenhum item encontrado com os filtros selecionados.</div>';
      return;
    }

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'item-card';
      card.dataset.quality = item.quality || 'common';

      const imgUrl = getItemIconUrl(item);
      const fallbackEmoji = slotIcons[item.slot] || '📦';
      const heroicBadge = item.isHeroic ? '<span class="heroic-tag">HEROIC</span>' : '';
      
      let statsPreview = [];
      if (item.stats) {
        if (item.stats.str) statsPreview.push(`+${item.stats.str} Força`);
        if (item.stats.agi) statsPreview.push(`+${item.stats.agi} Agilidade`);
        if (item.stats.int) statsPreview.push(`+${item.stats.int} Intelecto`);
        if (item.stats.sta) statsPreview.push(`+${item.stats.sta} Stamina`);
        if (item.stats.armor) statsPreview.push(`${item.stats.armor} Armadura`);
      }
      if (item.hitRating) statsPreview.push(`+${item.hitRating} Hit`);
      if (item.critRating) statsPreview.push(`+${item.critRating} Crit`);
      if (item.hasteRating) statsPreview.push(`+${item.hasteRating} Haste`);
      if (item.spellPower) statsPreview.push(`+${item.spellPower} Poder Mágico`);

      const statsHtml = statsPreview.slice(0, 3).map(s => `<span class="stat-pill font-mono">${s}</span>`).join('');

      card.innerHTML = `
        <div class="item-card-top">
          <div class="item-icon-box">
            <img src="${imgUrl}" class="item-card-img" alt="${item.name}" onerror="this.onerror=null; this.parentElement.innerHTML='<span style=\\'font-size:1.2rem;\\'>${fallbackEmoji}</span>';">
            ${heroicBadge}
          </div>
          <div class="item-info">
            <div class="item-name">${item.name}</div>
            <div class="item-subtext font-mono">
              <span class="item-ilvl">iLvl ${item.itemLevel}</span> • 
              <span>${slotNames[item.slot] || item.slot}</span>
            </div>
          </div>
        </div>
        <div class="item-stats-preview">${statsHtml}</div>
        <div class="item-card-footer font-mono">
          <span>${item.source || 'Overworld'}</span>
          <div class="item-actions">
            <button class="btn-action-sm btn-inspect">Ver Item</button>
          </div>
        </div>
      `;

      card.addEventListener('click', () => openModal(item));
      card.addEventListener('mouseenter', (e) => showFloatingTooltip(item, e));
      card.addEventListener('mousemove', (e) => moveFloatingTooltip(e));
      card.addEventListener('mouseleave', hideFloatingTooltip);

      itemsGridContainer.appendChild(card);
    });
  }

  // Render Table Rows com Imagem
  function renderTable(items) {
    itemsTableBody.innerHTML = '';
    if (items.length === 0) {
      itemsTableBody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: var(--wurm-muted); padding: 2rem;" class="font-mono text-xs">Nenhum item encontrado.</td></tr>';
      return;
    }

    items.forEach(item => {
      const tr = document.createElement('tr');
      const qColor = `var(--quality-${item.quality || 'common'})`;
      const imgUrl = getItemIconUrl(item);

      tr.innerHTML = `
        <td style="font-weight: 700; color: ${qColor}; display: flex; align-items: center; gap: 0.6rem;">
          <img src="${imgUrl}" class="table-icon-img" alt="${item.name}" onerror="this.style.display='none';">
          <span>${item.name}</span> ${item.isHeroic ? '<span class="heroic-tag">HEROIC</span>' : ''}
        </td>
        <td style="color: var(--wurm-accent); font-weight: 600;" class="font-mono">iLvl ${item.itemLevel}</td>
        <td class="font-mono">${qualityNames[item.quality] || item.quality}</td>
        <td>${slotNames[item.slot] || item.slot}</td>
        <td>${armorNames[item.armorType] || item.armorType}</td>
        <td style="color: var(--wurm-muted); font-size: 0.8rem;" class="font-mono">${item.source || 'World Drop'}</td>
        <td>
          <button class="btn-action-sm font-mono">Abrir</button>
        </td>
      `;

      tr.addEventListener('click', () => openModal(item));
      tr.addEventListener('mouseenter', (e) => showFloatingTooltip(item, e));
      tr.addEventListener('mousemove', (e) => moveFloatingTooltip(e));
      tr.addEventListener('mouseleave', hideFloatingTooltip);

      itemsTableBody.appendChild(tr);
    });
  }

  // Paginação Estilo Build Planner
  function renderPagination(totalPages) {
    paginationContainer.innerHTML = '';
    if (totalPages <= 1) return;

    const btnPrev = document.createElement('button');
    btnPrev.className = 'page-btn font-mono';
    btnPrev.textContent = '«';
    btnPrev.disabled = state.currentPage === 1;
    btnPrev.addEventListener('click', () => {
      state.currentPage--;
      renderCurrentPage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    paginationContainer.appendChild(btnPrev);

    let pagesToDisplay = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pagesToDisplay.push(i);
    } else {
      if (state.currentPage <= 4) {
        pagesToDisplay = [1, 2, 3, 4, 5, '...', totalPages];
      } else if (state.currentPage >= totalPages - 3) {
        pagesToDisplay = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pagesToDisplay = [1, '...', state.currentPage - 1, state.currentPage, state.currentPage + 1, '...', totalPages];
      }
    }

    pagesToDisplay.forEach(p => {
      if (p === '...') {
        const dots = document.createElement('span');
        dots.style.color = 'var(--wurm-muted)';
        dots.style.padding = '0 0.25rem';
        dots.className = 'font-mono text-xs';
        dots.textContent = '...';
        paginationContainer.appendChild(dots);
      } else {
        const btnPage = document.createElement('button');
        btnPage.className = `page-btn font-mono ${p === state.currentPage ? 'active' : ''}`;
        btnPage.textContent = p;
        btnPage.addEventListener('click', () => {
          state.currentPage = p;
          renderCurrentPage();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        paginationContainer.appendChild(btnPage);
      }
    });

    const btnNext = document.createElement('button');
    btnNext.className = 'page-btn font-mono';
    btnNext.textContent = '»';
    btnNext.disabled = state.currentPage === totalPages;
    btnNext.addEventListener('click', () => {
      state.currentPage++;
      renderCurrentPage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    paginationContainer.appendChild(btnNext);
  }

  // --- Gerador do Tooltip World of Claudecraft ---
  function buildWocTooltipHtml(item) {
    const qName = qualityNames[item.quality] || 'Comum';
    const sName = slotNames[item.slot] || item.slot;
    const aName = armorNames[item.armorType] || '';
    const imgUrl = getItemIconUrl(item);
    const fallbackEmoji = slotIcons[item.slot] || '📦';
    
    let statsRows = [];
    if (item.stats) {
      if (item.stats.armor) statsRows.push(`<div class="woc-tooltip-stat">${item.stats.armor} Armadura</div>`);
      if (item.stats.str) statsRows.push(`<div class="woc-tooltip-stat">+${item.stats.str} Força</div>`);
      if (item.stats.agi) statsRows.push(`<div class="woc-tooltip-stat">+${item.stats.agi} Agilidade</div>`);
      if (item.stats.sta) statsRows.push(`<div class="woc-tooltip-stat">+${item.stats.sta} Vigor (Stamina)</div>`);
      if (item.stats.int) statsRows.push(`<div class="woc-tooltip-stat">+${item.stats.int} Intelecto</div>`);
      if (item.stats.spi) statsRows.push(`<div class="woc-tooltip-stat">+${item.stats.spi} Espírito</div>`);
    }

    if (item.hitRating) statsRows.push(`<div class="woc-tooltip-green">Equipar: Aumenta seu Hit Rating em +${item.hitRating}.</div>`);
    if (item.critRating) statsRows.push(`<div class="woc-tooltip-green">Equipar: Aumenta seu Acerto Crítico em +${item.critRating}.</div>`);
    if (item.hasteRating) statsRows.push(`<div class="woc-tooltip-green">Equipar: Aumenta sua Aceleração (Haste) em +${item.hasteRating}.</div>`);
    if (item.spellPower) statsRows.push(`<div class="woc-tooltip-green">Equipar: Aumenta o Poder de Magia em +${item.spellPower}.</div>`);
    if (item.attackPower) statsRows.push(`<div class="woc-tooltip-green">Equipar: Aumenta o Poder de Ataque em +${item.attackPower}.</div>`);

    let weaponRow = '';
    if (item.weapon) {
      weaponRow = `
        <div class="woc-tooltip-row font-mono">
          <span>${item.weapon.min} - ${item.weapon.max} Dano</span>
          <span>Velocidade ${item.weapon.speed}s</span>
        </div>
        <div class="woc-tooltip-stat font-mono">(${item.weapon.dps} dano por segundo)</div>
      `;
    }

    let classLockHtml = '';
    if (item.requiredClass && item.requiredClass.length > 0) {
      const formattedClasses = item.requiredClass.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ');
      classLockHtml = `<div class="woc-tooltip-stat font-mono" style="color: #e56767;">Classes: ${formattedClasses}</div>`;
    }

    let setHtml = '';
    if (item.set) {
      setHtml = `<div class="woc-tooltip-green font-mono" style="margin-top: 0.4rem;">Conjunto: ${item.set}</div>`;
    }

    const copper = item.sellValue || 0;
    const g = Math.floor(copper / 10000);
    const s = Math.floor((copper % 10000) / 100);
    const c = copper % 100;
    let moneyHtml = '';
    if (g > 0) moneyHtml += `<span class="money-g font-mono">${g}g</span> `;
    if (s > 0 || g > 0) moneyHtml += `<span class="money-s font-mono">${s}s</span> `;
    moneyHtml += `<span class="money-c font-mono">${c}c</span>`;

    return `
      <div class="woc-tooltip" data-quality="${item.quality || 'common'}">
        <div class="woc-tooltip-header">
          <img src="${imgUrl}" class="woc-tooltip-icon-img" alt="${item.name}" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'woc-tooltip-icon-img\\' style=\\'display:flex;align-items:center;justify-content:center;font-size:1.5rem;\\'>${fallbackEmoji}</div>';">
          <div class="woc-tooltip-title-block">
            <div class="woc-tooltip-name">${item.name} ${item.isHeroic ? '[HEROIC]' : ''}</div>
            <div class="woc-tooltip-ilvl font-mono">Item Level ${item.itemLevel}</div>
          </div>
        </div>
        <div class="woc-tooltip-row">
          <span>${sName}</span>
          <span>${aName}</span>
        </div>
        ${weaponRow}
        <div style="margin: 0.4rem 0;">
          ${statsRows.join('')}
        </div>
        ${classLockHtml}
        ${setHtml}
        <div class="woc-tooltip-stat font-mono" style="margin-top: 0.4rem;">Requer Nível ${item.reqLevel || 1}</div>
        <div class="woc-tooltip-flavor">"Drop de ${item.source || 'World Drop'}"</div>
        <div class="woc-tooltip-sell font-mono">
          Preço de Venda: ${moneyHtml}
        </div>
      </div>
    `;
  }

  function openModal(item) {
    state.activeSelectedItem = item;
    modalTooltipWrapper.innerHTML = buildWocTooltipHtml(item);
    btnOpenPlanner.href = `https://claudecraft-build-planner.pages.dev?item=${encodeURIComponent(item.id)}&slot=${encodeURIComponent(item.slot)}`;
    itemModal.classList.add('open');
  }

  function closeModal() {
    itemModal.classList.remove('open');
    state.activeSelectedItem = null;
  }

  function showFloatingTooltip(item, e) {
    floatingTooltip.innerHTML = buildWocTooltipHtml(item);
    floatingTooltip.style.display = 'block';
    moveFloatingTooltip(e);
  }

  function moveFloatingTooltip(e) {
    const offset = 15;
    let x = e.clientX + offset;
    let y = e.clientY + offset;

    if (x + 400 > window.innerWidth) x = e.clientX - 410;
    if (y + 350 > window.innerHeight) y = e.clientY - 350;

    floatingTooltip.style.left = `${x}px`;
    floatingTooltip.style.top = `${y}px`;
  }

  function hideFloatingTooltip() {
    floatingTooltip.style.display = 'none';
  }

  function showToast(msg, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast font-mono';
    toast.innerHTML = `
      <svg width="18" height="18" fill="none" stroke="${type === 'error' ? '#ef4444' : '#d4b483'}" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      <span>${msg}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  applyFilters();
});
