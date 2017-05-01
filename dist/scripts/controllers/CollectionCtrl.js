(function() {
     function CollectionCtrl(Fixtures) {
         this.albums = Fixtures.getCollection(12); // [albumPicasso x12]
     }

 
     angular
         .module('blocJams')
         .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
 })();