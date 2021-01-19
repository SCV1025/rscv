import qs from 'qs';
import axios from 'axios';
import Config from '../Config';

const service = axios.create({
    // baseURL: Config.domain, // api 的 base_url
    timeout: 30000, // request timeout  设置请求超时时间
});
service.interceptors.request.use(
    (config) => {
        // TODO 定制请求头部固定信息
        return config;
    },
    (error) => {
        // 对响应错误做点什么
        console.log(error);
        return Promise.reject(error);
    },
);
service.interceptors.response.use(
    (response) => {
        console.log(response);
        return response;
    },
    (error) => {
        // TODO 对响应错误做点什么 error.response.status
        return Promise.reject(error);
    },
);
const domain = Config.domain;
export default class Http {
    static getFullUrl(url, timeout) {
        return new Promise((resolve, reject) => {
            service
                .get(url, {
                    timeout: timeout || 30000,
                })
                .then((result) => {
                    resolve(result.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    static get(url, token = undefined, timeout) {
        return new Promise((resolve, reject) => {
            service
                .get(domain + url)
                .then((result) => {
                    console.debug(`HTTP Response ${url}:`, result.data);
                    resolve(result.data);
                })
                .catch((error) => {
                    console.warn(
                        `HTTP Response error ${url}:`,
                        JSON.stringify(error),
                    );
                    reject(error);
                });
        });
    }

    static postForm(url, data, timeout = 15000, token = undefined) {
        return new Promise((resolve, reject) => {
            service
                .post(domain + url, qs.stringify(data), {
                    timeout: timeout,
                })
                .then((result) => {
                    console.debug(`HTTP Response ${url}:`, result.data);
                    resolve(result.data);
                })
                .catch((error) => {
                    console.warn(
                        `HTTP Response error ${url}:`,
                        JSON.stringify(error),
                    );
                    reject(error);
                });
        });
    }
}
