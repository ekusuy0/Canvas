# frozen_string_literal: true

class Public::SessionsController < Devise::SessionsController
  before_action :user_state, only: [:create]
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end

  def after_sign_in_path_for(resource)
    users_my_page_path
  end

  def guest_sign_in
    user = User.guest
    sign_in user
    redirect_to users_my_page_path, notice: 'guestuserでログインしました。'
  end

  protected
  def user_state
    # 入力されたnameからアカウントを1権取得
    @user = User.find_by(name: params[:user][:name])
    # アカウントを取得できなかったときこのメソッドを終了する
    return if !@user
    # 取得したアカウントのパスワードと入力したパスワードが一致してるかを判別している。かつ、userのステータスが退会のとき
    if (@user.valid_password?(params[:user][:password]) && ( @user.status == true ))
    # 新規登録画面に飛ばす処理
      redirect_to new_user_registration_path
    end
  end
end
