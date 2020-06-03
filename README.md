# README

## 1. Database設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
|email|string|null: false , unique: true|
|password|string|null: false|

### Association
- has_many :user_groups
- has_many :groups, through: :user_groups
- has_many :messages

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|

### Association
- has_many :user_groups
- has_many :users, through: :users_groups
- has_many :messages

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group