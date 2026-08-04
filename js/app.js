document.addEventListener('DOMContentLoaded', () => {
  // Função segura para obter o array de itens do window.WIKI_ITEMS
  function getAllItems() {
    return window.WIKI_ITEMS || [];
  }
  
  // Elementos do DOM
  const totalCatalogCountEl = document.getElementById('total-catalog-count');
  const totalCountEl = document.getElementById('total-count');
  const filteredCountEl = document.getElementById('filtered-count');
  const searchInput = document.getElementById('search-input');
  const searchClearBtn = document.getElementById('search-clear-btn');
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
  const headerLanguageSelect = document.getElementById('headerLanguageSelect');

  // --- Dicionário de Traduções (Multilíngue: PT, EN, FR, ES) ---
  const TRANSLATIONS = {
    pt: {
      nav_gallery: 'Galeria de Classes',
      nav_builder: 'Build Planner',
      nav_wiki: 'WOC Wiki',
      ecosystem_title: 'Ecossistema A Guilda',
      ecosystem_planner: 'Build Planner (Talentos)',
      ecosystem_wiki: 'WOC Wiki (Banco de Dados)',
      sec_title: '🔥 World of Claudecraft Wiki & Item Database',
      sec_sub: 'Enciclopédia e banco de dados de 4.799+ itens com busca instantânea, atributos, origens e exportador para Discord. Mantido pela comunidade A Guilda.',
      view_cards: '🎴 Cards',
      view_table: '📋 Tabela',
      search_placeholder: 'Buscar por nome ou ID (ex: Barrowlord, Sword, Ring)...',
      sort_ilvl_desc: '⚡ Maior iLvl Primeiro',
      sort_ilvl_asc: '📉 Menor iLvl Primeiro',
      sort_quality_desc: '⭐ Maior Raridade Primeiro',
      sort_name_asc: '🔤 Nome (A-Z)',
      sort_req_desc: '📜 Requisito de Nível',
      btn_reset: '🔄 Limpar Filtros',
      label_class_filter: 'Filtrar por Classe',
      role_all: 'TODAS',
      label_quality: 'Raridade',
      label_slot: 'Slot de Equipamento',
      label_armor: 'Tipo de Item',
      label_source: 'Origem do Drop',
      label_ilvl: 'iLvl Mínimo',
      opt_all_slots: 'Todos os Slots',
      opt_all_types: 'Todos os Tipos',
      opt_all_sources: 'Todas as Origens',
      opt_heroic: 'Dungeons Heroicas',
      opt_dungeon: 'Dungeons Normais',
      opt_raid: 'Raid (Nythraxis)',
      opt_delve: 'Delves',
      opt_rift: 'Rifts Anomaly',
      opt_zone: 'Drop de Mapa / Overworld',
      opt_craft: 'Profissões / Crafting',
      opt_pvp: 'PvP / Ashen Coliseum',
      btn_copy_discord: 'Copiar Link p/ Discord',
      btn_open_planner: 'Abrir no Build Planner',
      footer_text: 'A Wiki Oficial e Banco de Dados de Itens do World of Claudecraft • Mantido por A Guilda.',
      results_showing: 'Exibindo',
      results_of: 'de',
      results_found: 'itens encontrados',
      no_items_found: 'Nenhum item encontrado com os filtros selecionados.',
      all_val: 'Todos',
      inspect_item: 'Ver Item',
      inspect_open: 'Abrir',
      common: 'Comum', uncommon: 'Incomum', rare: 'Raro', epic: 'Épico', legendary: 'Lendário', artifact: 'Artefato',
      head: 'Cabeça', helmet: 'Cabeça', neck: 'Pescoço', shoulder: 'Ombro', back: 'Costas', chest: 'Peitoral', wrist: 'Pulso', hands: 'Mãos', gloves: 'Mãos', waist: 'Cintura', legs: 'Pernas', feet: 'Pés', ring: 'Anel', trinket: 'Trinket', mainhand: 'Mão Principal', offhand: 'Mão Secundária', twohand: 'Duas Mãos', onehand: 'Uma Mão', ranged: 'À Distância', held_offhand: 'Offhand Caster', bag: 'Bolsa', none: 'Outros / Consumíveis',
      cloth: 'Tecido', leather: 'Couro', mail: 'Malha', plate: 'Placa', shield: 'Escudo', weapon: 'Arma',
      equip_effect: 'Equipar:', sell_price: 'Preço de Venda:', req_level: 'Requer Nível', drop_from: 'Drop de', armor_label: 'Armadura', dps_label: 'dano por segundo', speed_label: 'Velocidade', damage_label: 'Dano'
    },
    en: {
      nav_gallery: 'Class Gallery',
      nav_builder: 'Build Planner',
      nav_wiki: 'WOC Wiki',
      ecosystem_title: 'A Guilda Ecosystem',
      ecosystem_planner: 'Build Planner (Talents)',
      ecosystem_wiki: 'WOC Wiki (Database)',
      sec_title: '🔥 World of Claudecraft Wiki & Item Database',
      sec_sub: 'Encyclopedia and database of 4,799+ items with instant search, stats, drop sources, and Discord exporter. Maintained by A Guilda community.',
      view_cards: '🎴 Cards',
      view_table: '📋 Table',
      search_placeholder: 'Search by name or ID (e.g. Barrowlord, Sword, Ring)...',
      sort_ilvl_desc: '⚡ Highest iLvl First',
      sort_ilvl_asc: '📉 Lowest iLvl First',
      sort_quality_desc: '⭐ Highest Quality First',
      sort_name_asc: '🔤 Name (A-Z)',
      sort_req_desc: '📜 Level Requirement',
      btn_reset: '🔄 Reset Filters',
      label_class_filter: 'Filter by Class',
      role_all: 'ALL',
      label_quality: 'Rarity',
      label_slot: 'Equipment Slot',
      label_armor: 'Item Type',
      label_source: 'Drop Source',
      label_ilvl: 'Minimum iLvl',
      opt_all_slots: 'All Slots',
      opt_all_types: 'All Types',
      opt_all_sources: 'All Sources',
      opt_heroic: 'Heroic Dungeons',
      opt_dungeon: 'Normal Dungeons',
      opt_raid: 'Raid (Nythraxis)',
      opt_delve: 'Delves',
      opt_rift: 'Rifts Anomaly',
      opt_zone: 'Zone / Overworld Drop',
      opt_craft: 'Crafting / Professions',
      opt_pvp: 'PvP / Ashen Coliseum',
      btn_copy_discord: 'Copy Discord Link',
      btn_open_planner: 'Open in Build Planner',
      footer_text: 'The Official World of Claudecraft Item Wiki & Database • Maintained by A Guilda.',
      results_showing: 'Showing',
      results_of: 'of',
      results_found: 'items found',
      no_items_found: 'No items found with selected filters.',
      all_val: 'All',
      inspect_item: 'View Item',
      inspect_open: 'Open',
      common: 'Common', uncommon: 'Uncommon', rare: 'Rare', epic: 'Epic', legendary: 'Legendary', artifact: 'Artifact',
      head: 'Head', helmet: 'Head', neck: 'Neck', shoulder: 'Shoulder', back: 'Back', chest: 'Chest', wrist: 'Wrist', hands: 'Hands', gloves: 'Hands', waist: 'Waist', legs: 'Legs', feet: 'Feet', ring: 'Ring', trinket: 'Trinket', mainhand: 'Main Hand', offhand: 'Off Hand', twohand: 'Two-Hand', onehand: 'One-Hand', ranged: 'Ranged', held_offhand: 'Held in Off-Hand', bag: 'Bag', none: 'Consumable / Other',
      cloth: 'Cloth', leather: 'Leather', mail: 'Mail', plate: 'Plate', shield: 'Shield', weapon: 'Weapon',
      equip_effect: 'Equip:', sell_price: 'Sell Price:', req_level: 'Requires Level', drop_from: 'Drop from', armor_label: 'Armor', dps_label: 'damage per second', speed_label: 'Speed', damage_label: 'Damage'
    },
    fr: {
      nav_gallery: 'Galerie de Classes',
      nav_builder: 'Planificateur de Build',
      nav_wiki: 'WOC Wiki',
      ecosystem_title: 'Écosystème A Guilda',
      ecosystem_planner: 'Planificateur (Talents)',
      ecosystem_wiki: 'WOC Wiki (Base de données)',
      sec_title: '🔥 World of Claudecraft Wiki & Base de Données',
      sec_sub: 'Encyclopédie et base de données de 4 799+ objets avec recherche instantanée, caractéristiques, butins et exportateur Discord. Maintenu par A Guilda.',
      view_cards: '🎴 Cartes',
      view_table: '📋 Tableau',
      search_placeholder: 'Rechercher par nom ou ID (ex: Barrowlord, Sword, Ring)...',
      sort_ilvl_desc: '⚡ Plus haut iLvl D\'abord',
      sort_ilvl_asc: '📉 Plus bas iLvl D\'abord',
      sort_quality_desc: '⭐ Meilleure Rareté D\'abord',
      sort_name_asc: '🔤 Nom (A-Z)',
      sort_req_desc: '📜 Niveau Requis',
      btn_reset: '🔄 Réinitialiser Filtres',
      label_class_filter: 'Filtrer par Classe',
      role_all: 'TOUTES',
      label_quality: 'Rareté',
      label_slot: 'Emplacement',
      label_armor: 'Type d\'Objet',
      label_source: 'Source du Butin',
      label_ilvl: 'iLvl Minimum',
      opt_all_slots: 'Tous les Emplacements',
      opt_all_types: 'Tous les Types',
      opt_all_sources: 'Toutes les Sources',
      opt_heroic: 'Donjons Héroïques',
      opt_dungeon: 'Donjons Normaux',
      opt_raid: 'Raid (Nythraxis)',
      opt_delve: 'Gouffres (Delves)',
      opt_rift: 'Anomalie de Faille',
      opt_zone: 'Butin de Zone / Monde',
      opt_craft: 'Métiers / Artisanat',
      opt_pvp: 'JcJ / Colisée d\'Ashen',
      btn_copy_discord: 'Copier Lien Discord',
      btn_open_planner: 'Ouvrir dans Build Planner',
      footer_text: 'La Wiki Officielle & Base de Données d\'Objets World of Claudecraft • Maintenu par A Guilda.',
      results_showing: 'Affichage de',
      results_of: 'sur',
      results_found: 'objets trouvés',
      no_items_found: 'Aucun objet trouvé avec les filtres sélectionnés.',
      all_val: 'Tous',
      inspect_item: 'Voir Objet',
      inspect_open: 'Ouvrir',
      common: 'Commun', uncommon: 'Inhabituel', rare: 'Rare', epic: 'Épique', legendary: 'Légendaire', artifact: 'Artefact',
      head: 'Tête', helmet: 'Tête', neck: 'Cou', shoulder: 'Épaule', back: 'Dos', chest: 'Torse', wrist: 'Poignets', hands: 'Mains', gloves: 'Mains', waist: 'Taille', legs: 'Jambes', feet: 'Pieds', ring: 'Anneau', trinket: 'Bijou', mainhand: 'Main Droite', offhand: 'Main Gauche', twohand: 'Deux Mains', onehand: 'Une Main', ranged: 'À Distance', held_offhand: 'Tenu en Main Gauche', bag: 'Sac', none: 'Consommable / Autre',
      cloth: 'Tissu', leather: 'Cuir', mail: 'Mailles', plate: 'Plaque', shield: 'Escudo', weapon: 'Arme',
      equip_effect: 'Équipé:', sell_price: 'Prix de Vente:', req_level: 'Niveau Requis', drop_from: 'Butin de', armor_label: 'Armure', dps_label: 'dégâts par seconde', speed_label: 'Vitesse', damage_label: 'Dégâts'
    },
    es: {
      nav_gallery: 'Galería de Clases',
      nav_builder: 'Planificador de Builds',
      nav_wiki: 'WOC Wiki',
      ecosystem_title: 'Ecosistema A Guilda',
      ecosystem_planner: 'Planificador (Talentos)',
      ecosystem_wiki: 'WOC Wiki (Base de Datos)',
      sec_title: '🔥 World of Claudecraft Wiki & Base de Datos',
      sec_sub: 'Enciclopedia y base de datos de más de 4.799 objetos con búsqueda instantánea, estadísticas, orígenes de botín y exportador a Discord. Mantenido por A Guilda.',
      view_cards: '🎴 Cartas',
      view_table: '📋 Tabla',
      search_placeholder: 'Buscar por nombre o ID (ej: Barrowlord, Sword, Ring)...',
      sort_ilvl_desc: '⚡ Mayor iLvl Primero',
      sort_ilvl_asc: '📉 Menor iLvl Primero',
      sort_quality_desc: '⭐ Mayor Calidad Primero',
      sort_name_asc: '🔤 Nombre (A-Z)',
      sort_req_desc: '📜 Requisito de Nivel',
      btn_reset: '🔄 Limpiar Filtros',
      label_class_filter: 'Filtrar por Clase',
      role_all: 'TODAS',
      label_quality: 'Rareza',
      label_slot: 'Ranura de Equipo',
      label_armor: 'Tipo de Objeto',
      label_source: 'Origen del Botín',
      label_ilvl: 'iLvl Mínimo',
      opt_all_slots: 'Todas las Ranuras',
      opt_all_types: 'Todos los Tipos',
      opt_all_sources: 'Todos los Orígenes',
      opt_heroic: 'Mazmorras Heroicas',
      opt_dungeon: 'Mazmorras Normales',
      opt_raid: 'Banda (Nythraxis)',
      opt_delve: 'Delves',
      opt_rift: 'Anomalía de Falla',
      opt_zone: 'Botín de Mapa / Mundo',
      opt_craft: 'Profesiones / Artesanía',
      opt_pvp: 'JcJ / Coliseo de Ashen',
      btn_copy_discord: 'Copiar Enlace Discord',
      btn_open_planner: 'Abrir en Build Planner',
      footer_text: 'La Wiki Oficial y Base de Datos de Objetos de World of Claudecraft • Mantenido por A Guilda.',
      results_showing: 'Mostrando',
      results_of: 'de',
      results_found: 'objetos encontrados',
      no_items_found: 'No se encontraron objetos con los filtros seleccionados.',
      all_val: 'Todos',
      inspect_item: 'Ver Objeto',
      inspect_open: 'Abrir',
      common: 'Común', uncommon: 'Poco Común', rare: 'Raro', epic: 'Épico', legendary: 'Legendario', artifact: 'Artefacto',
      head: 'Cabeza', helmet: 'Cabeza', neck: 'Cuello', shoulder: 'Hombro', back: 'Espalda', chest: 'Pecho', wrist: 'Muñeca', hands: 'Manos', gloves: 'Manos', waist: 'Cintura', legs: 'Piernas', feet: 'Pies', ring: 'Anillo', trinket: 'Abalorio', mainhand: 'Mano Principal', offhand: 'Mano Izquierda', twohand: 'Dos Manos', onehand: 'Una Mano', ranged: 'A Distancia', held_offhand: 'Sostener en Mano Izquierda', bag: 'Bolsa', none: 'Consumible / Otro',
      cloth: 'Tela', leather: 'Cuero', mail: 'Malla', plate: 'Placas', shield: 'Escudo', weapon: 'Arma',
      equip_effect: 'Equipar:', sell_price: 'Precio de Venta:', req_level: 'Requiere Nivel', drop_from: 'Botín de', armor_label: 'Armadura', dps_label: 'daño por segundo', speed_label: 'Velocidad', damage_label: 'Daño'
    }
  };

  // Idioma Atual
  let currentLang = localStorage.getItem('woc_lang') || 'pt';
  if (headerLanguageSelect) {
    headerLanguageSelect.value = currentLang;
    headerLanguageSelect.addEventListener('change', (e) => setLanguage(e.target.value));
  }

  function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) lang = 'pt';
    currentLang = lang;
    localStorage.setItem('woc_lang', lang);

    const dict = TRANSLATIONS[lang];

    // Atualizar elementos com data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Atualizar placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (dict[key]) {
        el.placeholder = dict[key];
      }
    });

    applyFilters();
  }

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

  // Tecla ESC para fechar modais ou limpar busca
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (itemModal.classList.contains('open')) {
        closeModal();
      } else if (document.activeElement === searchInput && searchInput.value) {
        searchInput.value = '';
        state.searchQuery = '';
        if (searchClearBtn) searchClearBtn.classList.add('hidden');
        state.currentPage = 1;
        applyFilters();
      }
    }
  });

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

  // Ícones de Slot / Categoria para Fallback
  const slotIcons = {
    head: '🪖', helmet: '🪖', neck: '📿', shoulder: '🛡️', back: '🧥',
    chest: '🥋', wrist: '⌚', hands: '🥊', gloves: '🥊', waist: '🎗️',
    legs: '👖', feet: '🥾', ring: '💍', trinket: '🔮', mainhand: '⚔️',
    offhand: '🛡️', twohand: '🗡️', onehand: '⚔️', ranged: '🏹',
    held_offhand: '📜', bag: '🎒', none: '📦'
  };

  // --- Event Listeners ---
  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.toLowerCase().trim();
    if (searchClearBtn) {
      if (state.searchQuery) {
        searchClearBtn.classList.remove('hidden');
      } else {
        searchClearBtn.classList.add('hidden');
      }
    }
    state.currentPage = 1;
    applyFilters();
  });

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      searchInput.value = '';
      state.searchQuery = '';
      searchClearBtn.classList.add('hidden');
      state.currentPage = 1;
      applyFilters();
    });
  }

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
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.pt;
    ilvlVal.textContent = state.minILvl > 1 ? `iLvl ${state.minILvl}+` : dict.all_val;
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
    if (searchClearBtn) searchClearBtn.classList.add('hidden');
    slotSelect.value = 'all';
    armorSelect.value = 'all';
    sourceSelect.value = 'all';
    ilvlRange.value = 1;
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.pt;
    ilvlVal.textContent = dict.all_val;
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
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.pt;
    const item = state.activeSelectedItem;
    const qName = dict[item.quality] || item.quality;
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
    const allItems = getAllItems();

    // Atualização garantida dos contadores gerais
    if (totalCatalogCountEl) totalCatalogCountEl.textContent = allItems.length.toLocaleString('pt-BR');
    if (totalCountEl) totalCountEl.textContent = allItems.length.toLocaleString('pt-BR');

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
        if (state.selectedSource === 'drakelands' && !src.includes('drakeland') && !src.includes('dragonkin') && !src.includes('brood')) return false;
        if (state.selectedSource === 'gull_mere' && !src.includes('gull') && !src.includes('fishing') && !src.includes('fish')) return false;
        if (state.selectedSource === 'pvp' && !src.includes('pvp') && !src.includes('coliseum')) return false;
      }

      if (item.itemLevel && item.itemLevel < state.minILvl) return false;

      if (state.selectedClasses.size > 0) {
        if (item.requiredClass && item.requiredClass.length > 0) {
          const match = item.requiredClass.some(c => state.selectedClasses.has(c));
          if (!match) return false;
        }
      }

      return true;
    });

    filteredItems.sort((a, b) => {
      if (state.sortBy === 'ilvl-desc') return (b.itemLevel || 0) - (a.itemLevel || 0);
      if (state.sortBy === 'ilvl-asc') return (a.itemLevel || 0) - (b.itemLevel || 0);
      if (state.sortBy === 'quality-desc') {
        const qRank = { artifact: 6, legendary: 5, epic: 4, rare: 3, uncommon: 2, common: 1 };
        return (qRank[b.quality] || 0) - (qRank[a.quality] || 0);
      }
      if (state.sortBy === 'name-asc') return (a.name || '').localeCompare(b.name || '');
      if (state.sortBy === 'req-desc') return (b.reqLevel || 0) - (a.reqLevel || 0);
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

  // Render Grid Cards com Imagem e Fallback
  function renderGrid(items) {
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.pt;
    itemsGridContainer.innerHTML = '';
    if (items.length === 0) {
      itemsGridContainer.innerHTML = `
        <div style="grid-column: 1/-1;" class="flex flex-col items-center justify-center p-12 text-center bg-wurm-panel border border-wurm-border rounded-xl">
          <div class="text-4xl mb-3">🔍</div>
          <div class="text-sm font-semibold text-wurm-accent mb-1">${dict.no_items_found}</div>
          <div class="text-xs text-wurm-muted">Tente ajustar a busca, resetar a raridade ou reduzir o filtro de iLvl.</div>
        </div>
      `;
      return;
    }

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'item-card';
      card.dataset.quality = item.quality || 'common';

      const imgUrl = getItemIconUrl(item);
      const fallbackEmoji = slotIcons[item.slot] || '📦';
      const heroicBadge = item.isHeroic ? '<span class="heroic-tag">HEROIC</span>' : '';
      const translatedSlot = dict[item.slot] || item.slot;
      
      let statsPreview = [];
      if (item.stats) {
        if (item.stats.str) statsPreview.push(`+${item.stats.str} ${currentLang === 'en' ? 'Strength' : currentLang === 'fr' ? 'Force' : currentLang === 'es' ? 'Fuerza' : 'Força'}`);
        if (item.stats.agi) statsPreview.push(`+${item.stats.agi} ${currentLang === 'en' ? 'Agility' : currentLang === 'fr' ? 'Agilité' : currentLang === 'es' ? 'Agilidad' : 'Agilidade'}`);
        if (item.stats.int) statsPreview.push(`+${item.stats.int} ${currentLang === 'en' ? 'Intellect' : currentLang === 'fr' ? 'Intellect' : currentLang === 'es' ? 'Intelecto' : 'Intelecto'}`);
        if (item.stats.sta) statsPreview.push(`+${item.stats.sta} Stamina`);
        if (item.stats.armor) statsPreview.push(`${item.stats.armor} ${dict.armor_label}`);
      }
      if (item.hitRating) statsPreview.push(`+${item.hitRating} Hit`);
      if (item.critRating) statsPreview.push(`+${item.critRating} Crit`);
      if (item.hasteRating) statsPreview.push(`+${item.hasteRating} Haste`);
      if (item.spellPower) statsPreview.push(`+${item.spellPower} Spell Power`);

      const statsHtml = statsPreview.slice(0, 3).map(s => `<span class="stat-pill font-mono">${s}</span>`).join('');

      card.innerHTML = `
        <div class="item-card-top">
          <div class="item-icon-box">
            <img src="${imgUrl}" class="item-card-img" alt="${item.name}" loading="lazy" onerror="this.onerror=null; this.parentElement.innerHTML='<span style=\\'font-size:1.2rem;\\'>${fallbackEmoji}</span>';">
            ${heroicBadge}
          </div>
          <div class="item-info">
            <div class="item-name">${item.name}</div>
            <div class="item-subtext font-mono">
              <span class="item-ilvl">iLvl ${item.itemLevel}</span> • 
              <span>${translatedSlot}</span>
            </div>
          </div>
        </div>
        <div class="item-stats-preview">${statsHtml}</div>
        <div class="item-card-footer font-mono">
          <span>${item.source || 'Overworld'}</span>
          <div class="item-actions">
            <button class="btn-action-sm btn-inspect">${dict.inspect_item}</button>
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
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.pt;
    itemsTableBody.innerHTML = '';
    if (items.length === 0) {
      itemsTableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--wurm-muted); padding: 2rem;" class="font-mono text-xs">${dict.no_items_found}</td></tr>`;
      return;
    }

    items.forEach(item => {
      const tr = document.createElement('tr');
      const qColor = `var(--quality-${item.quality || 'common'})`;
      const imgUrl = getItemIconUrl(item);

      tr.innerHTML = `
        <td style="font-weight: 700; color: ${qColor}; display: flex; align-items: center; gap: 0.6rem;">
          <img src="${imgUrl}" class="table-icon-img" alt="${item.name}" loading="lazy" onerror="this.style.display='none';">
          <span>${item.name}</span> ${item.isHeroic ? '<span class="heroic-tag">HEROIC</span>' : ''}
        </td>
        <td style="color: var(--wurm-accent); font-weight: 600;" class="font-mono">iLvl ${item.itemLevel}</td>
        <td class="font-mono">${dict[item.quality] || item.quality}</td>
        <td>${dict[item.slot] || item.slot}</td>
        <td>${dict[item.armorType] || item.armorType}</td>
        <td style="color: var(--wurm-muted); font-size: 0.8rem;" class="font-mono">${item.source || 'World Drop'}</td>
        <td>
          <button class="btn-action-sm font-mono">${dict.inspect_open}</button>
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
    btnPrev.ariaLabel = 'Página anterior';
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
        btnPage.ariaLabel = `Página ${p}`;
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
    btnNext.ariaLabel = 'Próxima página';
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
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.pt;
    const qName = dict[item.quality] || item.quality;
    const sName = dict[item.slot] || item.slot;
    const aName = dict[item.armorType] || '';
    const imgUrl = getItemIconUrl(item);
    const fallbackEmoji = slotIcons[item.slot] || '📦';
    
    let statsRows = [];
    if (item.stats) {
      if (item.stats.armor) statsRows.push(`<div class="woc-tooltip-stat">${item.stats.armor} ${dict.armor_label}</div>`);
      if (item.stats.str) statsRows.push(`<div class="woc-tooltip-stat">+${item.stats.str} ${currentLang === 'en' ? 'Strength' : currentLang === 'fr' ? 'Force' : currentLang === 'es' ? 'Fuerza' : 'Força'}</div>`);
      if (item.stats.agi) statsRows.push(`<div class="woc-tooltip-stat">+${item.stats.agi} ${currentLang === 'en' ? 'Agility' : currentLang === 'fr' ? 'Agilité' : currentLang === 'es' ? 'Agilidad' : 'Agilidade'}</div>`);
      if (item.stats.sta) statsRows.push(`<div class="woc-tooltip-stat">+${item.stats.sta} ${currentLang === 'en' ? 'Stamina' : currentLang === 'fr' ? 'Endurance' : currentLang === 'es' ? 'Aguante' : 'Vigor (Stamina)'}</div>`);
      if (item.stats.int) statsRows.push(`<div class="woc-tooltip-stat">+${item.stats.int} ${currentLang === 'en' ? 'Intellect' : currentLang === 'fr' ? 'Intellect' : currentLang === 'es' ? 'Intelecto' : 'Intelecto'}</div>`);
      if (item.stats.spi) statsRows.push(`<div class="woc-tooltip-stat">+${item.stats.spi} ${currentLang === 'en' ? 'Spirit' : currentLang === 'fr' ? 'Esprit' : currentLang === 'es' ? 'Espíritu' : 'Espírito'}</div>`);
    }

    if (item.hitRating) statsRows.push(`<div class="woc-tooltip-green">${dict.equip_effect} +${item.hitRating} Hit Rating.</div>`);
    if (item.critRating) statsRows.push(`<div class="woc-tooltip-green">${dict.equip_effect} +${item.critRating} Critical Strike.</div>`);
    if (item.hasteRating) statsRows.push(`<div class="woc-tooltip-green">${dict.equip_effect} +${item.hasteRating} Haste.</div>`);
    if (item.spellPower) statsRows.push(`<div class="woc-tooltip-green">${dict.equip_effect} +${item.spellPower} Spell Power.</div>`);
    if (item.attackPower) statsRows.push(`<div class="woc-tooltip-green">${dict.equip_effect} +${item.attackPower} Attack Power.</div>`);

    let weaponRow = '';
    if (item.weapon) {
      weaponRow = `
        <div class="woc-tooltip-row font-mono">
          <span>${item.weapon.min} - ${item.weapon.max} ${dict.damage_label}</span>
          <span>${dict.speed_label} ${item.weapon.speed}s</span>
        </div>
        <div class="woc-tooltip-stat font-mono">(${item.weapon.dps} ${dict.dps_label})</div>
      `;
    }

    let classLockHtml = '';
    if (item.requiredClass && item.requiredClass.length > 0) {
      const formattedClasses = item.requiredClass.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ');
      classLockHtml = `<div class="woc-tooltip-stat font-mono" style="color: #e56767;">Classes: ${formattedClasses}</div>`;
    }

    let setHtml = '';
    if (item.set) {
      setHtml = `<div class="woc-tooltip-green font-mono" style="margin-top: 0.4rem;">Set: ${item.set}</div>`;
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
          <img src="${imgUrl}" class="woc-tooltip-icon-img" alt="${item.name}" loading="lazy" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'woc-tooltip-icon-img\\' style=\\'display:flex;align-items:center;justify-content:center;font-size:1.5rem;\\'>${fallbackEmoji}</div>';">
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
        <div class="woc-tooltip-stat font-mono" style="margin-top: 0.4rem;">${dict.req_level} ${item.reqLevel || 1}</div>
        <div class="woc-tooltip-flavor">"${dict.drop_from} ${item.source || 'World Drop'}"</div>
        <div class="woc-tooltip-sell font-mono">
          ${dict.sell_price} ${moneyHtml}
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

  // Inicializar o idioma salvo no localStorage e disparar a filtragem no load inicial
  setLanguage(currentLang);
});
