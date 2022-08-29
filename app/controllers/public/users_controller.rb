class Public::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :ensure_guest_user, only: [:out_check]

  def show
    # 予定を開始日が古い順に取り出す
    @tasks = Task.where(assigned_person: current_user.id).order(start_time: "ASC")
  end

  def edit
    @user = User.find(current_user.id)
  end

  def update
    @user = User.find(current_user.id)
    if @user.update(user_params)
      redirect_to users_my_page_path
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

  def ensure_guest_user
    if current_user.name == "guestuser"
      redirect_to users_my_page_path, alert: "予期せぬエラーが発生しました"
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :status, :email, :color, :calendar_status)
  end
end
