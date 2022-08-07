class Public::TasksController < ApplicationController

  def day_index
  end

  def new
    @tag = Tag.new
    @tags = current_user.tags.all
    @task = Task.new
  end

  def update
  end

  def destroy
  end

  def create
  end
  
  private
  def task_params
    params.require(:task).permit(:title, :content, :assigned_person, :start_time, :end_time, :tag_id, :user_id)
  end
  
end
