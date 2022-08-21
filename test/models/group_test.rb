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
# Indexes
#
#  index_groups_on_name  (name) UNIQUE
#
require "test_helper"

class GroupTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
