const express = require('express');
const OpenAI = require('openai');
const app = express();
const cors = require('cors');
const port = 3000; // 你可以自行设定服务运行的端口号
const apiKey = '7df7f3d2-3722-401e-949d-fe6ea5c01d32'
const rawData = require('./data/data.json');
const bodyParser = require('body-parser');
const {sleep} = require("openai/core");

// 配置豆包API相关信息，替换成你实际的密钥和接入点等信息
const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: "https://ark.cn-beijing.volces.com/api/v3"
});

app.use(express.json())
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
    //设置响应头
    //设置时，第一个参数，应当为双引号，第二个参数应当为单引号
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Headers", '*');
    res.setHeader("Access-Control-Allow-Method", '*');
    next()
})

app.post('/getData', async (req, res) => {
    const {t, cId} = req.body;
    console.log(cId)
    switch (Number(t)) {
        case 0:
            res.json(rawData.header);
            break
        case 1:
            if (!cId) {
                res.json(rawData.body);
            } else {
                // console.log(rawData.body)
                //Object.entries() 方法返回一个给定对象自身可枚举属性的键值对数组， 使用Object.key进行遍历的键值对应关系是不完整的
                for (let [key, value] of Object.entries(rawData.body)) {
                    if (key === cId) {
                        res.json(value)
                    }
                }
            }
            break
        case 2:
            res.json(rawData.footer);
            break
        case 3:
            res.json(rawData.carousel);
            break
        case 4:
            res.json(rawData.category);
            break
        case 5:
            res.json(rawData.Community);
            break
        case 6:
            res.json(rawData.Details);
            break
        default:
            res.status(500).json({error: 'Invalid parameter'});
        //500 代表的是服务器端的问题
    }
});

// 创建一个简单的路由，比如用于发送请求获取豆包回复的路由
app.get('/askDoubao', async (req, res) => {
    try {
        // 构造发送给豆包API的消息内容，这里示例简单的一问一答场景
        const messages = [
            {
                role: "system",
                content: "你是星语购物商城的AI助手，我们的项目名称是星语，你的名字叫语儿，我们平台拥有众多的商品和商家数量优势，声誉享誉全国。"
            },
            {
                role: "user",
                content: req.query.q+"（请简短地回答这个问题）" // 从请求的参数中获取用户的问题，例如访问 /askDoubao?question=世界上最高的山峰是哪座
            }
        ];

        // 调用豆包API的聊天完成接口
        const completion = await openai.chat.completions.create({
            model: "ep-20241223091804-b7fkx", // 替换为你实际的接入点名称
            messages: messages
        });

        // 将豆包回复返回给客户端
        res.json({
            answer: completion.choices[0].message.content
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: '调用豆包API出现错误'
        });
    }
});

app.get('/getData', async (req, res) => {
    const {t, category} = req.query;
    if (t === '1') {
        const products = await getProductsByCategory(category);
        res.json({star: products});
    } else {
        // 其他情况处理
    }
});

// 启动Express服务
app.listen(port, () => {
    console.log(`服务运行在 http://localhost:${port}`);
});