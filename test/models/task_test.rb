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
require "test_helper"

class TaskTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
