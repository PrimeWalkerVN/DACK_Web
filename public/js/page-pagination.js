(function(global){
  pp = {};

  setPaginationOnclick = () => {
    $('#page-pagination .page-item').attr('onclick', function(i, val){
      let a = $(this)[0].innerText;
      if(a != "" && a != "..."){
        return 'dc.loadMoreNew(' + a + ')';
      }
      return "";
    });
  }  
  setPaginationOnclick();

  global.pp = pp;
})(window);
