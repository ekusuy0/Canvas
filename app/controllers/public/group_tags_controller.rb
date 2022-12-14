class Public::GroupTagsController < ApplicationController
  before_action :authenticate_user!
  before_action :group_tag_check, only: [:edit]

  def create
    @tag = current_user.tags.new(tag_params)
    if @tag.save
      redirect_to request.referer, notice: "タグを保存しました"
    else
      @task = Task.new
      @task.group_id = @tag.group_id
      @tags = Tag.where(group_id: @tag.group_id)
      render template: 'public/group_tasks/new'
    end
  end

  def edit
    @tag = Tag.find(params[:id])
  end

  def update
    @tag = Tag.find(params[:id])
    if @tag.update(tag_params)
      redirect_to new_group_task_path(group_id: @tag.group_id), notice: "タグの変更を保存しました"
    else
      redirect_to request.referer
    end
  end

  def destroy
    tag = Tag.find(params[:id])
    tag.destroy
    redirect_to request.referer, notice: "タグの削除をしました"
  end

  private
  def tag_params
    params.require(:tag).permit(:name, :color, :group_id)
  end

  def group_tag_check
    @group_tag = Tag.find(params[:id])
    @group = @group_tag.group
    if @group.present?
    @group.users.each do |user|
      unless user.id == current_user.id
        flash[:danger] = "予期せ眼エラーが発生しました"
        redirect_to root_path
      end
    end
    else
      flash[:danger] = "予期せ眼エラーが発生しました"
      redirect_to root_path
    end
  end
end
