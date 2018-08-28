//控制层 
app.controller('articleController', function ($scope, $controller, $location, articleService, typeService) {

	$controller('baseController', { $scope: $scope });//继承

	//分页
	// $scope.findPage = function (page, rows) {
	// 	goodsService.findPage(page, rows).success(
	// 		function (response) {
	// 			$scope.list = response.rows;
	// 			$scope.paginationConf.totalItems = response.total;//更新总记录数
	// 		}
	// 	);
	// }
	$scope.findAllType = function () {
		console.log('hello world');
		typeService.findAll().success(
			function (response) {
				$scope.type_list = response.Data;
			}
		)
	}
	//查询实体 
	$scope.findOne = function () {
		//获取页面传过来的参数
		let id = $location.search()['id'];
		console.log(id);
		if (id == null) {
			return;
		}
		articleService.findOne(id).success(
			function (response) {
				$scope.entity = response.Data;
			}
		);
	}
	//保存 
	$scope.save = function () {
		console.log($scope.entity);
		var serviceObject;//服务层对象  				
		if ($scope.entity._id != null) {//如果有ID
			serviceObject = articleService.update($scope.entity); //修改  
		} else {
			serviceObject = articleService.add($scope.entity);//增加 
		}
		$scope.entity.lable = $scope.entity.lable.split(',');
		$scope.entity.content = ue.getContent();
		serviceObject.success(
			function (response) {
				if (response) {
					alert('添加成功');
					window.location.href = 'http://localhost:3000/list.html';
				} else {
					alert(response);
				}
			}
		);
	}
	//	这里要有一个add方法，只有添加的时候才会清空富文本编辑器
	$scope.add = function () {
		//添加商品介绍 introduction
		$scope.entity.goodsDesc.introduction = editor.html();
		console.log($scope.entity);
		goodsService.add($scope.entity).success(
			function (response) {
				if (response.success) {
					alert(response.message);
					$scope.entity = {};
					editor.html('');
					$scope.reloadList();//重新加载
				} else {
					alert(response.message);
				}
			}
		);
	}

	$scope.searchEntity = {};//定义搜索对象 

	//搜索
	$scope.search = function (page, rows) {
		articleService.search(page, rows, $scope.searchEntity).success(
			function (response) {
				$scope.list = response.Data.rows;
				$scope.paginationConf.totalItems = response.Data.total;//更新总记录数
			}
		);
	}
	/**
	 * 上传图片
	 */
	// $scope.uploadFile = function () {
	// 	uploadService.upload().success(
	// 		function (response) {
	// 			if (response.success) {
	// 				$scope.image_entity.url = response.message;
	// 			} else {
	// 				alert(response.message);
	// 			}
	// 		}
	// 	).error(function (err) {
	// 		alert('文件上传发生错误');
	// 	})
	// }
	// $scope.entity = { goods: {}, goodsDesc: { itemImages: [], specificationItems: [] } };
	// //往实体中添加图片
	// $scope.add_image_entity = function () {
	// 	console.log($scope.entity);
	// 	$scope.entity.goodsDesc.itemImages.push($scope.image_entity);
	// }
	// //移除图片
	// $scope.remove_image_entity = function (index) {
	// 	$scope.entity.goodsDesc.itemImages.splice(index, 1);
	// }

	//更新entity.goodsDesc.specificationItems中的数据，规格选项；
	// $scope.updateSpecAttribute = function ($event, name, value) {
	// 	//判断该规格选项中的key(attributeName)是否包含name值
	// 	var object = $scope.searchObjectBykey($scope.entity.goodsDesc.specificationItems, 'attributeName', name);
	// 	//如果包含
	// 	if (object != null) {
	// 		//判断该复选框是否选中
	// 		if ($event.target.checked) {
	// 			//选中添加进来
	// 			object.attributeValue.push(value);
	// 		} else {
	// 			//取消选中移除
	// 			object.attributeValue.splice(object.attributeValue.indexOf(value), 1);
	// 			//如果attributeValue中的数组长度为0，直接删除该对象object
	// 			if (object.attributeValue.length == 0) {
	// 				$scope.entity.goodsDesc.specificationItems.splice($scope.entity.goodsDesc.specificationItems.indexOf(object), 1)
	// 			}
	// 		}
	// 	} else {
	// 		//不包含，直接添加进来
	// 		$scope.entity.goodsDesc.specificationItems.push({ attributeName: name, attributeValue: [value] })
	// 	}
	// }
	//创建SKU列表，这个变化是随着$scope.entity.goodsDesc.specificationItems的变化而变化的。
	// $scope.createItemList = function () {
	// 	//初始化sku列表
	// 	//当勾选规格选项时调用该方法，初始化一个itemList数组。例如点击4.5寸，每次点击都会对itemList进行初始化
	// 	$scope.entity.itemList = [{ spec: {}, price: 0, num: 999, status: '0', isDefault: '0' }];
	// 	//获取所有的规格选项信息，获取所有的规格信息，此时是k为手机屏幕尺寸，v为[4.5,5寸]
	// 	var items = $scope.entity.goodsDesc.specificationItems;
	// 	//此时item的长度为1，
	// 	for (var i = 0; i < items.length; i++) {//再点击一次4g，items变为2个
	// 		$scope.entity.itemList = addColumn($scope.entity.itemList, items[i].attributeName, items[i].attributeValue);
	// 	}
	// }
	// //这里可以定义内部方法
	// addColumn = function (list, columnName, columnValues) {
	// 	var newList = [];
	// 	// list的长度为1
	// 	for (var i = 0; i < list.length; i++) {
	// 		//oldRow为[{ spec: {}, price: 0, num: 999, status: '0', isDefault: '0' }];
	// 		var oldRow = list[i];
	// 		for (var j = 0; j < columnValues.length; j++) {//此时有两条，循环2次生成2个sku列表
	// 			//深克隆oldRow
	// 			var newRow = JSON.parse(JSON.stringify(oldRow));
	// 			//一行新的sku列表[{"spec":{"手机屏幕尺寸":"4.5寸"},"price":0,"num":999,"status":"0","isDefault":"0"}]
	// 			newRow.spec[columnName] = columnValues[j];
	// 			newList.push(newRow);
	// 		}
	// 	}
	// 	return newList;
	// }
	// //添加商品状态信息
	// $scope.status = ['未审核', '已审核', '审核未通过', '关闭'];
	// //显示商品分类信息
	// $scope.itemCatList = [];
	// $scope.findItemCatList = function () {
	// 	itemCatService.findAll().success(
	// 		function (response) {
	// 			for (var i = 0; i < response.length; i++) {
	// 				// var obj={response[i]['id']:response[i].name}
	// 				//id和name一一对应
	// 				$scope.itemCatList[response[i].id] = response[i].name;
	// 			}
	// 		}
	// 	)
	// }
	// //检查规格选项是否勾选,只有规格名称存在，并且规格选项存在，才会被勾选。
	// $scope.checkAttributeValue = function (specName, optionName) {
	// 	let items = $scope.entity.goodsDesc.specificationItems;
	// 	//判断items中的attributeName是否存在规格名称	specName
	// 	let object = $scope.searchObjectBykey(items, 'attributeName', specName);
	// 	if (object == null) {
	// 		return false;
	// 	} else {
	// 		//判断是否存在选项名称
	// 		if (object.attributeValue.indexOf(optionName) >= 0) {
	// 			return true;
	// 		} else {
	// 			return false;
	// 		}
	// 	}

	// }
});	
