(function(global){
  let utils = {};

  utils.search = () => {
    $('a.search').attr("href", "search-result/áo khoác");
  }

  global.utils = utils;
})(window)