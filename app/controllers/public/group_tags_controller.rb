class Public::GroupTagsController < ApplicationController

  def create
    tag = current_user.tags.new(tag_params)
    tag.save
    redirect_to new_group_task_path
  end

  def edit
  end

  def update
  end

  private
  def tag_params
    params.require(:tag).permit(:name, :color, :group_id)
  end
end
