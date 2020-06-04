$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html = `<div class="rightBody__sender">
                      <ul class="rightBody__senderLists">
                        <li class="rightBody__senderName">${message.user_name}</li>
                        <li class="rightBody__senderDate">${message.created_at}</li>
                      </ul>
                  </div>
                  <div class="rightBody__comment">
                    ${message.body}
                    <img class="Message__image" src="${message.image}">
                  </div>`
    return html;
    } else {
      let html = `<div class="rightBody__sender">
                    <ul class="rightBody__senderLists">
                      <li class="rightBody__senderName">${message.user_name}</li>
                      <li class="rightBody__senderDate">${message.created_at}</li>
                    </ul>
                  </div>
                  <div class="rightBody__comment">
                    ${message.body}
                  </div>`
    return html;
    };
  }
  $('.input-items').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this)
    let url = $(this).attr('action')
    // console.log(formData)
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      let html = buildHTML(message);
      console.log(html);
      $('.rightBody').append(html);
      $('form')[0].reset();
    })
    .fail(function(){
      alert("エラーですぞ")
    })
  })
});