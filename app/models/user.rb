class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  # validates :name, presence: true, uniqueness: true
  validates :name, presence: true, uniqueness: {case_sensitive: true}
  # has_many :user_groups
  # has_many :groups, through: :user_groups
  # has_many :messages

  has_many :group_users
  has_many :groups, through: :group_users
  has_many :messages

  def self.search(input, id)
    return nil if input == ""
    User.where(['name LIKE ?', "%#{input}%"] ).where.not(id: id).limit(10)
  end

end
