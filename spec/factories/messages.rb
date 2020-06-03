FactoryBot.define do
  factory :message do
    body {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/uploads/message/image/51/saw.jpg")}
    user
    group
  end
end