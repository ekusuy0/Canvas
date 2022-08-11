# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  color      :string           not null
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  group_id   :integer
#  user_id    :integer          not null
#
class Tag < ApplicationRecord
  has_many :tasks, dependent: :destroy
  belongs_to :user
  belongs_to :group
end
