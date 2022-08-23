class Public::TasksController < ApplicationController
  before_action :authenticate_user!
  before_action :check_task, only: [:edit]

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
      redirect_to users_my_page_path, notice: "タスクの変更を保存しました"
    else
      redirect_to request.referer
    end
  end

  def destroy
  end

  def create
    @task = current_user.tasks.new(task_params)
    if @task.save
      redirect_to users_my_page_path, notice: "タスクを保存しました"
    else
      @tag = Tag.new
      @tags = current_user.tags.all
      render template: 'public/tasks/new'
    end
  end

  private
  def task_params
    params.require(:task).permit(:title, :content, :assigned_person, :start_time, :end_time, :tag_id)
  end

  def check_task
    @task = Task.find(params[:id])
    unless @task.user.id == current_user.id
      flash[:danger] = "予期せ眼エラーが発生しました"
      redirect_to root_path
    end
  end

end
