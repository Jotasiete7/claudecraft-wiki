# 📚 World of Claudecraft Wiki (WOC Wiki)

[![World of Claudecraft](https://img.shields.io/badge/World_of_Claudecraft-Wiki_%26_Database-d4b483?style=for-the-badge)](https://woc-wiki.pages.dev)
[![Ecossistema](https://img.shields.io/badge/Ecossistema-A_Guilda-050505?style=for-the-badge&logo=github)](https://claudecraft-build-planner.pages.dev)

O portal oficial de enciclopédia, consulta e banco de dados de itens do jogo **World of Claudecraft** para o ecossistema **A Guilda**.

🌐 **Live Demo**: [woc-wiki.pages.dev](https://woc-wiki.pages.dev)  
⚔️ **Build Planner**: [claudecraft-build-planner.pages.dev](https://claudecraft-build-planner.pages.dev)

---

## 🔥 Funcionalidades

- 📊 **Catálogo Completo de 4.799+ Itens**: Equipamentos, armas, acessórios, consumíveis, montarias, receitas e encantamentos.
- 🎨 **Identidade Visual Fiel ao Build Planner**: Tema Obsidian (`#050505`), acentos em Ouro Nobre (`#d4b483`) e as 9 cores oficiais de classe.
- ⚡ **Busca & Filtros em Tempo Real**: Filtre por nome, ID, raridade, classe recomendada, slot de equipamento, tipo de armadura, fonte de drop e nível do item (`iLvl 1-60+`).
- 🖼️ **Artes & Ícones Originais**: Resolução de imagens estáticas WebP e renderizações JPG para armas e equipamentos do jogo.
- 📋 **Exportador p/ Discord**: Botão de 1 clique para copiar o link formatado em Markdown do item com estatísticas.
- 🔗 **Integração com Build Planner**: Botão de 1 clique para abrir/equipar qualquer item no Build Planner.

---

## 📁 Estrutura do Projeto

```
guilda-wiki/
├── index.html           # Página principal da WOC Wiki
├── css/
│   └── style.css        # Estilos customizados e integrações Tailwind
├── js/
│   └── app.js           # Lógica de busca, filtros, tooltips e modais
├── data/
│   └── items.data.js    # Banco de dados completo dos 4.799 itens
└── assets/
    └── ui/
        ├── items/       # 564 ícones WebP de itens
        └── weapons/     # 84 imagens JPG de armas
```

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 & Vanilla JavaScript**: Desempenho ultrarrápido sem dependências pesadas.
- **Tailwind CSS**: Estilização responsiva e integrada ao ecossistema A Guilda.
- **Google Fonts**: *Playfair Display* (Serif), *Inter* (Sans) e *JetBrains Mono* (Code).

---

## 📜 Licença

Desenvolvido para a comunidade **A Guilda** e o jogo **World of Claudecraft**.
