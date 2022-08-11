class CreateNotifications < ActiveRecord::Migration[6.1]
  def change
    create_table :notifications do |t|

      t.integer  :visitor_id, null: false
      t.integer  :visited_id, null: false
      t.integer  :group_id
      t.string   :action, dafault: '', null: false
      t.boolean :checked, dafault: false, null: false

      t.timestamps
    end

    add_index :notifications, :group_id
  end
end
