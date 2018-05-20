const renderResponseUtil = require('../../utils/RenderResponseUtil');
const ErrorMessage = require('../../utils/customMessage').ErrorMessage;
const product_service = require('./product_service');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: "public/uploadimages"
});
const upload = multer({ storage: storage }).any();
module.exports = {
    addProduct,
    getProducts,
    removeProduct,
    updateProduct
}
  
    
async function addProduct(req, res) {
    try {
        
        
        upload(req, res, async function (err) {
            if (err) {
                console.log(err);
                return res.end("Error uploading file.");
            } else {
                const product = JSON.parse(req.param('id'));
                product.image = req.files[0].filename;
                const getProducts = await product_service.addProduct(product);
                renderResponseUtil.sendResponse(req, res, getProducts)
            }
        });
        
        
    } catch (error) {
        res.send(error);
    }
}       
 

async function getProducts(req, res) {
    try {
        const getProducts = await product_service.getProducts(req.param('id'));
        renderResponseUtil.sendResponse(req, res, getProducts)
    } catch (error) {
        res.send(error);
    }
}

async function removeProduct(req, res) {
    try {
        
        const removedProduct = await product_service.removeProduct(req.param('id'));
        renderResponseUtil.sendResponse(req, res, removedProduct)
    } catch (error) {
        res.send(error);
    }
} 
async function updateProduct(req, res) {
    try {
        
        upload(req, res, async function (err) {
            if (err) {
                console.log(err);
                return res.end("Error uploading file.");
            } else {
                const product = JSON.parse(req.param('id'));
                product.image = req.files[0].filename;
                const updatedProduct = await product_service.updateProduct(product._id, product);
                renderResponseUtil.sendResponse(req, res, updatedProduct)
            }
        });
        
    } catch (error) {
        res.send(error);
    }
} 