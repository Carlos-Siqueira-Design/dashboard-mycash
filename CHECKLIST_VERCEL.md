# Checklist - Verificar Deploy no Vercel

## ✅ Verificações Realizadas

- [x] Repositório GitHub correto: `dashboard-mycash`
- [x] Branch: `main`
- [x] Remote configurado corretamente
- [x] Build local funcionando (`npm run build`)
- [x] Arquivo `vercel.json` criado
- [x] Commits enviados para GitHub
- [x] `.vercelignore` configurado

## 🔍 Verificar no Vercel Dashboard

### 1. Repositório Conectado
Acesse: https://vercel.com/dashboard

Verifique se o projeto está conectado a:
- ✅ `Carlos-Siqueira-Design/dashboard-mycash`
- ❌ NÃO deve ser: `Carlos-Siqueira-Design/mycash-plus`

### 2. Configurações do Projeto
Vá em: Settings → General

Verifique:
- **Framework Preset:** Vite
- **Root Directory:** ./
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### 3. Deployments
Vá em: Deployments

Verifique:
- Último deployment deve ter o commit mais recente
- Status deve ser "Ready" (verde)
- Se estiver "Error", verifique os logs

### 4. Se o Repositório Estiver Errado

**Opção A: Reconectar Repositório**
1. Settings → Git
2. Clique em "Disconnect"
3. Clique em "Connect Git Repository"
4. Selecione: `dashboard-mycash`
5. Configure as settings acima

**Opção B: Criar Novo Projeto**
1. Dashboard → Add New → Project
2. Import: `dashboard-mycash`
3. Configure:
   - Framework: Vite
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `dist`

### 5. Forçar Novo Deploy

**Via Dashboard:**
1. Deployments → Último deployment
2. 3 pontos → "Redeploy"

**Via Git (já feito):**
```bash
git commit --allow-empty -m "chore: trigger rebuild"
git push origin main
```

## 📊 Status Atual

- **Repositório Local:** `dashboard-mycash` ✅
- **Último Commit:** `de617cb` (docs: adiciona guia de configuração do Vercel)
- **Build Local:** ✅ Sucesso
- **GitHub:** ✅ Sincronizado

## 🚨 Problemas Comuns

1. **Repositório errado no Vercel**
   - Solução: Reconectar ao `dashboard-mycash`

2. **Branch errada**
   - Solução: Verificar se está usando `main`

3. **Build falhando**
   - Solução: Verificar logs no Vercel

4. **Cache do Vercel**
   - Solução: Fazer redeploy ou commit vazio

## 📝 Próximos Passos

1. Verificar no Vercel Dashboard se o repositório está correto
2. Se estiver errado, reconectar ao `dashboard-mycash`
3. Aguardar novo deploy automático
4. Verificar se as alterações aparecem
