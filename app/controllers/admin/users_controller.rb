class Admin::UsersController < ApplicationController

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def update
    user = User.find(params[:id])
    user.update(user_params)
    redirect_to admin_users_path
  end

  def search
    @word = params[:word]
    if @word != ""
      @user = User.find_by(name: "#{@word}")
    else
      redirect_to admin_users_path, alert: "入力してください"
    end
  end

  private

  def user_params
    params.require(:user).permit(:status)
  end
end
