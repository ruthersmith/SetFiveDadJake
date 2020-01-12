function ajax(my_type,my_url,my_data,successCall){
    console.log('ajax called');
    $.ajax({
        type: my_type,
        url: my_url,
        data: my_data,
        success: successCall,
        error:function(jqXhr, textStatus, errorMessage){
            console.log(errorMessage);
        }
    });
}

function displayJokes(result){
    console.log('displayJokes called');
    document.getElementById('joke-list').innerHTML = " ";
    result.forEach(element => {
        element.id = (element.id) ? element.id : element.joke_id;
        $('#joke-list').append(`<a href="search/${element.id}"><li class="list-group-item">${element.joke}</li></a>`);
    });
}



