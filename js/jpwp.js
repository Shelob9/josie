jQuery( function () {
    JPWP.init( paramsJPWP );
} );

(function ( $, app ) {

    /**
     * Bootstrap
     */
    app.init = function( params ) {
       app.params = params;
        app.menuItems( params.mainMenuName, params.mainMenuContainer );
    };

    app.routeEvent = function( ) {

        var hash = window.location.hash.replace(/^.*?#/,'');
        console.log( hash );
        if ( hash == '' || hash == '#' || hash == 'page=1') {
            app.getPosts( 0 );
            app.pagination( 1 );
        }
        else if ( hash.indexOf("page") > -1 ) {
            var offset = hash.split("page=");

            app.getPosts( offset[1] );
        }
        else if ( hash.indexOf("taxonomy") > -1 ) {
            if ( hash.indexOf("page") > -1 ) {
                var offset = hash.split("page=");
            }
            else {
                offset = 0;
            }
            var taxonomySplit = hash.split( 'taxonomy=');

            if ( hash.indexOf( '&term=') > -1 ) {
                var termSplit = hash.split( '&term=');

                var term = termSplit[1];
                var taxonomySplit2 = taxonomySplit[1].split( '&');
                var taxonomy = taxonomySplit2[0];
                if ( taxonomy == 'category' ) {
                    taxonomy = 'category_name';
                }

            }else{
                var term = 0;
                var taxonomy = taxonomySplit[1];

            }



            if ( term == 0 ) {
                app.listTerms( taxonomy );
            }
            else {
                app.term( taxonomy, term, offset );

            }
        }
        else if ( hash > 0 ) {
            app.getSinglePost( hash );
        }
    };


    app.getPosts  = function( offset ) {
        var postsURL = app.params.rootURL + '/posts?filter[posts_per_page]=' +app.params.postsPerPage;
        if ( undefined != offset && 0 != offset ) {
            var nextPosts = offset * app.params.postsPerPage;
            postsURL += '&filter[offset]=' + nextPosts;

        }
        else {
            var offset = 1;
        }


        $.ajax({
            type: 'GET',
            url: postsURL,
            dataType: 'json',
            success: function(posts){
                app.emptyContainer();
                $(app.params.mainContainer).fadeIn();
                $.each( posts, function(index, post) {
                    var source = $('#posts').html();
                    var template = Handlebars.compile(source);
                    var html = template(post);

                    $(app.params.mainContainer).append(html);


                });

                app.pagination( offset );
            },
            error: function(error){
                console.log(error);
            }

        });
    };

    app.getSinglePost = function( ID ) {

        $.ajax({
            type: 'GET',
            url: app.params.rootURL + '/posts/' + ID,
            dataType: 'json',
            success: function(post) {

                app.emptyContainer();
                var source = $('#post').html();
                var template = Handlebars.compile(source);
                var html = template(post);

                $(app.params.mainContainer).append(html).fadeIn();

            },
            error: function(error){
                console.log(error);
            }

        });

    };



    app.listTerms = function( taxonomy ) {
        $.ajax({
            type: 'GET',
            url: app.params.rootURL + '/taxonomies/' + taxonomy + '/terms',
            dataType: 'json',
            success: function(terms){
                console.log( terms );


                $.each( terms, function(index, term) {
                    app.emptyContainer();
                    term.taxonomy = taxonomy;
                    var source = $('#terms').html();
                    var template = Handlebars.compile(source);
                    var html = template(term);
                    $(app.params.mainContainer).append(html).fadeIn();
                });

            },
            error: function(error){
                console.log(error);
            }

        });
    };

    app.term =function( taxonomy, slug, offset ) {
        $.ajax({
            type: 'GET',
            url: app.params.rootURL + '/posts?filter[' + taxonomy + ']=' + slug,
            dataType: 'json',
            success: function(posts){
                app.emptyContainer();
                $(app.params.mainContainer).fadeIn();
                $.each( posts, function(index, post) {
                    var source = $('#posts').html();
                    var template = Handlebars.compile(source);
                    var html = template(post);

                    $(app.params.mainContainer).append(html).fadeIn();
                    if ( undefined == offset ) {
                        offset = 1;
                    }

                });

            },
            error: function(error){
                console.log(error);
            }

        });
    };

    app.pagination = function( current ) {
        var currentPage = parseInt( current );
        var next = currentPage;
        next += 1;
        var html = '<div id="pagination">';
        html += '<a href="#page='+next+'">Next Page</a>';
        if ( current > 1 ) {
            var previous = currentPage;
            previous -= 1;
            html += '<a href="#page='+previous+'">Previous Page</a>';
        }
        html += '</div>';


        $(app.params.mainContainer).append(html);
    };

    app.menuItems = function( menuName, menuContainer ) {
        $.ajax({
            type: 'GET',
            url: app.params.rootURL + '/jpwp/menus/' + menuName,
            dataType: 'json',
            success: function(items){

                $.each( items, function(index, item) {
                    if ( item.object == 'post' || item.object == 'page') {
                        $(menuContainer).append(
                            '<li>' +
                                '<a href="#' + item.ID + '">' + item.title + '</a>' +
                            '</li>'
                        );
                    } else if ( item.object == 'category' || item.object == 'tag' ) {
                        $(menuContainer).append(
                            '<li>' +
                             '<a href="#taxonomy=' + item.object + '&term=' + item.title + '">' + item.title + '</a>' +
                            '</li>'
                        );
                    }
                    else if ( item.object == 'custom' ) {
                        $(menuContainer).append(
                            '<li>' +
                                '<a href="'+item.url +'">' + item.title + '</a>' +
                            '</li>'
                        );
                    }

                });

            },
            error: function(error){
                console.log(error);
            }

        });
    };

    app.emptyContainer = function() {
        $( app.params.mainContainer).fadeOut().empty();
    };


})( jQuery, window.JPWP || ( window.JPWP = {} ) );


$( document ).ready(function() {
    JPWP.routeEvent();
    /**
     * Date Format
     * Converts UNIX Epoch time to DD.MM.YY
     * 1343691442862 -> 31.07.12
     * Usage: {{dateFormat yourDate}}
     *
     * @source https://github.com/clintioo/handlebars-date-helpers/blob/master/handlebars-helpers.1.0.0.js
     * @license DWETFUW
     */
    Handlebars.registerHelper('dateFormat', function(context) {
        var date = new Date(context),
            day = date.getDate(),
            month = date.getMonth() + 1,
            year = String(date.getFullYear()).substr(2,3);
        return (day < 10 ? '0' : '') + day + '.' + (month < 10 ? '0' : '') + month + '.' + year;
    });
});


Handlebars.registerHelper('categories', function(items, options) {
    var out = "Categories: <ul class='post-categories inline-list'>";

    for(var i=0, l=items.length; i<l; i++) {
        var slug = items[i].slug;
        out = out + "<li><a href='#taxonomy=category&term="+slug+"'>" + options.fn(items[i]) + "</a></li>";

    }

    return out + "</ul>";
});

$(window).on('hashchange', JPWP.routeEvent);

$(document).foundation();
