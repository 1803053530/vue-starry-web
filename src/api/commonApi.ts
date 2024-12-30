import request from './request'

interface ResponseData {
    data: string[];
}

// async function getData(t: 0 | 1 | 2): Promise<ResponseData> {
//     const response = await fetch('http://localhost:3000/getData', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             "Access-Control-Allow-Origin":'*',
//             "Access-Control-Allow-Headers":'*',
//             "Access-Control-Allow-Method":'*'
//         },
//         body: t
//     });
//     if (!response.ok) {
//         throw new Error('获取数据失败');
//     }
//     console.log(response)
//     return response.json() as Promise<ResponseData>;
// }

function apiGetData(params) {
    return request({
        url: '/getData',
        method: 'post',
        data: params
    }).then(res => {
        return res.data
    }).catch((error) => {
        console.error('Error fetching data:', error);
        return '请求出现错误，无法获取答案';
    })
}

function apiAskDoubao(params) {
    return request({
        url: '/askDoubao',
        method: 'get',
        params: params
    }).then(res => {
        return res.data
    }).catch((error) => {
        console.error('Error fetching data:', error);
        return '请求出现错误，无法获取答案';
    })
}

export {apiGetData, apiAskDoubao}