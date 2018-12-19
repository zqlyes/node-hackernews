
// 引入自定义处理函数模块
const handler = require('./handler');
const mime = require('mime');

module.exports = function (req,res){

   //设置请求头
   res.setHeader('content-type',mime.getType(req.url) || 'text/html;charset=utf-8');

  if(req.url.startsWith('/index') || req.url == '/'){ //首页
    handler.showIndex(req,res);
  }else if(req.url.startsWith('/details')){ //详情页
    handler.showDetails(req,res);
  }else if(req.url.startsWith('/submit')){
    handler.showSubmit(req,res);
  }else if(req.url.startsWith('/add') && req.method == 'GET'){
    handler.getAdd(req,res);
  }else if(req.url.startsWith('/add') && req.method == 'POST'){
    handler.postAdd(req,res);
  }else if(req.url.startsWith('/assets')){ //静态资源处理
    handler.showStatic(req,res);
  }else{
    handler.notFound(req,res);
  }
}



