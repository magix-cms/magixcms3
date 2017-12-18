{extends file="layout.tpl"}
{block name='body:id'}about{/block}
{block name="title"}{if $pages.name}{$pages.title = $pages.name}{/if}{if $pages.seoTitle}{$pages.seoTitle}{else}{$pages.title}{/if}{/block}
{block name="description"}{if $pages.seoTitle}{$pages.seoDescr}{elseif !empty($pages.content)}{$pages.content|truncate:100:'...'}{/if}{/block}
{block name="webType"}{if isset($parent)}WebPage{else}AboutPage{/if}{/block}
{block name='article'}
    <article class="container cms" id="article" itemprop="mainContentOfPage" itemscope itemtype="http://schema.org/WebPageElement">
        {block name='article:content'}
            {if $pages.name}{$pages.title = $pages.name}{/if}
            <header>
                {widget_about_data
                    conf = [
                        'context' => 'all'
                        ]
                    assign="aboutPages"
                }
                {include file="section/brick/toc.tpl" pages=$aboutPages root=['url' => "{geturl}/{getlang}/about/","title" => $root.name]}
                <h1 itemprop="name">{$pages.title}</h1>
            </header>
            {if $pages.date.register}<time datetime="{$pages.date.register}" itemprop="datePublished"></time>{/if}
            {if $pages.date.update}<time datetime="{$pages.date.update}" itemprop="dateModified"></time>{/if}
            <div class="content">
                <div itemprop="text">
                    {$pages.content}
                </div>
            </div>
        {/block}
    </article>
{/block}