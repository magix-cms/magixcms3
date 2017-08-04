{extends file="layout.tpl"}
{block name='head:title'}{#edit_product#|ucfirst}{/block}
{block name='body:id'}catalog-product{/block}

{block name='article:header'}
    <h1 class="h2"><a href="{$smarty.server.SCRIPT_NAME}?controller={$smarty.get.controller}" title="Afficher la liste des produits">{#catalog_product#|ucfirst}</a></h1>
{/block}
{block name='article:content'}
    {if {employee_access type="edit" class_name=$cClass} eq 1}
    <div class="panels row">
        <section class="panel col-xs-12 col-md-12">
            {if $debug}
                {$debug}
            {/if}
            <header class="panel-header panel-nav">
                <h2 class="panel-heading h5">{#edit_product#|ucfirst}</h2>
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active"><a href="#general" aria-controls="general" role="tab" data-toggle="tab">{#text#}</a></li>
                    <li role="presentation"><a href="#images" aria-controls="images" role="tab" data-toggle="tab">{#images#}</a></li>
                    {*<li role="presentation"><a href="#images" aria-controls="images" role="tab" data-toggle="tab">{#images#}</a></li>*}
                </ul>
            </header>
            <div class="panel-body panel-body-form">
                <div class="mc-message-container clearfix">
                    <div class="mc-message"></div>
                </div>
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="general">
                        {include file="catalog/product/form/edit.tpl" controller="product"}
                    </div>
                    <div role="tabpanel" class="tab-pane" id="images">
                        {*<pre>{$images|print_r}</pre>*}
                        {include file="catalog/product/form/img.tpl" controller="product"}
                        <div class="block-img">
                            {if $images != null}
                                {include file="catalog/product/brick/img.tpl"}
                            {/if}
                        </div>
                    </div>
                </div>
                {*<pre>{$page|print_r}</pre>*}
            </div>
        </section>
    </div>
    {/if}
{/block}
{block name="foot" append}
    {include file="section/footer/editor.tpl"}
    {capture name="scriptForm"}{strip}
        /{baseadmin}/min/?f=
        libjs/vendor/progressBar.min.js,
        {baseadmin}/template/js/product.min.js
    {/strip}{/capture}
    {script src=$smarty.capture.scriptForm type="javascript"}

    <script type="text/javascript">
        $(function(){
            if (typeof product == "undefined")
            {
                console.log("product is not defined");
            }else{
                var controller = "{$smarty.server.SCRIPT_NAME}?controller={$smarty.get.controller}";
                product.run(controller);
            }
        });
    </script>
{/block}