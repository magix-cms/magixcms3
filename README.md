# [Magix cms 3](http://www.magix-cms.com/)
Magix CMS dans sa version 3, incluant une nouvelle librairie et de nouvelles fonctionnalités.

![logo-magix_cms](https://user-images.githubusercontent.com/356674/31891050-82862b34-b805-11e7-9d10-84066a7474dc.png)

### License

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0) 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
### version 

[![release](https://img.shields.io/github/release/magix-cms/magixcms-3.svg)](https://github.com/magix-cms/magixcms-3/releases/latest)

## Note
    N'utilisez pas la version de ce dépôt pour autre chose que vos propres tests,
    la dernière version stable sur le site est optimisé pour la mise en production.
    
## Authors
-------

 * Gerits Aurelien (Author-Developer) aurelien[at]magix-cms[point]com
    * [magixcms](http://www.magix-cms.com)
    * [Github Aurelien Gerits](https://github.com/gtraxx/)
    * [Magepattern](https://github.com/gtraxx/magepattern)

## Contributors

 * Disalvo Salvatore (http://www.disalvo-infographiste.be)
 
Ressources
-----
 * https://github.com/Xarksass/CenterColumns
 * https://github.com/gtraxx/tinymce-plugin-youtube
 * https://github.com/gtraxx/jimagine
 * https://github.com/trippo/ResponsiveFilemanager
 * http://www.tinymce.com/
 * http://getbootstrap.com/
 * http://www.smarty.net
 * https://github.com/gtraxx/magepattern
 
Requirements
------------

### Server
 * APACHE / IIS / NGINX
     * Le serveur doit avoir la réécriture d'url activé pour fonctionner (rewrite_mod).
 * PHP 5.5 et plus
     * GD activé
     * SPL
     * SimpleXML et XML READER
     * PDO
 * MYSQL

##### Note: Pour utiliser Magix CMS avec PHP 5.6 et plus
<pre>
error_reporting = E_ALL & ~E_NOTICE & ~E_DEPRECATED & ~E_STRICT
</pre>
##### Note: Magix CMS 3.x.x est optimisé pour PHP 7 !!

## Watchers PHP STORM
#### Script Plugins
<pre>
file:plugins/*/js/src/*.js
</pre>
#### Plugin Style
<pre>
file:plugins/*/css/src/*.less
</pre>

#### AMP
<pre>
file:skin/*/amp/css/less//*
</pre>

#### Mobile
<pre>
(file:skin/*/css/font-awesome/less//*||file:skin/*/css/bootstrap/less//*||file:skin/*/css/src/less//*)&&!file:skin/*/css/src/less/tablet//*&&!file:skin/*/css/src/less/tablet.less&&!file:skin/*/css/src/less/desktop//*&&!file:skin/*/css/src/less/desktop.less
</pre>

#### Tablet
<pre>
(file:skin/*/css/font-awesome/less//*||file:skin/*/css/bootstrap/less//*||file:skin/*/css/src/less//*)&&!file:skin/*/css/src/less/desktop//*&&!file:skin/*/css/src/less/desktop.less
</pre>

#### Desktop
<pre>
file:skin/*/css/font-awesome/less//*||file:skin/*/css/bootstrap/less//*||file:skin/*/css/src/less//*
</pre>

#### Script
<pre>
file:skin/*/js/src/*.js
</pre>

#### Script Vendors
<pre>
file:skin/*/js/vendor/src/*.js
</pre>