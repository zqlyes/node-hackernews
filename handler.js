//引入相关模块
const fs = require('fs');
const path = require('path');
const template = require('art-template');
const url = require('url');
const queryString = require('querystring');


module.exports = {
  showIndex(req,res){
    // 读页面
    // fs.readFile(path.join(__dirname,'views','index.html'),(err,data) => {
    //   if(err){
    //     return console.log('读取失败',err);
    //   }
    //   res.end(data);
    // })

    // 读数据并渲染页面
    readData(data => {
      let str = template(path.join(__dirname,'views','index.html'),data);
      res.end(str);
    })
  },
  showDetails(req,res){
    //读数据并渲染页面
    let id = url.parse(req.url,true).query.id;
    console.log(id);
    readData(data => {
      data = data.list.find(item => item.id == id);
      let str = template(path.join(__dirname,'views','details.html'),data);
      res.end(str);
    })
  },
  showSubmit(req,res){
    fs.readFile(path.join(__dirname,'views','submit.html'),(err,data) => {
      if(err){
        return console.log('读取失败',err);
      }
      res.end(data);
    })
  },
  showStatic(req,res){
    fs.readFile(path.join(__dirname,req.url),(err,data) => {
      if(err){
        return console.log('读取失败',err);
      }
      res.end(data);
    })
  },
  getAdd(req,res){
    let info = url.parse(req.url,true).query;
    readData(data => {
      info.id = data.list[data.list.length - 1].id + 1;
      data.list.push(info);
      data = JSON.stringify(data,null,2);
      writeData(data, () => {
        res.statusCode = 302;
        res.setHeader('location','/index');
        res.end();
      })
    })
  },
  postAdd(req,res){
    let info = '';
    req.on('data',(chunk) => {
      info += chunk;
    });
    req.on('end',() => {
      info = queryString.parse(info);
      readData(data => {
        info.id = data.list[data.list.length - 1].id + 1;
        data.list.push(info);
        data = JSON.stringify(data,null,2);
        writeData(data, () => {
          res.statusCode = 302;
          res.setHeader('location','/index');
          res.end();
        })
      })
    })
  },
  notFound(req,res){
    res.end('404-页面未找到');
  }
}


  //读数据文件
  function readData(callback){
    fs.readFile(path.join(__dirname,'data.json'),'utf-8',(err,data) => {
      if(err){
        return console.log('读取数据失败',err);
      }
      data = JSON.parse(data);
      callback && callback(data);
    })
  }

  //将内容写入数据文件中
  function writeData(str,callback){
    fs.writeFile(path.join(__dirname,'data.json'),str, err => {
      if(err){
        return console.log('写入失败',err);
      }
      callback && callback();
    })
  }