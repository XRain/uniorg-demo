$(function () {
    if (window.page.name !== 'events-search') {
        return false;
    }
    var form = $('#event-search-filters');
    
    form.on('submit', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        $.ajax({
            url: form.attr('action'),
            data: form.serialize(),
            dataType: 'JSON',
            success: function(data) {
                console.log(data)
                $('#search-results').html(window.templates.events_search_list({options: data.page.searchResult}));
            },
            error: function (err) {
                $('#search-results').html('<p class="message">Service not available.</p>');
            }
        });
    });
    $(document).on('emptyinput', function () {
        form.submit();
    });
    
    $('#evt-search').on('click', function () {
        if ($(this).hasClass('active')) {
            form.submit();
        }
    });

    $(document).on('click', '.filter-button:not(".filter-button_active")', function () {
        var pressedButton = $(this);

        $('.filter-button').removeClass('filter-button_active');
        pressedButton.addClass('filter-button_active');
        $('input[name="sort"]').val(pressedButton.attr('id').replace(/^evt-sort-/, ''));
        form.submit();
        return false;
    });


});
