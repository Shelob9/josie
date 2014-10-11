JOSIE
=====
<p style="display:inline-block;text-align:center;"><img src="img/josie.jpg"  /></p>
Josie is a simple starter single page app written in JavaScript designed to make use of the [WordPress REST API](http://wp-api.org). It runs separately from the WordPress install and is designed to be a starting point for developing an app that uses WordPress as its back-end CMS.

Handlebars.js is used for templating, and methods are provided for getting posts, single posts, taxonomy terms and terms in a taxonomy. Support for managing menus in WordPress is enabled via an optional WordPress plugin. Custom post type and Pods support is planned.

Be sure to read the instructions below as there are some steps that if not followed will prevent this from working properly.

### Requirements & Recommendations For Your WordPress Site
##### Required WordPress Setup
In order to make this work, you must install the REST API Plugin in WordPress.

* [WordPress REST API](https://wordpress.org/plugins/json-rest-api/)

In addition you must address the cross origin request issues (CORS) that will prevent this from working. You can add an Access-Control-Allow-Origin header to JSON requests only by doing something like this in a plugin on your WordPress site:

```php
    add_filter( 'json_serve_request',
        function() {
            header( "Access-Control-Allow-Origin: *" );
        }
    );
    
```

##### Recommended Plugin
This app uses a custom endpoint in the REST API to get WordPress menu items. You must either activate it on your site, or hack your own menu in.

@TODO LINK.

##### Recommended Additional WordPress Setup

You may wish to set a specific domain to allow, instead of allowing all domains.

By default, since this app does not do any authentication, the posts_per_page and offset arguments of its requests will be ignored. As a result, you will only be able to get the first page of results and the number of posts will be what is set in your WordPress settings. Alternatively, you may open up these arguments <em>for all non-authenticated users</em>, by adding this to a plugin on your WordPress site:

```php
    add_filter( 'json_query_vars',
        function ( $valid_vars ) {
            $valid_vars = array_merge( $valid_vars, array( 'posts_per_page', 'offset' ) );
            return $valid_vars;
        }
    );
```

Alone, this hook/function is a potential security risk if you have lots of posts as requesting too many posts at once could DDOS you. It is <em>strongly recommended</em> that you limit the number of posts per page that can be returned, like this:

```php
    add_filter( 'json_query_var-posts_per_page',
        function( $posts_per_page ) {
    
            if ( 20 < intval( $posts_per_page )  ) {
                $posts_per_page = 20 ;
            }
    
            return $posts_per_page;
    
        }
    );
```

### Setting Up The App
In index.html, configuration options are set in the object params, which must be added to the window scope after it is defined. The object must have 6 indexes, as follows:

* rootURL - The URL for the WordPress REST API. Typically this is your url /wp-json, but it can be changed with a filter.
* siteTitle - The name of the app/site.
* postsPerPage - Number of posts to show per page.
* mainContainer - The container to populate post data into. If using index.html as is, use "#main".
* mainMenuContainer - The container to populate the menu into. If using index.html as is, use "#main-menu"
* mainMenuName - The name of the menu, set in the WordPress menu editor to get items from. Set to false to not use or if you have not added the menu endpoint.

Everything should basically work as is. If you get nothing in the index check the console. You must likely are getting a 404 error on the AJAX requests and need to correct your URLs. You may also be getting a cross-origin error, which means you didn't read the last section or set up the Access-Control-Allow-Origin header wrong.

### License, Copyright etc.
Copyright 2014  [Josh Pollock](http://JoshPress.net)

Licensed under the terms of the [GNU General Public License version 2](http://www.gnu.org/licenses/gpl-2.0.html) or later. Please share with your neighbor.

Includes the following MIT licensed libraries:
* Handlebars.js
* Foundation
* Fastclick
* jQuery
* Modernizer



