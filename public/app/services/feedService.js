(function () {
  'use strict';
  angular
    .module('app')
    .factory('feedService', feedService);
  feedService.inject = ['$http'];
  function feedService($http) {
    const apiUrl = 'http://localhost:8000/product/';
    const currentUser = JSON.parse(localStorage.getItem('currentUser')).userId;
    console.log(currentUser);

    var service = {
      getProducts: getProducts,
      updateProduct: updateProduct,
      deleteProduct: deleteProduct
    };
    return service;
    function getProducts() {

      return $http.get(`${apiUrl}getProducts?id=${currentUser}`)
        .then(getProductsComplete)
        .catch(getProductsFailed);
      function getProductsComplete(response) {
        return response.data.allProducts;
      }
      function getProductsFailed(error) {
        console.log('XHR Failed for getProducts. ' + error.data);
      }
    }


    function updateProduct(formData, id) {
      return $http.patch('/apiUrl/' + id, formData)
        .then(updateProductComplete)
        .catch(updateProductFailed);
      function updateProductComplete(response) {
        return response.data;
      }
      function updateProductFailed(error) {
        console.log('XHR Failed for updateProduct. ' + error.data);
      }
    }
    function deleteProduct(id) {
      console.log(id);
      
      return $http.delete(`${apiUrl}/removeProduct?id=${id}`)
        .then(deleteProductComplete)
        .catch(deleteProductFailed);
      function deleteProductComplete(response) {
        return response.data;
      }
      function deleteProductFailed(error) {
        console.log('XHR Failed for deleteProduct.' + error.data);
      }
    }

  }
})();