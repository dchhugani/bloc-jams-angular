(function() {
     function SongPlayer($rootScope, Fixtures) {
          var SongPlayer = {};
         
          var currentAlbum = Fixtures.getAlbum();

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
                 SongPlayer.currentSong.playing = null;
             }
             
             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });
             
             currentBuzzObject.bind('timeupdate', function() {
                 $rootScope.$apply(function() {
                     SongPlayer.currentTime = currentBuzzObject.getTime();
                 });
             });
             SongPlayer.currentSong = song;
         };                   



/**
 * @function getSongIndex
 * @desc Provides the song's index in the array songs
 * @param {Object} song  
 */     
var getSongIndex = function(song) {
     return currentAlbum.songs.indexOf(song);
 };     
         
/**       
*@desc set as Current Song 
*@type {Object}
*/         
         SongPlayer.currentSong = null;        

/**
*@function SongPlayer.currentTime
*@desc current time of song that is being played;moves as song progresses
*@type method
*/
         SongPlayer.currentTime = null;        
         
/**
*@function SongPlayer.setCurrentTime
*@desc sets current time (in seconds) of currently playing song
*@param (Number) time
*/
         SongPlayer.setCurrentTime = function(time) {
             if (currentBuzzObject) {
                 currentBuzzObject.setTime(time);
             }
         };       
         
/**
*@function SongPlayer.play
*@desc play new song when another is playing, or continue playing the currently paused song
*@type method? ***Review with Matt***
*/
         
         SongPlayer.play = function(song) {
             song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) {
             setSong(song);
             playSong(song);
             } else if (SongPlayer.currentSong === song) {
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
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
 };
         
/**
*@function SongPlayer.previous
*@desc takes currentSongIndex and subtracts one to go to previous song
*@type method? ***Review with Matt***
*/     
         
         SongPlayer.previous = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;

             if (currentSongIndex < 0) {
                 stopSong();
                 currentBuzzObject = null;
                 SongPlayer.currentSong = null;
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
             }
    };
         
         
/**
*@function SongPlayer.next
*@desc takes currentSongIndex and adds one to go to next song
*@type method? ***Review with Matt***
*/     
       
         SongPlayer.next = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex++;

             if (currentSongIndex > currentAlbum.songs.length - 1) {
                 stopSong();
                 currentBuzzObject = null;
                 SongPlayer.currentSong = null;
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
    };
         
/**
*@function stopSong
*@desc stops song from playing 
*@type {Object}
*/   
         
         var stopSong = function() {
             currentBuzzObject.stop();
             SongPlayer.currentSong.playing = null;
         };
         
         
          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();