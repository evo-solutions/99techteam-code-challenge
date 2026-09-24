import { API_CONFIG } from '@/constants/api.const';
import { httpGetService } from './http-get.service';
import { processTokens, validateTokens } from '@/utils/token.utils';
import { Token, TokenOption } from './token.type';

export const getTokens = async (): Promise<TokenOption[]> => {
  const tokens = await httpGetService.get<Token[]>(
    API_CONFIG.PRICES_URL,
    'token-prices'
  );

  return processTokens(validateTokens(tokens));
};
