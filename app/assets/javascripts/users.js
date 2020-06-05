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
});