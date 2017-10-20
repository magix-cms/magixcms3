{strip}
    {if isset($data.id)}
        {$data = [$data]}
    {/if}
    {if !isset($truncate)}
        {$truncate = 150}
    {/if}
{/strip}
{if is_array($data) && !empty($data)}
    {foreach $data as $item}
        <div{if $classCol} class="{$classCol}{/if}" itemprop="itemListElement" itemscope itemtype="http://schema.org/CreativeWork">
            <link itemprop="additionalType" href="http://schema.org/Article" />
            <meta itemprop="position" content="{$item@index + 1}">
            <div class="figure">
                <div class="time-figure">
                    {if $item.imgSrc.medium}
                        <amp-img src="{$item.imgSrc.large}"
                                 alt="{$item.title}"
                                 title="{$item.title}"
                                 layout="responsive"
                                 width="500"
                                 height="309" itemprop="image"></amp-img>
                    {else}
                        <amp-img src="{$item.imgSrc.default}"
                                 alt="{$item.title}"
                                 title="{$item.title}"
                                 layout="responsive"
                                 width="500"
                                 height="309"></amp-img>
                    {/if}
                    <div class="time-published">
                        <time itemprop="datePublished" datetime="{$item.date.publish}">{*$item.date.publish|date_format:"%e / %m / %Y"*}</time>
                        <p>{$item.date.publish|date_format:"%A"}</p>
                        <p class="tday">{$item.date.publish|date_format:"%e"}</p>
                        <p>{$item.date.publish|date_format:"%B %Y"}</p>
                    </div>
                </div>
                <div itemprop="description" class="desc">
                    <h2 itemprop="name">{$item.title|ucfirst}</h2>
                    {if $item.resume}
                        <p>{$item.resume|truncate:$truncate:'...'}</p>
                    {elseif $item.content}
                        <p>{$item.content|strip_tags|truncate:$truncate:'...'}</p>
                    {/if}
                    {strip}
                        {if !empty($item.tags)}
                            <p class="tag-list">
                                {$nbt = $item.tags|count}
                                <span class="fa fa-tag{if $nbt > 1}s{/if}"></span>
                                {foreach $item.tags as $tag}
                                    <span itemprop="about"><a href="{$tag.url}" title="{#see_more_news_about#} {$tag.name|ucfirst}">{$tag.name}</a></span>
                                    {if !$tag@last}, {/if}
                                {/foreach}
                            </p>
                        {/if}
                    {/strip}
                </div>
                <a class="all-hover" href="{$item.url}" title="{$item.title|ucfirst}" itemprop="url">{$item.title|ucfirst}</a>
            </div>
        </div>
    {/foreach}
{/if}