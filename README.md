JOSIE
=====
<p style="display:inline-block;text-align:center;"><img src="img/josie.jpg"  /></p>
Josie is a simple starter single page app, written in JavaScript designed to make use of the [WordPress REST API](http://wp-api.org). It runs separately from the WordPress install and is designed to be a starting point for developing an app that uses WordPress as its back-end CMS. The goal is to create starting point for a hybrid web and mobile app.

<strong>Note:</strong> This is all very experimental and under development.</strong>

[Node](http://nodejs.om/) and [Express](http://expressjs.com/) are used to create a basic routing engine. This allows for SEO friendly permalinks.

Handlebars.js is used for templating, and methods are provided for getting posts, single posts, taxonomy terms and terms in a taxonomy. Support for managing menus in WordPress is enabled via an optional WordPress plugin. Custom post type and Pods support is planned.

Be sure to read the instructions below as there are some steps that if not followed will prevent this from working properly. Also, <strong>this is still under development</strong> use in production at your own risk.

### In Depth Tutorials
This code was written as example code for a series of articles I wrote for Torque. You can read them here:

* [Part 1: Setting Up a Node Server for a WordPress REST API-Powered Single Page Web App](http://torquemag.io/setting-node-server-json-rest-api-powered-single-page-web-app/)
* [Part 2: Preparing Your WordPress Site to Power a Single Page Web App](http://torquemag.io/preparing-wordpress-site-power-single-page-web-app/)
* Part 3 is coming soon

### Setting Up The Node Server
@TODO Use grunt for this

On a server with Node.js installed, cd into your www dir and then:

* Clone this repo:

`git clone https://github.com/Shelob9/josie.git app`

* Switch into the directory:

`cd app`

* Install Express:

`npm install express`

* Start the server

`node server`

Important: By default, the node server will not continue running indefinetly as you may be used to when using Apache or nGinx as a server for WordPress. To keep the server running, one option is to use [Forever](https://www.npmjs.org/package/forever). For more complete details, [see this article](http://www.hacksparrow.com/keep-node-js-script-running-after-logging-out-from-shell.html).

### Requirements & Recommendations For Your WordPress Site
In order to make this work, you must install the REST API Plugin in WordPress.

* [WordPress REST API](https://wordpress.org/plugins/json-rest-api/)

You must set the 'json_query_vars' filter to allow offset as a filter, also you need a [https://github.com/Shelob9/jp-menu-route](https://github.com/Shelob9/jp-menu-route)menu endpoint as well as to set cross-domain origin headers properly. Locally I made a  [plugin that does all of this for you, as well as giving you a server-side API cache and some other fun, useful things](https://github.com/Shelob9/josie-api).

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



