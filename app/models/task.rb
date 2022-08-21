# == Schema Information
#
# Table name: tasks
#
#  id              :integer          not null, primary key
#  assigned_person :integer          not null
#  content         :text             not null
#  end_time        :datetime         not null
#  start_time      :datetime         not null
#  status          :boolean          default(FALSE), not null
#  title           :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  group_id        :integer
#  tag_id          :integer          not null
#  user_id         :integer          not null
#
class Task < ApplicationRecord
  belongs_to :user
  belongs_to :group, optional: true
  belongs_to :tag

  validates :content, presence: true
  validates :title, presence: true
  validates :start_time, presence: true
  validates :end_time, presence: true
  validate :start_end_check

  def start_end_check
    errors.add(:end_time, "は、開始日と同じ日か遅い日付を選択してください") if self.start_time > self.end_time
  end
end
