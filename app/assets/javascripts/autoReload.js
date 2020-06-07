$(function() {
  function buildHTML(message){
    if ( message.image ) {
      let html = `<div class="rightBody__message" data-message-id=${message.id}>
                    <div class="rightBody__sender">
                      <ul class="rightBody__senderLists">
                        <li class="rightBody__senderName">${message.user_name}</li>
                        <li class="rightBody__senderDate">${message.created_at}</li>
                      </ul>
                    </div>
                    <div class="rightBody__comment">
                      ${message.body}
                      <img class="Message__image" src="${message.image}">
                    </div>
                  </div> `
    return html;
    } else {
      let html = `<div class="rightBody__message" data-message-id=${message.id}>
                    <div class="rightBody__sender">
                      <ul class="rightBody__senderLists">
                        <li class="rightBody__senderName">${message.user_name}</li>
                        <li class="rightBody__senderDate">${message.created_at}</li>
                      </ul>
                    </div>
                    <div class="rightBody__comment">
                      ${message.body}
                    </div>
                  </div> `
    return html;
    };
  }
  let reloadMessages = function() {
    let last_message_id = $('.rightBody__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '' ;
        $.each(messages, function(i,message) {
          insertHTML += buildHTML(message)
        });
        $('.rightBody').append(insertHTML);
        $('.rightBody').animate({ scrollTop: $('.rightBody')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  };
  setInterval(reloadMessages, 4000);
});