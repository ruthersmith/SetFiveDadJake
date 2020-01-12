function ajax(my_type,my_url,my_data,successCall){
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