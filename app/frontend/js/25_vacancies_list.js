$(function () {
    if (window.page.name !== 'vacancies') {
        return false;
    }

    var form = $('#vacancy-search-filters');

    form.on('submit', function(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        $.ajax({
            url: form.attr('action'),
            data: form.serialize(),
            dataType: 'JSON',
            success: function(data) {
                $('#search-results').html(window.templates.vacancies_list({options: data.page.searchResult}));
            },
            error: function (err) {
                $('#search-results').html('<p class="message">Service not available.</p>');
            }
        })
    });

    $(document).on('click', '.filter-button:not(".filter-button_active")', function () {
        var pressedButton = $(this);

        $('.filter-button').removeClass('filter-button_active');
        pressedButton.addClass('filter-button_active');
        $('input[name="sort"]').val(pressedButton.attr('id').replace(/^vac-sort-/, ''));
        form.submit();
        return false;
    });

    $('input[name="vacancySearchText"]').on('keyup', function () {
        if (!$(this).val()) {
            form.submit();
        }
    });
    $('#vac-search').on('click', function () {
        form.submit();
    });

    $(document).on('click', '#org-search.active', function() {
        form.submit();
    });
    $(document).on('customSelectChange', function(evt) {
        form.submit();
    });
    

});
