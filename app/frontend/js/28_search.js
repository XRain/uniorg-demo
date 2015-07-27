$(function () {
    if (window.page.name !== 'search') {
        return false;
    }
    var form = $('#search-filters');
    form.find('a#search').on('click', function (evt) {
        evt.preventDefault();
        form.submit();
    });
    
    form.on('submit', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        $.ajax({
            url: form.attr('action'),
            data: form.serialize(),
            dataType: 'JSON',
            success: function(data) {
                console.log(data.page.searchResult);
                $('#search-results').html(window.templates.common_search({options: data.page.searchResult}));
            },
            error: function (err) {
                $('#search-results').html('<p class="message">Service not available.</p>');
            }
        })
    });
});
