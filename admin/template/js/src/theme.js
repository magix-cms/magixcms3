var theme = (function ($, undefined) {
    function UpdateSkin(controller,btnData){
        $(document).on("click",'.skin-select', function(event){
            event.preventDefault();
            var self = $(this);
            var skin = self.data("skin");
            if(skin != null){
                $.jmRequest({
                    handler: "ajax",
                    url: controller+'&action=edit',
                    method: 'POST',
                    data: { 'theme': skin,'type': 'theme' },
                    resetForm:false,
                    beforeSend:function(){},
                    success:function(data) {
                        $.jmRequest.initbox(data.notify, {
                            display: false
                        });
                        $('.skin-select').text(btnData[0]);
                        $('.skin-select.btn-fr-theme').removeClass('btn-fr-theme').addClass('btn-default');
                        if (self.hasClass('btn-default')) {
                            self.removeClass('btn-default').addClass('btn-fr-theme').text(btnData[1]);
                        }

                    }
                });
                return false;
            }
        });
    }

    function initSortable() {
        $( ".sortable" ).sortable({
            items: "> li",
            handle: "header .fa-arrows",
            cursor: "move",
            placeholder: "list-group-item list-group-item-default",
            update: function(){
                var serial = $( ".sortable" ).sortable('serialize', { key: "order[]" });
                $.jmRequest({
                    handler: "ajax",
                    url: '/admin/index.php?controller=theme&action=order',
                    method: 'POST',
                    data : serial,
                    success:function(e){
                        $.jmRequest.initbox(e,{
                                display: false
                            }
                        );
                    }
                });
            }
        }).disableSelection();
    }

    return {
        run: function (controller, btnData) {
            UpdateSkin(controller,btnData);
            initSortable();
        }
    }
})(jQuery);