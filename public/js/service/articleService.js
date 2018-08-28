//服务层
app.service('articleService', function ($http) {

	//读取列表数据绑定到表单中
	this.findAll = function () {
		return $http.get('../goods/findAll.do');
	}
	//分页 
	this.findPage = function (page, rows) {
		return $http.get('../goods/findPage.do?page=' + page + '&rows=' + rows);
	}
	//查询实体
	this.findOne = function (id) {
		return $http.get('../api/articles/' + id);
	}
	//增加 
	this.add = function (entity) {
		return $http.post('../api/articles', entity);
	}
	//修改 
	this.update = function (entity) {
		return $http.post('../goods/update.do', entity);
	}
	//删除
	this.dele = function (ids) {
		return $http.get('../goods/delete.do?ids=' + ids);
	}
	//搜索
	this.search = function (page, rows, searchEntity) {
		return $http.get('../api/articles?current_page=' + page + "&page_size=" + rows + "&name=" + searchEntity.name);
	}
});