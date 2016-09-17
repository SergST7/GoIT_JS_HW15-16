/**
 * Created by SergST on 15.09.2016.
 */
'use strict';


$(function () {

  var count = 1;

  $('.start').click(function () {

    var searchStr = $('#search').val();


    $.ajax({
      url: 'https://www.googleapis.com/customsearch/v1?key=AIzaSyAyMONPDO7l3sxN0kDoVtfq1w_' +
      'lW2fGQeY&cx=000629323765220375184:kukq2rjqi8q&q='+searchStr+'&start='+count,

      error:function (e) {
        console.log(e);
        alert('Сервер  не отвечает')},

      success:function(data){
        console.log(data);
        
        render('#resultTmpl', data,'.wrapper-search');
        count += 10;
      }
    });

  });

  function tmplUrl(data){
    var tmpl = _.template(data.url.template);
    var str = tmpl(data.queries.nextPage);
    console.log(str);
    console.log(data.queries.nextPage);
  }

  function render(id, obj, parent) {
    var tmpl = _.template($(id).html());
    var result = tmpl(obj);
    $(parent).append(result);
  }

});

