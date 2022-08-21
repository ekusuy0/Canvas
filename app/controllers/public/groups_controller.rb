class Public::GroupsController < ApplicationController
  before_action :authenticate_user!

  def new
    @group = Group.new
  end

  def confirm
    @group = Group.find(params[:group_id])
  end

  def create
    @group = Group.new(group_params)
    @group.owner_id = current_user.id
    # グループに紐づいたuserにcurrent_userを入れ込んでいる
    @group.users << current_user
    if @group.save
      redirect_to groups_path
    else
    　redirect_to request.referer
    end
  end

  def chat
    @message = Message.new
    @group = Group.find(params[:group_id])
    @messages = @group.messages.all
  end

  def index
    @groups = current_user.groups.all
  end

  def show
    @group = Group.find(params[:id])
    @tasks = Task.where(group_id: @group.id)
    @user = User.new
    @users = User.all
    @other_users = []
    @users.each do |user|
      @group.users.each do |group_user|
        if user.id != group_user.id
          @other_users << user
        end
      end
    end
    @other_users.uniq!
  end

  def join
    @group = Group.find(params[:id])
    # groupモデルのpasswordがinteger型なので.to_sで文字列にする
    if @group.password.to_s == params[:password]
      # @group.usersに、current_userのレコードが含まれてなければ以下の処理を行う
      unless @group.users.include?(current_user)
        @group.users << current_user
        notification = Notification.find_by(visited_id: current_user.id, group_id: @group.id, action: "invitation")
        notification.destroy
      end
      redirect_to group_path(@group.id), notice: "グループに参加しました"
    else
      flash[:confirm] = "パスワードが違います"
      redirect_to request.referer
    end
  end

  def invitation
    @group = Group.find(params[:id])

    @user = User.find_by(id: params[:user][:user_id])
    notification = Notification.where(visited_id: @user.id, group_id: @group.id, action: "invitation")
    unless notification.exists?
      @group.group_invitation_notification(current_user, @user.id, @group.id)
      redirect_to request.referer, notice: "招待を送りました"
    else
      redirect_to request.referer, alert: "すでに招待しています"
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, :password);
  end
end
