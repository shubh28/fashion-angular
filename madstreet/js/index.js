var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope','$http', function($scope,$http){
	var getProducts = function(){
		$http({
			method : 'GET',
			url : 'https://hackerearth.0x10.info/api/fashion?type=json&query=list_products',
		}).success(function(res){
			pdts = [];
			pdts = res.products;
			pdts.forEach(function(entry){
				entry.price = parseInt(entry.price);
				entry.rating = parseFloat(entry.rating);
			 	if(entry.category == 0){
			 		entry.tag = "Apparel";
			 	}
			 	else{
			 		entry.tag = "Accessories";
			 	}
			 });
			$scope.products = pdts;
		});
	};
	$scope.search = function(row) {
        return (angular.lowercase(row.name).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
                angular.lowercase(row.tag).indexOf(angular.lowercase($scope.query) || '') !== -1);
    };
    $scope.myFilter = function(x){
    	$scope.myOrderBy = x;
    }
    $scope.rangeFilter = function(){
    	var from = $scope.from;
    	var to = $scope.to;
    	filterProducts = [];
    	pdts.forEach(function(entry){
    		if(entry.price>from && entry.price<to){
				filterProducts.push(entry);
			}
    	});
    	$scope.products = filterProducts;
    	$scope.from = '';
    	$scope.to = '';
    }
    $scope.clear = function(){
    	$scope.products = pdts;
    }
	getProducts();
}]);