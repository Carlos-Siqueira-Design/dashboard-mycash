import { createContext, useContext, useState, type ReactNode } from 'react';
import type {
  Transaction,
  Goal,
  CreditCard,
  BankAccount,
  FamilyMember,
  GlobalFilters,
  Category,
} from '../types';

interface FinanceContextType {
  // Arrays principais
  transactions: Transaction[];
  goals: Goal[];
  creditCards: CreditCard[];
  bankAccounts: BankAccount[];
  familyMembers: FamilyMember[];
  categories: Category[];

  // Filtros globais
  filters: GlobalFilters;
  setFilters: (filters: GlobalFilters | ((prev: GlobalFilters) => GlobalFilters)) => void;

  // CRUD Transactions
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;

  // CRUD Goals
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;

  // CRUD CreditCards
  addCreditCard: (card: Omit<CreditCard, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCreditCard: (id: string, updates: Partial<CreditCard>) => void;
  deleteCreditCard: (id: string) => void;

  // CRUD BankAccounts
  addBankAccount: (account: Omit<BankAccount, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateBankAccount: (id: string, updates: Partial<BankAccount>) => void;
  deleteBankAccount: (id: string) => void;

  // CRUD FamilyMembers
  addFamilyMember: (member: Omit<FamilyMember, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateFamilyMember: (id: string, updates: Partial<FamilyMember>) => void;
  deleteFamilyMember: (id: string) => void;

  // Funções de cálculo derivadas
  getFilteredTransactions: () => Transaction[];
  calculateTotalBalance: () => number;
  calculateIncomeForPeriod: (startDate: Date, endDate: Date) => number;
  calculateExpensesForPeriod: (startDate: Date, endDate: Date) => number;
  calculateExpensesByCategory: (startDate: Date, endDate: Date) => Record<string, number>;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

// Dados mock iniciais
const initialTransactions: Transaction[] = [
  {
    id: '1',
    type: 'expense',
    amount: 150.00,
    description: 'Supermercado',
    category: 'Alimentação',
    date: new Date('2026-01-15'),
    memberId: '1',
    accountId: '1',
    status: 'completed',
    isRecurring: false,
    isPaid: true,
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-15'),
  },
  {
    id: '2',
    type: 'income',
    amount: 5000.00,
    description: 'Salário',
    category: 'Salário',
    date: new Date('2026-01-01'),
    memberId: '1',
    accountId: '1',
    status: 'completed',
    isRecurring: true,
    isPaid: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
];

const initialGoals: Goal[] = [
  {
    id: '1',
    title: 'Viagem para Europa',
    targetAmount: 10000.00,
    currentAmount: 3500.00,
    deadline: new Date('2026-12-31'),
    memberId: null,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
];

const initialCreditCards: CreditCard[] = [
  {
    id: '1',
    name: 'Cartão Nubank',
    holderId: '1',
    closingDay: 5,
    dueDay: 15,
    limit: 5000.00,
    currentBill: 1200.00,
    theme: 'black',
    lastDigits: '1234',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
];

const initialBankAccounts: BankAccount[] = [
  {
    id: '1',
    name: 'Conta Corrente Nubank',
    holderId: '1',
    balance: 8500.00,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
];

const initialFamilyMembers: FamilyMember[] = [
  {
    id: '1',
    name: 'Carlos Siqueira',
    role: 'owner',
    avatarUrl: undefined,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
];

const initialCategories: Category[] = [
  { id: '1', name: 'Alimentação', type: 'expense', color: '#FF6B6B', icon: '🍔' },
  { id: '2', name: 'Transporte', type: 'expense', color: '#4ECDC4', icon: '🚗' },
  { id: '3', name: 'Moradia', type: 'expense', color: '#45B7D1', icon: '🏠' },
  { id: '4', name: 'Saúde', type: 'expense', color: '#96CEB4', icon: '🏥' },
  { id: '5', name: 'Educação', type: 'expense', color: '#FFEAA7', icon: '📚' },
  { id: '6', name: 'Lazer', type: 'expense', color: '#DDA15E', icon: '🎮' },
  { id: '7', name: 'Salário', type: 'income', color: '#6C5CE7', icon: '💰' },
];

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [creditCards, setCreditCards] = useState<CreditCard[]>(initialCreditCards);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(initialBankAccounts);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(initialFamilyMembers);
  const [categories] = useState<Category[]>(initialCategories);

  const [filters, setFilters] = useState<GlobalFilters>({
    selectedMember: null,
    dateRange: {
      startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      endDate: new Date(),
    },
    transactionType: 'all',
    searchText: '',
  });

  // CRUD Transactions
  const addTransaction = (transactionData: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTransactions((prev) => [...prev, newTransaction]);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates, updatedAt: new Date() } : t))
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // CRUD Goals
  const addGoal = (goalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setGoals((prev) => [...prev, newGoal]);
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updates, updatedAt: new Date() } : g))
    );
  };

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  // CRUD CreditCards
  const addCreditCard = (cardData: Omit<CreditCard, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCard: CreditCard = {
      ...cardData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setCreditCards((prev) => [...prev, newCard]);
  };

  const updateCreditCard = (id: string, updates: Partial<CreditCard>) => {
    setCreditCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates, updatedAt: new Date() } : c))
    );
  };

  const deleteCreditCard = (id: string) => {
    setCreditCards((prev) => prev.filter((c) => c.id !== id));
  };

  // CRUD BankAccounts
  const addBankAccount = (accountData: Omit<BankAccount, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newAccount: BankAccount = {
      ...accountData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setBankAccounts((prev) => [...prev, newAccount]);
  };

  const updateBankAccount = (id: string, updates: Partial<BankAccount>) => {
    setBankAccounts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates, updatedAt: new Date() } : a))
    );
  };

  const deleteBankAccount = (id: string) => {
    setBankAccounts((prev) => prev.filter((a) => a.id !== id));
  };

  // CRUD FamilyMembers
  const addFamilyMember = (memberData: Omit<FamilyMember, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newMember: FamilyMember = {
      ...memberData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setFamilyMembers((prev) => [...prev, newMember]);
  };

  const updateFamilyMember = (id: string, updates: Partial<FamilyMember>) => {
    setFamilyMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates, updatedAt: new Date() } : m))
    );
  };

  const deleteFamilyMember = (id: string) => {
    setFamilyMembers((prev) => prev.filter((m) => m.id !== id));
  };

  // Funções de cálculo derivadas
  const getFilteredTransactions = () => {
      let filtered = [...transactions];

      // Filtro por membro
      if (filters.selectedMember) {
        filtered = filtered.filter((t) => t.memberId === filters.selectedMember);
      }

      // Filtro por tipo
      if (filters.transactionType) {
        filtered = filtered.filter((t) => t.type === filters.transactionType);
      }

      // Filtro por data
      if (filters.dateRange.startDate && filters.dateRange.endDate) {
        filtered = filtered.filter((t) => {
          const tDate = new Date(t.date);
          return (
            tDate >= filters.dateRange.startDate! && tDate <= filters.dateRange.endDate!
          );
        });
      }

      // Filtro por tipo
      if (filters.transactionType && filters.transactionType !== 'all') {
        filtered = filtered.filter((t) => t.type === filters.transactionType);
      }

      // Filtro por texto
      if (filters.searchText) {
        const searchLower = filters.searchText.toLowerCase();
        filtered = filtered.filter(
          (t) =>
            t.description.toLowerCase().includes(searchLower) ||
            t.category.toLowerCase().includes(searchLower)
        );
      }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const calculateTotalBalance = () => {
    const accountsBalance = bankAccounts.reduce((sum, acc) => sum + acc.balance, 0);
    const cardsDebt = creditCards.reduce((sum, card) => sum + card.currentBill, 0);
    return accountsBalance - cardsDebt;
  };

  const calculateIncomeForPeriod = (startDate: Date, endDate: Date) => {
    return transactions
      .filter(
        (t) =>
          t.type === 'income' &&
          new Date(t.date) >= startDate &&
          new Date(t.date) <= endDate
      )
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const calculateExpensesForPeriod = (startDate: Date, endDate: Date) => {
    return transactions
      .filter(
        (t) =>
          t.type === 'expense' &&
          new Date(t.date) >= startDate &&
          new Date(t.date) <= endDate
      )
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const calculateExpensesByCategory = (startDate: Date, endDate: Date) => {
    const expenses = transactions.filter(
      (t) =>
        t.type === 'expense' &&
        new Date(t.date) >= startDate &&
        new Date(t.date) <= endDate
    );

    return expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);
  };

  const value: FinanceContextType = {
    transactions,
    goals,
    creditCards,
    bankAccounts,
    familyMembers,
    categories,
    filters,
    setFilters,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addGoal,
    updateGoal,
    deleteGoal,
    addCreditCard,
    updateCreditCard,
    deleteCreditCard,
    addBankAccount,
    updateBankAccount,
    deleteBankAccount,
    addFamilyMember,
    updateFamilyMember,
    deleteFamilyMember,
    getFilteredTransactions,
    calculateTotalBalance,
    calculateIncomeForPeriod,
    calculateExpensesForPeriod,
    calculateExpensesByCategory,
  };

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}
