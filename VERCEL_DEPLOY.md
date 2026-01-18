# Configuração Vercel - Dashboard mycash+

## Repositório GitHub
- **URL:** https://github.com/Carlos-Siqueira-Design/dashboard-mycash
- **Branch:** main
- **Remote:** origin

## Configuração do Vercel

### Verificar no Vercel Dashboard:
1. Acesse: https://vercel.com/dashboard
2. Verifique se o projeto está conectado ao repositório correto:
   - Deve ser: `Carlos-Siqueira-Design/dashboard-mycash`
   - NÃO deve ser: `Carlos-Siqueira-Design/mycash-plus`

### Se o repositório estiver errado:
1. No Vercel Dashboard, vá em Settings → Git
2. Desconecte o repositório atual
3. Conecte novamente selecionando: `dashboard-mycash`
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** ./
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

### Forçar novo deploy:
1. No Vercel Dashboard, vá em Deployments
2. Clique nos 3 pontos do último deployment
3. Selecione "Redeploy"
4. Ou faça um novo commit (já feito)

## Arquivos de Configuração

- `vercel.json` - Configuração do Vercel
- `.vercel-build-trigger` - Arquivo para forçar rebuild

## Comandos Úteis

```bash
# Verificar remote
git remote -v

# Verificar branch atual
git branch

# Verificar últimos commits
git log --oneline -5

# Forçar push
git push origin main --force (NÃO recomendado, use apenas se necessário)
```

## Troubleshooting

### Se as alterações não aparecerem:
1. Verifique se o repositório no Vercel está correto
2. Verifique se a branch está correta (main)
3. Verifique os logs de build no Vercel
4. Faça um commit vazio para forçar rebuild:
   ```bash
   git commit --allow-empty -m "chore: trigger rebuild"
   git push origin main
   ```
