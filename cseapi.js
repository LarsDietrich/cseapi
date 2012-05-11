$(function () {
    'use strict';

    var Result = (function () {

        return {

            get: function (query) {

                var url = 'https://www.googleapis.com/customsearch/v1?' +
                          'key=AIzaSyB4iAuQnynNx_a0jRqusBFwRZwW410qkoI&' +
                          'cx=017576662512468239146:omuauf_lfve' +
                          '&callback=?' + '&q=' + query;

                $.getJSON(url, function (data) {

                    var items = data.items;

                    $(window).trigger('Result.get', [items]);

                });
            }

        };
    }());

    var SERPBox = (function () {

        var box = $('.serpbox');

        return {

            render: function (items) {

                var i = items[0];
                box.html(i.title + '<br/>'+ i.link + '<br/>' +i.snippet).hide().fadeIn(250);

            }

        };
    }());



    $(document).ready(function () {

        var form = $('.searchbox');
        var input = $('.searchbox input');
        var button = $('.searchbox button');

        form.submit(function (e) {
            e.preventDefault();

            var query = input.val();
            if (query === '') return;

            Result.get(query);
        });

        $(window).bind('Result.get', function (e, items) {
            SERPBox.render(items);
        });


    });

});
