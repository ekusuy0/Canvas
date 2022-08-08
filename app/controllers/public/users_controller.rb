class Public::UsersController < ApplicationController

  def show
    @tasks = current_user.tasks.all
  end

  def edit
    @user = User.find(current_user.id)
  end

  def update
  end

  def out_check
  end

  def out
    # ここで値を受け取ってる
    params = params[:status]
    @user = User.find(current_user.id)
    # 特定の値をアップデートする
    @user.update(status: params)
    session[:current_user] = nil
    redirect_to root_path
  end

  def calendar_test
    # @tasks = currnet_user.tasks.all
  end

end
