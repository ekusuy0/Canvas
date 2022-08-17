class Public::GroupTasksController < ApplicationController
  def create
    task = current_user.tasks.new(task_params)
    task.save
    redirect_to group_path(task.group_id)
  end

  def update
    @group_task = Task.find(params[:id])
    if @group_task.update(task_params)
      redirect_to group_path(@group_task.group_id)
    else
      redirect_to request.referer
    end
  end

  def destroy
  end

  def new
    @group_id = params[:group_id]
    @tag = Tag.new
    @tag.group_id = @group_id
    @tags = Tag.where(group_id: @group_id)
    @task = Task.new
    @task.group_id = @group_id
  end

  def edit
    @group_task = Task.find(params[:id])
  end

  def day_index
  end

  private
  def task_params
    params.require(:task).permit(:title, :content, :assigned_person, :start_time, :end_time, :tag_id, :group_id)
  end

end
