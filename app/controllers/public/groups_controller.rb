class Public::GroupsController < ApplicationController
  def new
    @group = Group.new
  end

  def confirm
  end

  def create
    @group = Group.new(group_params)
    @group.owner_id = current_user.id
    # グループに紐づいたuserにcurrent_userを入れ込んでいる
    @group.users << current_user
    @group.users <<
    @group.save
    redirect_to groups_path
  end

  def chat
  end

  def index
    @groups = current_user.groups.all
  end

  def show
    @group = Group.find(params[:id])
    @tasks = Task.where(group_id: @group.id)
  end

  def join
  end

  def invitation
  end

  private
  def group_params
    params.require(:group).permit(:name, :password);
  end
end
