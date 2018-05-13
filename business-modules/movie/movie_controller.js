const renderResponseUtil = require('../../utils/RenderResponseUtil');
const ErrorMessage = require('../../utils/customMessage').ErrorMessage;
const movie_service = require('./movie_service');
module.exports = {
     addMovie,
     addComment,
     addRate,
     getRates,
     getComments
}
  
    
async function addMovie(req, res) {
    try {
        const getmovies = await movie_service.addMovie(req.body);
        renderResponseUtil.sendResponse(req, res, getmovies)
    } catch (error) {
        res.send(error);
    }
}       
 

async function addComment(req, res) {
    try {
        const comment = await movie_service.addComment(req.body);
        renderResponseUtil.sendResponse(req, res, comment)
    } catch (error) {
        res.send(error);
    }
}
async function addRate(req, res) {
    try {
        const rate = await movie_service.addRate(req.body);
        renderResponseUtil.sendResponse(req, res, rate)
    } catch (error) {
        res.send(error);
    }
}
async function getRates(req, res) {
    try {
        const rate = await movie_service.getRates(req.param('id'));
        renderResponseUtil.sendResponse(req, res, rate)
    } catch (error) {
        res.send(error);
    }
}
async function getComments(req, res) {
    try {
        const rate = await movie_service.getComments(req.param('id'),req.param('movieId'));
        renderResponseUtil.sendResponse(req, res, rate)
    } catch (error) {
        res.send(error);
    }
}