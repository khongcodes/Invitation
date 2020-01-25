class UsersController < ApplicationController
  
  def create
    @user = User.create(user_params)
    
    # set default image if none provided
    if @user.img_url.empty?
      @user.update(img_url: 'https://i.kym-cdn.com/entries/icons/original/000/013/564/doge.jpg')
    end

    if @user.valid?
      login
      # @token = encode_token(user_id: @user.id)
      render json: {user: UserSerializer.new(@user)}, status: :created
    else
      render json: {status: 500, errors: @user.errors.full_messages}
    end
  end

  def show
    @user = User.find(params[:id])
    if @user
      render json: {user: UserSerializer.new(@user)}, status: :accepted
    else
      render json: {status: 500, errors: ['user not found']}
    end
    # options = {}
    # does current_user match this user_id
    # if not logged_in show false
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :bio, :img_url, :name)
  end
end
