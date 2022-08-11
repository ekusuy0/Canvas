# == Schema Information
#
# Table name: notifications
#
#  id         :integer          not null, primary key
#  action     :string           not null
#  checked    :boolean          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  group_id   :integer
#  visited_id :integer          not null
#  visitor_id :integer          not null
#
# Indexes
#
#  index_notifications_on_group_id  (group_id)
#
class Notification < ApplicationRecord
  default_scope -> { order(created_at: :desc) } # デフォルトの並びを「作成日時の降順」で指定
  belongs_to :group, optional: true

  belongs_to :visitor, class_name: 'User', foreign_key: 'visitor_id', optional: true
  belongs_to :visited, class_name: 'User', foreign_key: 'visited_id', optional: true
end
