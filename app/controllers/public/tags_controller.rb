class Public::TagsController < ApplicationController
  before_action :authenticate_user!
  before_action :tag_check, only: [:edit]

  def create
    tag = current_user.tags.new(tag_params)
    if tag.save
      redirect_to request.referer
    end
  end

  def edit
    @tag = Tag.find(params[:id])
  end

  def update
    @tag = Tag.find(params[:id])
    if @tag.update(tag_params)
      redirect_to new_task_path
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
    params.require(:tag).permit(:name, :color)
  end

  def tag_check
    @tag = Tag.find(params[:id])
    unless @tag.user.id == current_user.id
      flash[:danger] = "予期せ眼エラーが発生しました"
      redirect_to root_path
    end
  end
end
