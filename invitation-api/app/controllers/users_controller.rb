class UsersController < ApplicationController
  
  def create
    @user = User.create(user_params)
    
    # set default image if none provided
    if @user.img_url.empty?
      @user.update(img_url: 'https://i.imgflip.com/db5xf.jpg')
    end

    if @user.valid?
      login
      render json: {user: UserSerializer.new(@user)}, status: :created
    else
      render json: {status: 500, errors: @user.errors.full_messages}
    end
  end

  def show
    @user = User.find(params[:id])
    if @user
      render json: {user: UserSerializer.new(@user), authorize: (user_authorize)}, status: :accepted
    else
      render json: {status: 500, errors: ['user not found']}
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :bio, :img_url, :name)
  end

  def user_authorize
    @user == current_user
  end
end
