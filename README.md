# mycash+

Sistema de gestão financeira familiar desenvolvido com React, TypeScript e Vite.

## 🚀 Tecnologias

- **React 19** com **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS** - Estilização
- **React Router** - Roteamento
- **Supabase** - Backend (integração futura)

## 📦 Instalação

```bash
npm install
```

## 🛠️ Desenvolvimento

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 📁 Estrutura do Projeto

```
src/
├── components/       # Componentes React
│   ├── layout/      # Layout (Sidebar, HeaderMobile, MainLayout)
│   ├── dashboard/   # Componentes da dashboard
│   ├── cards/       # Componentes de cartões
│   ├── transactions/# Componentes de transações
│   ├── profile/     # Componentes de perfil
│   └── ui/          # Componentes base reutilizáveis
├── pages/           # Páginas (composição de componentes)
├── hooks/           # Hooks customizados
├── contexts/         # Context Providers
├── services/         # Serviços (API, Supabase)
├── styles/           # Estilos globais e tokens
├── types/            # Tipos TypeScript
└── utils/            # Funções utilitárias
```

## 🎨 Design System

O projeto utiliza tokens primitivos e semânticos do design system definido no Figma.

**Fonte:** [Google Sheets - Tokens Primitivos](https://docs.google.com/spreadsheets/d/1icfTxXdSbtd029FfOYnrlMs2pC8HJqk5PDuEmQF5Zjo/edit?gid=0#gid=0)

## 📐 Breakpoints

- **Mobile (base)**: < 768px
- **Tablet (md)**: ≥ 768px e < 1280px
- **Desktop (lg)**: ≥ 1280px e < 1920px
- **Wide / 4K (xl)**: ≥ 1920px

## 🔒 Segurança

⚠️ **NUNCA** commitar chaves, tokens ou segredos. Use variáveis de ambiente (`.env.local`).

## 📚 Documentação

- **Project Rules**: `PROJECT_RULES.md`
- **Sequência de Prompts**: `SEQUENCIA_PROMPTS.md`
- **Documentação de Progresso**: `DOCUMENTATION.md`

---

**Status:** Em desenvolvimento - PROMPT 1 concluído
