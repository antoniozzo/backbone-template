## Backbone Template

### Install

	cd "path/to/public/dir"
	npm install 				// install node modules
	bower install 				// install bower components
	grunt						// start grunt watch task

### Build

	chmod +x build/build.sh
	build/build.sh

### Include the main script
	
	<script type="text/javascript" data-main="dist/js/main.js" src="src/js/vendor/requirejs/require.js"></script>
    
### Include stylesheet links

    <link rel="stylesheet" type="text/css" href="dist/css/app.min.css">
    <!--[if lt IE 9]><link rel="stylesheet" type="text/css" href="dist/css/app.ie.css"><![endif]-->