

    //General

    var size = 5;
    var currentItem = 0;

        $(function () {



            // News details


            if (window.location.href.indexOf('?') > -1 && window.location.href.slice(window.location.href.indexOf('?') + 1).split("=")[0] == 'newsId') {
        $('.nav-icon').hide();
                $('.back-icon').show();
                var newsId = window.location.href.slice(window.location.href.indexOf('?') + 1).split("=")[1];


                $.getJSON("data.json").done( function (result) {
        $('.loading-div').show();
                    loadMenu(result);

                    $.each(result.news, function (i, item) {


                        if (item.id == newsId) {
                            var options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                            var newsDate = new Date(item.date);


                            $('#data').append('<div class="col-12 px-0"><div class="h-100"> <img onerror="replaceImage($(this))" src="' + item.coverImage + '" class="card-img-top" alt="' + item.title + '"> <div class="card-body inner-card-body"> <div class="copyrights">' + item.copyrights + '</div><h5 class="card-title">' + item.title + '</h5><div class="date"><small>' + newsDate.toLocaleDateString("ar-OM", options) + '</small></div> <div class="card-text">' + item.bodyText + '</div > </div > </div ></div >');
                            return false;
                        }
                        setTimeout(function () {$('.loading-div').hide(); }, 3000);


                    });
                }).fail(function () {
            $('#data').append('<div class="col-12 px-0"> يوجد خطأ في العملية</div>');
                }).always(function () {$('.loading-div').hide();});

            }
            // Iframe embed
            else if (window.location.href.indexOf('?') > -1 && window.location.href.slice(window.location.href.indexOf('?') + 1).split("?")[0] == 'videos') {
            $('.nav-icon').hide();
                $('.back-icon').show();
                loadIframeCards();

            }
            else {
            // Homepage
            $('.nav-icon').hide();
                $('.refresh-icon').show();
                loadNewsCards();
            }
        });



        function loadMenu(result) {

            $('#menu li').remove();
            $.each(result.menus, function (i, item) {

                if (item.bodyText.length > 3) {
            $('#menu').append('<li>' + item.bodyText + '</li>');
                }
                else {
            $('#menu').append('<li><a href="' + item.link + '" title="' + item.tags + '">' + item.title + '</a></li>');
                }


            });
        }



        function replaceImage(item) {
            item.attr('src', '/default.jpg')
        }

        // Infinite scroll
        $(window).bind('load', function () {
            if (window.location.href.slice(window.location.href.indexOf('?') + 1).split("?")[0] == 'videos' || window.location.href.indexOf('?') < 0) {

            $(window).scroll(function () {

                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
                    if (window.location.href.slice(window.location.href.indexOf('?') + 1).split("?")[0] == 'videos') {
                        loadIframeCards();
                    }
                    else {
                        loadNewsCards();
                    }

                }
            });
            }
        });

        function loadIframeCards() {
            if (!$('.upToDate').length) {
            $('.loading-div').show();
                $.getJSON("data.json").done(function (result) {
            loadMenu(result);
                    if (currentItem >= result.videos.length) {
            $("#data").append('<div class="col-12 mt-4 upToDate text-center">لا يوجد المزيد من المقاطع</div>');
                    }
                    $.each(result.videos, function (i, item) {

                        if (i < currentItem) { return true; }

                        $('#data').append('<div class="col-12 mt-4"><div class="card home-card h-100">' + item.bodyText + '<div class="card-body"> <h5 class="card-title mb-0">' + item.title + '</h5></div > </div ></div >');

                        currentItem++;
                        if (currentItem >= size) {
            size += currentItem;
                            return false;
                        }
                    });

                }).fail(function () {
            $('#data').append('<div class="col-12 px-0"> يوجد خطأ في العملية</div>');
                }).always(function () {setTimeout(function () { $('.loading-div').hide(); }, 3000)});

            }
        }
        function loadNewsCards() {
            if (!$('.upToDate').length) {
            $('.loading-div').show();
                $.getJSON("data.json").done(function (result) {
            loadMenu(result);
                    if (currentItem >= result.news.length) {
            $("#data").append('<div class="col-12 mt-4 upToDate text-center">لا يوجد المزيد من الأخبار</div>');
                    }
                    $.each(result.news, function (i, item) {

                        if (i < currentItem) { return true; }

                        $('#data').append('<div class="col-12 mt-4"><a href="index.html?newsId=' + item.id + '" class="card home-card h-100"> <img src="' + item.coverImage + '" class="card-img-top" alt="' + item.title + ' " onerror="replaceImage($(this))"> <div class="card-body"> <h5 class="card-title">' + item.title + '</h5> <p class="card-text">' + item.summary.substring(0, 100) + '...</p ></div > </a ></div >');

                        currentItem++;
                        if (currentItem >= size) {
                size += currentItem;
                            return false;
                        }
                    });

                }).fail(function () {
                $('#data').append('<div class="col-12 px-0"> يوجد خطأ في العملية</div>');
                }).always(function () {setTimeout(function () { $('.loading-div').hide(); }, 3000)});
;
            }
        }

    
    
            $(function () {
                $('#sidebarCollapse').on('click', function () {
                    $('#sidebar').toggleClass('active');
                });
        });
    