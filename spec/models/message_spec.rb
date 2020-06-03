require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do

      context 'can save' do
        it 'is valid with content' do
          expect(build(:message, image: nil)).to be_valid
        end
  
        it 'is valid with image' do
          expect(build(:message, body: nil)).to be_valid
        end
  
        it 'is valid with body and image' do
          expect(build(:message)).to be_valid
        end
      end

    # メッセージを保存できない場合
    context 'can`t save' do

      # メッセージも画像も無いと保存できない
      it "is invalid without img & body" do
        message = build(:message,body: nil,image: nil)
        message.valid?
        p message.errors
        expect(message.errors[:body]).to include("を入力してください")
      end
    
      # group_idが無いと保存できない
      it "is invalid without a image" do
        message = build(:message, group_id: nil) 
        message.valid?
        p message.errors
        expect(message.errors[:group]).to include("を入力してください")
      end

    
      # user_idが無いと保存できない
      it "is invalid without a body" do
        message = build(:message, user_id: nil)
        message.valid?
        p message.errors
        expect(message.errors[:user]).to include("を入力してください")
      end

    end

  end
end
