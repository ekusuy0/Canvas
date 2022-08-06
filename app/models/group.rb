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
class Group < ApplicationRecord
  has_many :messages, dependent: :destroy
  has_many :group_users, dependent: :destroy
  has_many :tasks, dependent: :destroy
end
