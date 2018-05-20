(function () {
    'use strict';
    angular.module('app')
        .controller('addProductCtrl', function ($scope, feedService, $location) {
            $scope.product = {};
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const jwt = 'jwt ' + currentUser.token;
            const userId=currentUser.userId;
            $scope.flage=false;
            if ($location.search().id) {
                $scope.flage = true;
                
               $scope.product.userId = userId;
               $scope.product = JSON.parse($location.search().id);
           }
            
            

           $scope.upload=function(file){
            console.log(file);
               console.log($scope.product.imageFile);
            
           }
 
            $scope.updateProduct=function(){
                uploadimage('/product/updateProduct?id=' + JSON.stringify($scope.product),'patch')
            }
            $scope.addProduct = function () {
                uploadimage('/product/addProduct?id=' + JSON.stringify($scope.product),'POST')
                
            }
            
            function uploadimage(apiUrl,action) {
                var data = new FormData();
                $.each($("input[type='file']")[0].files, function (i, file) {
                    data.append('file', file);
                    data.append('product',$scope.product)
                });

                $.ajax({
                    type: action,
                    url: apiUrl,
                    dataType: "json",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', jwt);
                    },
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: data,

                    success: function (result) {
                        if (result) {
                            console.log(result);
                            window.location = '/feed'
                        }
                         
                    },
                    error: function (err) {
                        console.log(err);
                    }
                })
            }

        });


})()