var express = require('express');
var router = express.Router();
//用于本地存储数据
var comments={};

//编码方法
function html_encode(str){
	let s='';
	if(str.length===0)return ;
	s=str.replace(/&/g,'&gt');
	s=str.replace(/</g,'&lt;')
	s=str.replace(/>/g,'&gt;')
	s=str.replace(/\s/g,'&nbsp;')
	s=str.replace(/\'/g,'&#39;')
	s=str.replace(/\"/g,'&quot')
	s=str.replace(/\\n/g,'<br>');
	return s;
}
/* GET home page. */
router.get('/', function(req, res, next) {
	res.set('X-XSS-Protection',0);
  res.render('index', { title: 'Express' ,xss:req.query.comment});
});

//存储评论  req:请求  res:返回  next:处理错误
router.get('/comment',function(req,res,next){
	comments.v=html_encode(req.query.comment);
})
//获取评论
router.get('/getComment',function(req,res,next){
	res.json({
		comment:comments.v
	})
})

module.exports = router;
