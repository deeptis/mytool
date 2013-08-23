
    
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
    
    function hideMainImage(args){
        toggleLeftArrow(0);
        toggleRightArrow(1);
        var positionMode = args.positionMode || 'relative';
        var delay = (typeof args.delay !== "undefined" ? args.delay : 4);
        new Effect.Move('collection-mainimage', { x: -457, y: 0, mode: positionMode, delay: delay, duration: moveDuration });
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

