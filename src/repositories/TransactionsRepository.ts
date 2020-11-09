import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const allTransactions = this.transactions;

    return allTransactions;
  }

  public getBalance(): Balance {
    const transactionIncomeValues: number[] = [];
    const transactionOutcomeValues: number[] = [];

    let incomeTotal = 0;
    let outcomeTotal = 0;

    this.transactions.map(transaction => {
      if (transaction.type === 'income') {
        return transactionIncomeValues.push(transaction.value);
      }

      return transactionOutcomeValues.push(transaction.value);
    });

    if (transactionIncomeValues.length > 0) {
      incomeTotal = transactionIncomeValues.reduce((acc, cur) => {
        return acc + cur;
      });
    }

    if (transactionOutcomeValues.length > 0) {
      outcomeTotal = transactionOutcomeValues.reduce((acc, cur) => {
        return acc + cur;
      });
    }

    if (
      transactionOutcomeValues.length > 0 ||
      transactionIncomeValues.length > 0
    ) {
      const balance: Balance = {
        income: incomeTotal,
        outcome: outcomeTotal,
        total: incomeTotal - outcomeTotal,
      };

      return balance;
    }

    const balance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    return balance;
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
