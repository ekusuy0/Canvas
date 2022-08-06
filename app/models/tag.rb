# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  color      :string           not null
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer          not null
#
class Tag < ApplicationRecord
  has_many :tasks, dependent: :destroy
end
