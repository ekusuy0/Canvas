class Public::TasksController < ApplicationController
  before_action :authenticate_user!
  before_action :check_task, only: [:edit]

  def new
    @tag = Tag.new
    @user_tags = current_user.tags.all
    @tags = []
    @user_tags.each do |tag|
      unless tag.group_id.present?
        @tags << tag
      end
    end
    @task = Task.new
  end

  def edit
    @task = Task.find(params[:id])
    @user_tags = current_user.tags.all
    @tags = []
    @user_tags.each do |tag|
      unless tag.group_id.present?
        @tags << tag
      end
    end
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
    task = Task.find(params[:id])
    if task.destroy
      redirect_to users_my_page_path, notice: "タスクを削除しました"
    else
      redirect_to request.referer, alert: "タスクの保存に失敗しました"
    end
  end

  def create
    @task = current_user.tasks.new(task_params)
    tasks = current_user.tasks.all



    tasks.each do |task|
      for span in 0..(task.end_time.yday - task.start_time.yday) do
        for taskspan in 0..(@task.end_time.yday - @task.start_time.yday) do
          if (@task.start_time + taskspan) == (task.start_time + span)
            @task.task_day_count = task.task_day_count + 1
          end
        end
      end
    end

    @task.week_count = @task.week_of_month(@task.start_time)

    if @task.save
      redirect_to users_my_page_path, notice: "タスクを保存しました"
    else
      @tag = Tag.new
      @user_tags = current_user.tags.all
      @tags = []
      @user_tags.each do |tag|
        unless tag.group_id.present?
          @tags << tag
        end
      end
      render :new
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
