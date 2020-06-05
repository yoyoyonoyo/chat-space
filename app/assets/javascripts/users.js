$(function(){

  let search_group = $("#UserSearchResult")

  function appendUser(user){
    let html = `<div class="ChatMember clearfix">
                  <p class="ChatMember__name">${user.name}</p>
                  <div class="ChatMember__add ChatMember__button" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`;
  search_group.append(html);
  }

  function appendNotUser(){
    let html = `<div class="ChatMember clearfix">
                  <p class="ChatMember__name">ユーザーが見つかりません</p>
                </div>`;
  search_group.append(html);
  }

  function  appendMember(user_name, user_id){
    let html = `
                <div class="ChatMember">
                  <p class="ChatMember__name">${user_name}</p>
                  <input name="group[user_ids][]" type="hidden" value="${user_id}" />
                  <div class="ChatMember__remove ChatMember__button">削除</div>
                </div>
                `;
    $(".ChatMembers").append(html);
  }

  $("#UserSearch__field").on("keyup",function(){
    let input = $("#UserSearch__field").val();
    console.log(input);
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json",
    })
    .done(function(users) {
      search_group.empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        appendNotUser();
      }
    })
    .fail(function() {
      alert("ユーザ検索に失敗しました");
    });
  });

  $("#UserSearchResult").on("click",".ChatMember__add",function(){
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this).parent().remove();
    appendMember(userName, userId);
  });

  $(".ChatMembers").on("click", ".ChatMember__remove", function() {
    $(this).parent().remove();
  });
});