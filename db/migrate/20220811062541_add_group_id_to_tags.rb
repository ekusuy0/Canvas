class AddGroupIdToTags < ActiveRecord::Migration[6.1]
  def change
    add_column :tags, :group_id, :integer
  end
end
