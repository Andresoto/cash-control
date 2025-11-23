export class IncomeExit {

  static fromFirebase({ description, amount, type, uid }: IncomeExitFirebase) {
    return new IncomeExit(description, amount, type, uid);
  }

  constructor(
    public description: string,
    public amount: number,
    public type: 'income' | 'exit',
    public uid?: string
  ) {}
}

export interface IncomeExitFirebase {
  description: string;
  amount: number;
  type: 'income' | 'exit';
  uid?: string;
}
