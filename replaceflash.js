var brand = brand || {};

/**
 * brand.collection
 * @memberOf brand
 */
brand.collection = {};


/**
 * brand.collection.initSlideshow
 * @memberOf brand.collection
 */
brand.collection.browser = function() {
    
    var rightRemainderUsed = false;
    var previousLeftMove;
    var widthRemainder = 0;
    var moveDuration = 0.1;
    
    // nodes
    var collectionContainer = $('collection-container');
    if (!collectionContainer) return false;
    var arrowLeftNode = $('collection-arrow-left');
    var arrowRightNode = $('collection-arrow-right');
    var scrollerNode = $('scroller1');
    var viewCollectionNode = $('view-collection');
    var viewCategoryCollectionNodes = $$('.view-collection-category');
    var viewImageNode = $('view-mainimage');
    var arrowLeftShowing = false;
    var arrowRightShowing = false;
    var skuCollection = $$('a.sku-button');
    
     
    
    var trackCount = 0;
       if (!arrowLeftNode || !arrowRightNode || !scrollerNode) return;

    //// attach events:
    // view collection button
    if (viewCollectionNode) {
        viewCollectionNode.observe('mousedown', function(e) {
            moveit(1);
            hideMainImage({ positionMode: 'absolute', delay: 0 });
            viewCategoryCollectionNodes.invoke('show');
            showCollection();
        });
        viewCollectionNode.observe('click', function(event) {
            event.preventDefault();
        });
    }
    
     // loops through the category names and onclick shows the prodcuts for that id and fade the products which are previously displayed.
     
    if (viewCategoryCollectionNodes) {
        viewCategoryCollectionNodes.each(function(element) {
            element.observe('click', function(e) {
                e.preventDefault();
                $('scroller1').appear({duration: 0.3, from: 1.0, to: 0.0,
                afterFinish: function() {
                    showProducts(element.id);
                }

            });

                //showProducts(element.id);
            });
        });
    }

    
    
    // view image button
    if (viewImageNode) {
        viewImageNode.observe('click', function(event) {
        
            viewCategoryCollectionNodes.invoke('hide');
            returnMain();
            
        });
    }
    
    // left arrow for slideshow
    arrowLeftNode.observe('click', function(event) {
        trackMoveLeft();
        toggleRightArrow(1);
    });
    // right arrow for slideshow
    arrowRightNode.observe('click', function(event) {
        trackMoveRight();
        toggleLeftArrow(1);
    });
    

    var mouseoverInProgress = false;
    var fadeIn = function(element) {
        new Effect.Opacity(element.firstChild.id, { from: 0.3, to: 1, duration: 0.2,
            afterFinish: function() {
            element.removeClassName('dimmed');
            }
        });    
    }
    
    var fadeOut = function(element) {
        new Effect.Opacity(element.firstChild.id, { from: 1.0, to: 0.3, duration: 0.2,
            afterFinish: function() {
                element.removeClassName('dimmed');
            }
        });    
    }


    skuCollection.invoke('observe', 'mouseover', function(event) {
        mouseoverInProgress = true;
        skuCollection.each(function(element) {
            var istarget = (event.target.id === ('img-' + element.id) ? true : false);
            if (istarget && element.hasClassName('dimmed')) {
                fadeIn(element);
            } else if (!istarget && !element.hasClassName('dimmed')) {
               new Effect.Opacity(element.firstChild.id, { from: 1.0, to: 0.3, duration: 0.2, 
                    afterFinish: function() {
                        mouseoverInProgress = false;
                        element.addClassName('dimmed');
                    }               
               });
            }
        });
        
    });

    
// on mouseout bring back the opacity
    skuCollection.invoke('observe', 'mouseout', function(event) {
        var onMouseout = function() {
            if (mouseoverInProgress) return;    
            skuCollection.each(function(element) {        
                if (event.target.id !== ('img-' + element.id)) {
                    fadeIn(element);
                }    
            });
        }    
        onMouseout.delay(0.1);
    });
    
    // set initial display state
    hideMainImage({ positionMode: 'relative', delay: 3.0 });
    new Effect.Move('scroller1', { x: -457, y: 0, mode: 'relative', delay: 3.0, duration: 1.0
    });
    
    
// show products for element that has the classname as collectionId, else hide
    function showProducts(collectionId) {
        skuCollection.each(function(element) {
            if (!(element.hasClassName(collectionId))) {
                element.hide();
            }
            else {
                fadeIn(element);
                element.show();
                element.addClassName('productToMove');
            }
        });
        
        moveElements();
        
    }
    
    
    function moveit(i){
        new Effect.Move('collection-scroller', { x: 0, y: 0, mode: 'absolute', delay: 0.0, duration: 0.0 });
        $('scroller' + i).appear({duration: 0.1, to: 1.0, speed:0});
        $('scroller' + i ).style.position = 'relative';
        $('scroller' + i ).style.left = '457px';
        new Effect.Move('scroller' + i, { x: -457, y: 0, mode: 'relative', delay: 0.1, queue:'end', 
             duration: 1.2  });
             
        trackCount = 0;
        return false;   
    }
    
    /* move each element one by one */
    
    function moveElements() {
        new Effect.Move('collection-scroller', { x: 0, y: 0, mode: 'absolute', delay: 0.0, duration: 0.0 });
        $('scroller1').appear({duration: 0.1, to: 1.0, speed:0});
        $('scroller1').style.position = 'relative';
        
        var scrollerProducts = $$('#scroller1 > table > * > tr > td > div > a.productToMove');
        
        moveEachElem(scrollerProducts, 0);
        
        trackCount = 0;
        return false;  
    }
    
    /* recursive function that helps in easing effect */
    function moveEachElem(elemArray, i) {
        if (i < elemArray.length) {
            elemArray[i].firstChild.style.left = '457px';
            elemArray[i].removeClassName('productToMove');
            new Effect.Move(elemArray[i].firstChild, { x: -457, y: 0, mode: 'relative',
                transition: Effect.Transitions.easeOutQuad, duration: 1.1+i*0.1, delay: 0.1,
                afterFinish: moveEachElem(elemArray, ++i)
            });
        }
    }
    
    function returnMain(){
        new Effect.Move('collection-scroller', { x: 0, y: 0, mode: 'absolute', delay: 0.0, duration: 0.0 });
        toggleLeftArrow(0);
        toggleRightArrow(0);
        new Effect.Move('collection-mainimage', { x: 0, y: 0, mode: 'absolute', delay: 0.0, duration: moveDuration, queue:'end' }); 
    }
    
    function hideMainImage(args){
        toggleLeftArrow(0);
        toggleRightArrow(1);
        var positionMode = args.positionMode || 'relative';
        var delay = (typeof args.delay !== "undefined" ? args.delay : 4);
        new Effect.Move('collection-mainimage', { x: -457, y: 0, mode: positionMode, delay: delay, duration: moveDuration });
    }
    
    
    function showCollection(){
        if (viewCollectionNode) viewCollectionNode.addClassName('collection-slideshow-active');
        skuCollection.each(function(element) {
        element.show();
        });

    }
    
    
    function trackMoveLeft(){
        var moveX = 150;
        if (trackCount > 0){
            if (trackCount == 1){
                moveX = (rightRemainderUsed ? widthRemainder : moveX);
                toggleLeftArrow(0);
                rightRemainderUsed = false;
            }
            new Effect.Move('collection-scroller', { x: moveX, y: 0, mode: 'relative', delay: 0.0, duration: moveDuration });
            trackCount = trackCount-1; 
            previousLeftMove = moveX;
        }
        else if (trackCount == 0)
        {
            toggleLeftArrow(0);
        }
    }
    
    function trackMoveRight(){        
        var contentWidth = document.getElementById('prod_table').offsetWidth;
        var contentTrackCount = Math.floor(contentWidth/150) - 3;
        widthRemainder = contentWidth%150;
        var moveX = -150;
        
        if (trackCount <= contentTrackCount){
            if (trackCount == contentTrackCount){
                moveX = (previousLeftMove ? (previousLeftMove * -1) : (widthRemainder * -1));
                toggleRightArrow(0);
                rightRemainderUsed = true;
            }
            new Effect.Move('collection-scroller', { x: moveX, y: 0, mode: 'relative', delay: 0.0, duration: moveDuration });
            trackCount = trackCount+1;
            previousLeftMove = null;
        }
    }
    
    function toggleLeftArrow(state){
        if (state == 1) {
            if (!arrowLeftShowing) arrowLeftNode.appear({duration: 0.1, to: 1.0, speed:0});
            arrowLeftShowing = true;
        } else {
            arrowLeftNode.hide();
            arrowLeftShowing = false;
        }
    }
    
    function toggleRightArrow(state){
        if (state == 1) {
            if (!arrowRightShowing) arrowRightNode.appear({duration: 0.1, to: 1.0, speed:0});
            arrowRightShowing = true;
        } else {
            arrowRightNode.hide();
            arrowRightShowing = false;
        }
    }
    
};


//----------for easing effect of the elements 
Effect.Transitions.easeOutQuad = function(pos){
	return -(Math.pow((pos-1), 2) -1);
}

document.observe('dom:loaded',function(){
    brand.collection.browser();
});