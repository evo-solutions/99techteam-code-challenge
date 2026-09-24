import React, { useMemo } from 'react';

// Provided by the original app — declared here so this file type-checks on its own.
interface BoxProps {
  className?: string;
  children?: React.ReactNode;
}

declare function useWalletBalances(): WalletBalance[];
declare function usePrices(): Record<string, number>;
declare const classes: { row: string };
declare const WalletRow: React.FC<{
  className?: string;
  amount: number;
  usdValue: number;
  formattedAmount: string;
}>;

interface WalletBalance {
  currency: string;
  amount: number;
  // Original type omitted this, but filter/sort both read balance.blockchain.
  blockchain: string;
}

// Original duplicated currency/amount instead of extending WalletBalance.
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  priority: number;
}

interface Props extends BoxProps {}

// Original getPriority lived inside the component and used `any`.
const BLOCKCHAIN_PRIORITIES: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const DEFAULT_PRIORITY = -99;

const getPriority = (blockchain: string): number => {
  return BLOCKCHAIN_PRIORITIES[blockchain] ?? DEFAULT_PRIORITY;
};

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Original built formattedBalances then mapped sortedBalances, so .formatted was unused.
  // Compute priority once, then filter/sort on that field.
  const formattedBalances = useMemo(() => {
    return balances
      .map((balance) => ({
        ...balance,
        formatted: balance.amount.toFixed(),
        priority: getPriority(balance.blockchain),
      }))
      .filter((balance) => {
        // Original compared undefined lhsPriority and kept amount <= 0.
        return balance.priority > DEFAULT_PRIORITY && balance.amount > 0;
      })
      .sort((lhs, rhs) => {
        // Original if/else if never returned 0 when priorities were equal.
        return rhs.priority - lhs.priority;
      });
    // Original listed `prices` in deps even though this memo never used it.
  }, [balances]);

  const rows = formattedBalances.map((balance: FormattedWalletBalance) => {
    // Missing price would make `prices[currency] * amount` become NaN.
    const usdValue = (prices[balance.currency] ?? 0) * balance.amount;

    return (
      <WalletRow
        className={classes.row}
        // List is filtered/sorted, so key={index} reuses the wrong row when order changes.
        key={`${balance.currency}-${balance.blockchain}`}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return (
    <div {...rest}>
      {rows}
      {/* Original destructured children but never rendered them. */}
      {children}
    </div>
  );
};

export default WalletPage;
