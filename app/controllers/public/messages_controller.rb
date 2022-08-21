class Public::MessagesController < ApplicationController
  before_action :authenticate_user!

  def create
    message = Message.new(message_params)
    if message.save
      redirect_to request.referer
    end
  end

  private
  def message_params
    params.require(:message).permit(:user_id, :group_id, :message)
  end
end
