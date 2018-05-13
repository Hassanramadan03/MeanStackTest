const Commentss = require('../../models/comment');
const Movie = require('../../models/movie');
const Rate = require('../../models/rating');
const http = require('http');
const path = require('path');
const ffmpeg =  require('fluent-ffmpeg');
const fs = require('fs');
var request = require('request');
const ytdl = require('ytdl-core');
const exec = require('child-process-promise').exec;
module.exports = {
    addMovie,
    addComment,
    addRate,
    getRates, 
    getComments

}
 
 const directoryPath = path.resolve(__dirname, '../..');
const location = directoryPath + '/static/';

 
 
function getRates(userId){
    return new Promise(async (resolve, reject) => {
       try {
            const Rates=await Rate.find({userId:userId},{'createdAt':0,'userId':0,'__v':0});
            if(Rates.length>0) resolve({'message':'all rates',rates:Rates});
            else resolve({'message':'theres no rates',rates:Rates});
              
            } catch (error) {
                reject(error)
            }
        })
    }
function getComments(userId,movieId){
    return new Promise(async (resolve, reject) => {
       try {
            const comments=await Commentss.find({userId:userId,movieId:movieId});
            if(comments.length>0) resolve({'message':'comments',comments:comments});
            else resolve({'message':'theres no rates',comments:comments});
              
            } catch (error) {
                reject(error)
            }
        })
    }
function addRate(rateObj){
    return new Promise(async (resolve, reject) => {
       try {
            const movie=await Rate.find({movieId:rateObj.movieId,userId:rateObj.userId});
            console.log(movie)
            if(movie.length>0){
                console.log('Updated')

                const updatedMovie=await Rate.update({'movieId':rateObj.movieId,'userId':rateObj.userId},{rate:rateObj.rate});
                if(updatedMovie)
                resolve({'message':'Rate Successfully Updated',rate:updatedMovie});
            }else{
                console.log(rateObj.moveId)
                const _rate=new Rate({movieId:rateObj.movieId,rate:rateObj.rate,userId:rateObj.userId});
                const _rateCreated=await _rate.save();
                console.log(_rateCreated)
                console.log('Created')
                if (_rateCreated) 
                resolve({'message':'Rate Successfully Created ',rate:_rateCreated})
            }
 
              
            } catch (error) {
                reject(error)
            }
        })
    }
function addComment(commentObj){
    return new Promise(async (resolve, reject) => {
       try {
             
            const comment = new Commentss({
                comment:commentObj.comment,
                userName:commentObj.userName,
                userId:commentObj.userId,
                movieId:commentObj.movieId,
            });
             
            const _savedComment=await comment.save();
            if (_savedComment) {
                const comments=await Commentss.find({userId:commentObj.userId,movieId:commentObj.movieId});
                if (comments.length>0){
                console.log(comments)
                resolve(comments)}
            }
            
            } catch (error) {
                reject(error)
            }
        })
    }
function addMovie(_movie){
    return new Promise(async (resolve, reject) => {
       try {
              
            const movies=await Movie.find({id:_movie.id});
            
            if(false){
                  console.log(movies)
                resolve('Already Existed')
              
            }
            else {
                 const movie=new Movie(_movie)
                 const savedMovie=await movie.save();
                 console.log(`http://www.youtube.com/watch?v=${savedMovie.key}`)
                 const downloaded= ytdl('http://www.youtube.com/watch?v='+savedMovie.key)
                      .pipe(fs.createWriteStream(`${location}video${savedMovie.id}.avi`));
                if ( downloaded) {
                   const encod=await ffmpeg(location+'input.avi').videoCodec('libx264');
                    if(encod)
                        resolve('Successfully downloaded and encoded')
                }    
            }}
     catch (error) {
                reject(error)
            }
        })
    }


 