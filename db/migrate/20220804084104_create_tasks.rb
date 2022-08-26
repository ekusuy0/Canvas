class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.integer :user_id, null: false
      t.integer :tag_id, null: false
      t.integer :group_id, null: false
      t.string :title, null: false
      t.text :content, null: false
      t.integer :assigned_person, null: false
      t.date :start_time, null: false
      t.date :end_time, null: false
      t.boolean :status, null: false, default: false
      t.integer :task_day_count, null: false, default: 1
      t.integer :week_count, null: false

      t.timestamps
    end
  end
end
