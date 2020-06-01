class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :name, presence: true, uniqueness: true
  # has_many :user_groups
  # has_many :groups, through: :user_groups
  # has_many :messages

  has_many :group_users
  has_many :groups, through: :group_users
  has_many :messages
end
