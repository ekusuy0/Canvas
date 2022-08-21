class Public::GroupTagsController < ApplicationController
  before_action :authenticate_user!

  def create
    tag = current_user.tags.new(tag_params)
    tag.save
    redirect_to request.referer
  end

  def edit
    @tag = Tag.find(params[:id])
  end

  def update
    @tag = Tag.find(params[:id])
    if @tag.update(tag_params)
      redirect_to new_group_task_path(group_id: @tag.group_id)
    else
      redirect_to request.referer
    end
  end

  def destroy
    tag = Tag.find(params[:id])
    tag.destroy
    redirect_to request.referer
  end

  private
  def tag_params
    params.require(:tag).permit(:name, :color, :group_id)
  end
end
