(function() {
     function SongPlayer() {
          var SongPlayer = {};

/**       
*@function playSong
*@desc plays current song when it is paused
*@type {Object}
*/         

var playSong = function(song) {
    currentBuzzObject.play();
    song.playing = true;
}
         
/**       
*@desc set as Current Song 
*@type {Object}
*/         
var currentSong = null;
         
/**
 * @desc Buzz object audio file
 * @type {Object}
 */
         
var currentBuzzObject = null;

 /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */       
        
var setSong = function(song) {
    if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
    }

currentBuzzObject = new buzz.sound(song.audioUrl, {
    formats: ['mp3'],
    preload: true
});

currentSong = song;
};                   

         
/**
*@function SongPlayer.play
*@desc play new song when another is playing, or continue playing the currently paused song
*@type method? ***Review with Matt***
*/
         
         SongPlayer.play = function(song) {
             
             if (currentSong !== song) {
             setSong(song);
             playSong(song);
             } else if (currentSong === song) {
         if (currentBuzzObject.isPaused()) {
             currentBuzzObject.play();
         }
     }              
             
 };

/**
*@function SongPlayer.pause
*@desc pause song pause button is clicked
*@type method? ***Review with Matt***
*/
         
        SongPlayer.pause = function(song) {
     currentBuzzObject.pause();
     song.playing = false;
 };
         
        
         
          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();