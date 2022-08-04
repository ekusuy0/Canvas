# == Schema Information
#
# Table name: group_users
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  group_id   :integer          not null
#  user_id    :integer          not null
#
class GroupUser < ApplicationRecord
end
