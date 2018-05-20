const Product = require('../../models/product');


const path = require('path');
const fs = require('fs');

module.exports = {
    addProduct,
    getProducts,
    removeProduct,
    updateProduct
}




function getProducts(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const allProducts = await Product.find( {userId:userId} );
            if (allProducts.length > 0){ resolve({'success':true,'allProducts':allProducts});}
            else resolve({ 'message': 'theres no product', product: allProducts });

        } catch (error) {
            reject(error)
        }
    })
}


function addProduct(_product) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(_product);
            
            const new_product = new Product(_product)
            const savedproduct = await new_product.save();
            if (savedproduct) {
                resolve({ success: true, message: 'Product Was Successfuly Added '})
            }
        }
        catch (error) {
            reject(error)
        }
    })
}

function removeProduct( productId) {
    
    return new Promise(async (resolve, reject) => {
        try {
            const movedProduct = await Product.remove({ _id: productId });
            console.log(movedProduct);
            
            if (movedProduct) resolve({ success: true, message: 'Product Was Successfuly Removed ' })
        }
        catch (error) {
            reject(error)
        }
    })
}

function updateProduct( productId, _product) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(productId);
            console.log(_product);
            
            const updatedProduct = await Product.update({ _id: productId}, _product);
            if (updatedProduct) resolve({ success: true, message: 'Product Was Successfuly Added '})

        }
        catch (error) {
            reject(error)
        }
    })
}
 