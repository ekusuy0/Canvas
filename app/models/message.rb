# == Schema Information
#
# Table name: messages
#
#  id         :integer          not null, primary key
#  message    :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  group_id   :integer          not null
#  user_id    :integer          not null
#
class Message < ApplicationRecord
end
