class Public::TasksController < ApplicationController

  def day_index
  end

  def new
    @tag = Tag.new
    @tags = current_user.tags.all
    @task = Task.new
    # @tasks = current_user.tasks.all
  end

  def edit
    @task = Task.find(params[:id])
  end

  def update
    @task = Task.find(params[:id])
    if @task.update(task_params)
      redirect_to users_my_page_path
    else
      redirect_to request.referer
    end
  end

  def destroy
  end

  def create
    task = current_user.tasks.new(task_params)
    task.save
    redirect_to users_my_page_path
  end

  private
  def task_params
    params.require(:task).permit(:title, :content, :assigned_person, :start_time, :end_time, :tag_id)
  end

end
