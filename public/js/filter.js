// // const express = require('express');
// const express = require("express");
// let app = express();
// app.use(express.static('views'));
(function(global){
  let dc = {};

  let productsDbUrl = "https://still-plateau-02404.herokuapp.com/products";
  let categorySingleProductHtmlUrl = '/snippets/category-single-product.html';

  insertHtml = (querySelector, htmlToInsert) => {
    let tmp = document.querySelector(querySelector);
    tmp.innerHTML = htmlToInsert;
  }

  insertProperty = (snippet, key, value) => {
    var pattern = "{{" + key + "}}";
    snippet = snippet.replace(new RegExp(pattern, "g"), value);
    return snippet;
  }

  dc.showProducts = function(){
    ajaxUtils.sendGetRequest(productsDbUrl, buildProductsView, true);
  }


  /**
   * What we will do here is replacing all the place holders with the values of the received json response
   * by creating a right code snippet
   * then add it to the right place in the document
   * see line 260 of category.html
   */
  buildProductsView = (productsJSON) => {
    ajaxUtils.sendGetRequest(categorySingleProductHtmlUrl, (categorySingleProductHtml) => {
      let finalHtml = "";

      /**
       * Deal with the filter condition 
       */
      for(let i = 0; i<12; i++){
        let s = categorySingleProductHtml;

        s = insertProperty(s, "title", productsJSON[i].title);
        s = insertProperty(s, "price", productsJSON[i].price);
        s = insertProperty(s, "imagePath", productsJSON[i].imagePath);

        finalHtml += s;
        finalHtml += '\n';

        console.log(s);
      }

      insertHtml("#category-single-product-section", finalHtml);
    }, false);
  }



  dc.showProductsAoKhoac = function(){
    ajaxUtils.sendGetRequest(productsDbUrl, buildProductsViewAoKhoac, true);
  }

  buildProductsViewAoKhoac = (productsJSON) => {
    ajaxUtils.sendGetRequest(categorySingleProductHtmlUrl, (categorySingleProductHtml) => {
      let finalHtml = "";

      /**
       * Deal with the filter condition 
       */
      for(let i = 0; i<productsJSON.length; i++){
        if(productsJSON[i].typeProduct == "Áo khoác"){
          let s = categorySingleProductHtml;

          s = insertProperty(s, "title", productsJSON[i].title);
          s = insertProperty(s, "price", productsJSON[i].price);
          s = insertProperty(s, "imagePath", productsJSON[i].imagePath);

          finalHtml += s;
          finalHtml += '\n';

          console.log(s);
        }
      }
      insertHtml("#category-single-product-section", finalHtml);
    }, false);
  }



  global.dc = dc;
})(window);