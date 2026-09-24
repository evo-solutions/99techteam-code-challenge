import { API_CONFIG } from '@/constants/api.const';
import { Token, TokenOption } from '@/services/token.type';

export const convertToTokenOption = (token: Token): TokenOption & { date: string } => ({
  currency: token.currency,
  price: token.price,
  iconUrl: `${API_CONFIG.TOKEN_ICONS_BASE_URL}/${token.currency}.svg`,
  date: token.date,
});

// API can return the same currency more than once — keep the newest priced entry.
export const processTokens = (tokens: Token[]): TokenOption[] => {
  const tokenMap = new Map<string, TokenOption & { date: string }>();

  tokens
    .filter(token => token.price > 0)
    .forEach(token => {
      const existing = tokenMap.get(token.currency);

      if (!existing || new Date(token.date) > new Date(existing.date)) {
        tokenMap.set(token.currency, convertToTokenOption(token));
      }
    });

  return Array.from(tokenMap.values())
    .map(({ date, ...token }) => token)
    .sort((a, b) => a.currency.localeCompare(b.currency));
};

export const validateTokens = (tokens: any[]): Token[] => {
  if (!Array.isArray(tokens)) {
    throw new Error('Invalid token data: not an array');
  }

  const validationRules = {
    isObject: (token: any) => token && typeof token === 'object',
    hasCurrency: (token: any) => typeof token.currency === 'string',
    hasPrice: (token: any) => typeof token.price === 'number' && token.price > 0,
    hasDate: (token: any) => typeof token.date === 'string',
  };

  return tokens.filter(token =>
    Object.values(validationRules).every(rule => rule(token))
  );
};

export const parseAmount = (amount: string | number): number => {
  if (typeof amount === 'number') {
    return Number.isFinite(amount) ? amount : 0;
  }

  if (!amount) return 0;

  const value = Number(amount.replace(/[^\d.-]/g, ''));
  return Number.isFinite(value) ? value : 0;
};

export const calculateSwapAmount = (
  fromAmount: string | number,
  fromPrice: number,
  toPrice: number
): number => {
  const amount = parseAmount(fromAmount);
  if (amount <= 0 || fromPrice <= 0 || toPrice <= 0) return 0;
  return (amount * fromPrice) / toPrice;
};

export const isValidAmount = (amount: string): boolean => {
  if (!amount) return false;
  const value = Number(amount);
  return Number.isFinite(value) && value >= 0;
};
