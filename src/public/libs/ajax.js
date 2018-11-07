import axios from 'axios';
import {baseUrl} from '../../../config/env';


export default function ajax(config = {}){
    const defaultConfig = {
        method: config.method || 'post',
        url: config.url,
        data: config.data
    }
    // 根据环境变量切换不同的配置

    if(process.env.NODE_ENV === 'development'){
        defaultConfig['baseURL'] = baseUrl['development'];
    } 
    else if(process.env.NODE_ENV === 'test'){
        defaultConfig['baseURL'] = baseUrl['test'];
    }
    else {
        defaultConfig['baseURL'] = baseUrl['production'];
    }

    return axios(defaultConfig)
        .then((res)=>{
            const status = res.status;
            // 成功的状态直接返回数据
            if(status.code == '200'){
                return res.data;
            }
            throw new Error(res.status);
        })
}