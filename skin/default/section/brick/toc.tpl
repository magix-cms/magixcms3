<div class="dropdown toc-drop">
    <button class="btn btn-link dropdown-toggle" type="button" data-toggle="dropdown">
        <i class="material-icons">toc</i>
    </button>
    <div class="dropdown-menu">
        {if $root}
            <div class="dropdown-header">
                <a class="btn btn-link" href="{$root.url}" title="{$root.title}">{$root.title}</a>
            </div>
        {/if}
        <ul class="dropdown-menu">
            {include file="section/loop/toc.tpl"}
        </ul>
    </div>
</div>