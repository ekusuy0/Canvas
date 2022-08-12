class Public::TagsController < ApplicationController

  def create
    tag = current_user.tags.new(tag_params)
    tag.save
    redirect_to request.referer
  end

  def edit
  end

  def update
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
end
