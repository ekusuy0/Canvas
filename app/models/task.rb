# == Schema Information
#
# Table name: tasks
#
#  id              :integer          not null, primary key
#  assigned_person :integer          not null
#  content         :text             not null
#  end_time        :date             not null
#  start_time      :date             not null
#  status          :boolean          default(FALSE), not null
#  task_day_count  :integer          default(1), not null
#  title           :string           not null
#  week_count      :integer          not null
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

  require "date"

  def week_of_month(date)
    first_week = (date - (date.day - 1)).cweek
    this_week = date.cweek

    if this_week < first_week

      if date.month == 12
        return week_of_month(date - 7) + 1
      else
        return this_week + 1
      end
    end
    return this_week - first_week + 1
  end
end
