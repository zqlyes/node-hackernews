//创建并开启一个服务器
  //1-引入http模块
  const http = require('http');

  //2-创建服务器
  const server = http.createServer();


// 引入自定义路由模块
const router = require('./router');

  //3-监听请求并响应
  server.on('request', (req,res) => {
    console.log(req.url);
    console.log(req.method);
    
    //将请求交由路由进行处理
    router(req,res)
   
  });

  //4-开启服务器
  server.listen(9999, () => console.log('http://localhost:9999 服务器已开启'));

  
