class Public::UsersController < ApplicationController

  def show
    @tasks = Task.where(assigned_person: current_user.id)
    
  end

  def edit
    @user = User.find(current_user.id)
  end

  def update
    @user = User.find(current_user.id)
    if @user.update(user_params)
      redirect_to request.referer
    else
      render :edit
    end
  end

  def out_check
    @user = User.find(current_user.id)
  end

  def out
    @user = User.find(current_user.id)
    if @user.update(user_params)
      session[:current_user] = nil
      redirect_to destroy_user_session_path
    else
      redirect_to request.referer
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :status, :email, :color)
  end
end
