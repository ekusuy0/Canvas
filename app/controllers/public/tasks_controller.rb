class Public::TasksController < ApplicationController

  def day_index
  end

  def new
    @tag = Tag.new
    @tags = current_user.tags.all
  end

  def update
  end

  def destroy
  end

  def create
  end
end
