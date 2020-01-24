class UsersController < ApplicationController
  
  def create
    @user = User.create(user_params)
    if @user.valid?
      @token = encode_token(user_id: @user.id)
      render json: {user: UserSerializer.new(@user), jwt: @token}, status: :created
    else
      render json: {error: 'failed to create user'}, status: :not_acceptable
    end
  end

  def show
    @user = User.find(params[:id])
    # options = {}
    # does current_user match this user_id
    # if not logged_in show false
    render json: {user: UserSerializer.new(@user)}, status: :accepted
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :bio, :img_url, :name)
  end
end
