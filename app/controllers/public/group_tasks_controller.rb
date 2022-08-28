class Public::GroupTasksController < ApplicationController
  before_action :authenticate_user!
  before_action :group_task_check, only: [:edit]

  def create
    @task = current_user.tasks.new(task_params)
    tasks = Task.where(group_id: @group.id)

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
      redirect_to group_path(task.group_id), notice: "タスクを保存しました"
    else
      @tag = Tag.new
      @tag.group_id = @task.group_id
      @tags = Tag.where(group_id: @task.group_id)
      render template: 'public/group_tasks/new'
    end
  end

  def update
    @group_task = Task.find(params[:id])
    if @group_task.update(task_params)
      redirect_to group_path(@group_task.group_id), "タスクの変更を保存しました"
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

  private
  def task_params
    params.require(:task).permit(:title, :content, :assigned_person, :start_time, :end_time, :tag_id, :group_id)
  end

  def group_task_check
    @group_task = Task.find(params[:id])
    @group = @group_task.group
    if @group.present?
      @group.users.each do |user|
        unless user.id == current_user.id
          flash[:danger] = "予期せ眼エラーが発生しました"
          redirect_to root_path
        end
      end
    else
      redirect_to root_path
    end
  end
end
