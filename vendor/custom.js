/**
 * Created by Dan on 9/23/14.
 */


/* Extend jQuery */
(function($){
    $.expr[':'].text = function(obj, index, meta, stack){
        return ($(obj).text() === meta[3])
    };
})(jQuery);

/* End Extend jQuery */
var user;
$.ajax( "/api/teacher/user" )
    .success(function(response) {
        user = response.user;
    });

function loadView(){
    if ($(window).height()-50 > $('.main-content').height()) {
        $('#mainFooter').css({'position': 'fixed', 'bottom':0});
    }
    $('#Picker').on('shown.bs.modal', function (e) {
        $('.modal-backdrop').html("<i class='fa fa-spin fa-cog big-middle'></i>")

        $.ajax( "/api/teacher/user" )
            .fail(function() {
                alert( "You've been logged out due to inactivity" );
                window.location = '/logout';
            });
        initChooser();
    });
    courseUpdate();
    resizePage();
    $('.tooltips').tooltip();

}


/*
 jQuery Manipulation
 */
function initChooser() {
}

function validateAssignment (){
    var date = $('#date').val();
    var name = $('#assignment-name').val();
    if (
        (date != 'Date has passed') &&
        (date != 'Invalid date') &&
        (date != 'Enter Date') &&
        (date != 'Click to choose date') &&
        (name != '')
    ){
        return true;
    }
}


function showModal(){
    setTimeout( function(){
        $('#Picker').modal('show');
    },700)
}


function courseUpdate(){
    var panelList = $('.draggable');
    panelList.disableSelection();
    panelList.sortable({
        // Only make the .panel-heading child elements support dragging.
        // Omit this to make the entire <li>...</li> draggable.
        handle: '.fa-sort',
        items: "li",
        update: function(e,ui) {
            var order = panelList.sortable("toArray").join();
            $.ajax({
                url: "/api/teacher/settings/order-" + order,
                type: 'PUT',
                success: function (order) {
                    console.log(order)
                }
            });
            var mainPanels = $('ul.courses');
            var panelOrder = order.replace(/Panel/g, '');
            $.each(panelOrder.split(','), function (i, id) {
                $("#" + id).appendTo(mainPanels);

            });
        }
    });

    $.get('/api/teacher/settings/order', function(order){
        if (order.length > 1) {
            $.each(order.split(','), function (i, id) {
                var item = "#"+id;
                $(item).appendTo(panelList);
            });

            var mainPanels = $('ul.courses');
            var panelOrder = order.replace(/Panel/g, '');
            $.each(panelOrder.split(','), function (i, id) {
                $("#" + id).appendTo(mainPanels);

            });
        }
    });

}


//function resizePage(){
//    var sidebar = $('.sidebar.panel');
//    sidebar.width(sidebar.parent('div').width())
//}
//$( window ).resize(function(){
//    var sidebar = $('.sidebar.panel');
//    sidebar.width(sidebar.parent('div').width())
//});


function scrollToId(id){
    var target = ($('#'+id).offset().top)-105;
    $('html,body').animate({
        scrollTop: target
    }, 500);
}

function trackEvent(event, firstOption, firstValue, secondOption, secondValue){
    firstOption = firstOption || null;
    firstValue = firstValue || null;
    secondOption = secondOption || null;
    secondValue = secondValue || null;

    var options = {};
    options['username'] = user.email;
    if (firstOption != null) {
        options[firstOption] = firstValue;
        if (secondOption != null) {
            options[secondOption] = secondValue;
        }
    }

    //ll('tagEvent', event, options);
}

var hideKeyboard = function() {
    document.activeElement.blur();
    var inputs = document.querySelectorAll('input');
    for(var i=0; i < inputs.length; i++) {
        inputs[i].blur();
    }
};