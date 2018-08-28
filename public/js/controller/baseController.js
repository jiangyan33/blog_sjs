app.controller('baseController', function ($scope) {
    //重新加载页面
    $scope.reloadList = function () {
        //切换页吗
        $scope.search($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
    };
    //分页控件配置
    $scope.paginationConf = {
        currentPage: 1,
        totalItems: 10,
        itemsPerPage: 10,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function () {
            //调用发送请求的方法，刷新页面数据 
            $scope.reloadList();
        }
    };
    //定义一个数组存放删除数据的id
    $scope.selectIds = [];
    $scope.updateSelection = function ($event, id) {
        console.log($event);
        if ($event.target.checked) {
            //如果被选中
            $scope.selectIds.push(id);
        } else {
            var idIndex = $scope.selectIds.indexOf(id);
            //从指定的位置删除数组中的一个元素
            $scope.selectIds.splice(idIndex, 1);
        }
    };
    //获取数组中某个对象的key，以，进行拼接
    $scope.jsonToString = function (arr, key) {
        arr = JSON.parse(arr);
        if (arr && arr.length != 0) {
            let new_arr = [];
            for (let i = 0; i < arr.length; i++) {
                new_arr.push(arr[i][key]);
            }
            return new_arr.join(',');
        }
    }
    //查询数组中包含{key:keyValue}的对象
    //[{attributeName:'网络',attributeValue:[‘4g’,5g,'6g']}]
    $scope.searchObjectBykey = function (list, key, keyValue) {
        for (var i = 0; i < list.length; i++) {
            if (list[i][key] == keyValue) {
                return list[i];
            }
        }
        return null;
    }
})