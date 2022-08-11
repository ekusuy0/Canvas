# == Schema Information
#
# Table name: groups
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  password   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  owner_id   :integer          not null
#
class Group < ApplicationRecord
  has_many :messages, dependent: :destroy
  has_many :group_users, dependent: :destroy
  has_many :users, through: :group_users
  has_many :tasks, dependent: :destroy
  has_many :tags, dependent: :destroy
  has_many :notifications, dependent: :destroy
  
  def group_invitation_notification(current_user, visited_id, group_id)
    # すでに招待用の通知が送られているか検索
    temp = Notification.where(visitor_id: current_user.id, visited_id: visited_id, group_id: group_id)
    # 上記で検索した通知がない場合のみ、通知レコードを作成
    if temp.blank?
      notification = current_user.active_notifications.new(
        visited_id: visited_id,
        group_id: group_id,
        action: "invitation",
      )
      
      notification.save if notification.valid?
    end
  end
end
