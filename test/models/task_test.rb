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
require "test_helper"

class TaskTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
