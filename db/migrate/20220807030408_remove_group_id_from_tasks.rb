class RemoveGroupIdFromTasks < ActiveRecord::Migration[6.1]
  def change
    remove_column :tasks, :group_id, :integer
  end
end
