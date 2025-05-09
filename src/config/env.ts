import { DEV, PROD } from './constance';

const API_MAP = {
  [DEV]: 'https://api.blinktech.com.cn/core',
  [PROD]: 'https://api.focos.tech/core',
};

type EnvKey = keyof typeof API_MAP;

/**
 * 获取环境配置
 * @param region 区域
 * @param env 环境
 * @returns 环境配置
 */
const getEnv = (region: string, env: EnvKey) => {
  const baseUrl = API_MAP[env];
  return {
    region,
    env,
    baseUrl,
  };
};

export default getEnv(_GLOBAL_REGION, _GLOBAL_ENV);
