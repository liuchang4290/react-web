import axios from 'axios';

import env from '../config/env';

import { clearAuthToken, isAuthenticated } from './auth';

import type { AxiosRequestConfig } from 'axios';

// 创建axios实例
const service = axios.create({
  baseURL: env.baseUrl || '/api', // 从配置中获取API基础URL
  timeout: 15000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 如果已登录，则添加token到请求头
    if (isAuthenticated()) {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.authToken = token;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { data } = response;

    // 根据后端接口规范，检查状态码
    // 假设返回格式为 { code: number, data: unknown, message: string }
    if (data && typeof data === 'object' && 'code' in data) {
      const code = data.code as number;

      // 处理401错误（未授权/token过期）
      if (code === 401) {
        // 清除认证信息
        clearAuthToken();
        // 跳转到登录页
        window.location.href = '/login';
        return Promise.reject(
          new Error((data.message as string) || '身份验证失败，请重新登录')
        );
      }

      // 如果返回的code不是成功状态码
      if (code !== 200) {
        return Promise.reject(new Error((data.message as string) || '请求失败'));
      }

      // 返回业务数据
      return 'data' in data ? data.data : data;
    }

    // 如果响应不是预期的格式，直接返回数据
    return data;
  },
  (error) => {
    // 处理HTTP错误
    if (error.response) {
      // 处理401错误（未授权/token过期）
      if (error.response.status === 401) {
        // 清除认证信息
        clearAuthToken();
        // 跳转到登录页
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

/**
 * GET请求
 * @param url 请求URL
 * @param params 请求参数
 * @param config 请求配置
 * @returns Promise
 */
export const get = <T = unknown>(
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig
) => {
  return service.get<unknown, T>(url, { params, ...config });
};

/**
 * POST请求
 * @param url 请求URL
 * @param data 请求数据
 * @param config 请求配置
 * @returns Promise
 */
export const post = <T = unknown>(
  url: string,
  data?: Record<string, unknown>,
  config?: AxiosRequestConfig
) => {
  return service.post<unknown, T>(url, data, config);
};

/**
 * PUT请求
 * @param url 请求URL
 * @param data 请求数据
 * @param config 请求配置
 * @returns Promise
 */
export const put = <T = unknown>(
  url: string,
  data?: Record<string, unknown>,
  config?: AxiosRequestConfig
) => {
  return service.put<unknown, T>(url, data, config);
};

/**
 * DELETE请求
 * @param url 请求URL
 * @param params 请求参数
 * @param config 请求配置
 * @returns Promise
 */
export const del = <T = unknown>(
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig
) => {
  return service.delete<unknown, T>(url, { params, ...config });
};

// 导出默认axios实例，以便直接使用
export default service;
