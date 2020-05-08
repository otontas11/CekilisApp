 
  

  // <!-- GIFT BOX SOURCE CODE: https://tympanus.net/codrops/2013/12/24/merry-christmas-with-a-bursting-gift-box/ -->
  
  function giftAnimation(){
    var merrywrap=document.getElementById("merrywrap");
    var box=merrywrap.getElementsByClassName("giftbox")[0];
    var step=1;
    var stepMinutes=[2000,2000,1000,1000];
    function init(){
           openBox();
      
    }
    function stepClass(step){
      merrywrap.className='merrywrap';
      merrywrap.className='merrywrap step-'+step;
    }
    function openBox(){
      if(step===1){
        
       box.removeEventListener("click",openBox,false); 
      }  
      stepClass(step); 
      if(step===3){ 
      } 
      if(step===4){ 
         return;
      }     
      setTimeout(openBox,stepMinutes[step-1]);
      step++;  
    }
     
    init();
   
  }
  
  // =====================
  
  $(document).ready(function(){
    setTimeout(function() {
        
      iphone.style.display='none'
    }, 2000);
    
 
      
      
      
       
      mw.style.visibility =  "visible";
      giftAnimation();
     
  })
  

  var mw = document.getElementById('merrywrap');
  var iphone=document.getElementById('iphone')
   
  