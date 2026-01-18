/**
 * Tipos TypeScript fundamentais para o sistema mycash+
 * Representam as cinco entidades principais do sistema
 */

/**
 * Tipo de transação: receita ou despesa
 */
export type TransactionType = 'income' | 'expense';

/**
 * Status de uma transação
 */
export type TransactionStatus = 'completed' | 'pending' | 'cancelled';

/**
 * Transação financeira
 */
export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  date: Date;
  accountId: string; // ID da conta bancária ou cartão de crédito
  memberId: string | null; // ID do membro responsável, null se for geral
  installments?: number; // Número de parcelas (1 = à vista)
  currentInstallment?: number; // Parcela atual (1, 2, 3, etc)
  status: TransactionStatus;
  isRecurring: boolean; // Se é despesa recorrente (ex: assinatura mensal)
  isPaid: boolean; // Se foi paga (para despesas)
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Objetivo financeiro
 */
export interface Goal {
  id: string;
  title: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  memberId: string | null; // ID do membro responsável, null se for familiar
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Tema visual do cartão
 */
export type CardTheme = 'black' | 'lime' | 'white';

/**
 * Cartão de crédito
 */
export interface CreditCard {
  id: string;
  name: string;
  holderId: string; // ID do membro titular
  closingDay: number; // Dia de fechamento (1-31)
  dueDay: number; // Dia de vencimento (1-31)
  limit: number; // Limite total
  currentBill: number; // Fatura atual
  theme: CardTheme;
  lastDigits?: string; // Últimos 4 dígitos
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Conta bancária
 */
export interface BankAccount {
  id: string;
  name: string;
  holderId: string; // ID do membro titular
  balance: number; // Saldo atual
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Membro da família
 */
export interface FamilyMember {
  id: string;
  name: string;
  role: string; // Ex: "Pai", "Mãe", "Filho", etc
  avatarUrl?: string; // URL da imagem do avatar
  monthlyIncome?: number; // Renda mensal estimada (opcional)
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Filtros globais do sistema
 */
export interface GlobalFilters {
  selectedMember: string | null;
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
  transactionType: 'all' | 'income' | 'expense';
  searchText: string;
}

/**
 * Categoria de transação
 */
export interface Category {
  id: string;
  name: string;
  type: TransactionType;
  color?: string; // Cor da categoria (hex)
  icon?: string; // Ícone da categoria
}
