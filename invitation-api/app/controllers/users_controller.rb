class UsersController < ApplicationController
  before_action :set_user, except: :create

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

  def edit
    if user_authorize
      render json: {user: UserSerializer.new(@user), authorize: user_authorize}, status: :accepted
    elsif !user_authorize
      render json: {error: 'You do not have permission to edit this resource'}, status: :unauthorized
    end
  end

  def update
    @user.assign_attributes({
      username: user_params[:username],
      name: user_params[:name],
      bio: user_params[:bio],
      img_url: user_params[:img_url]
    })

    if !@user.authenticate(user_params['password'])
      render json: {error: 'Authentication failed - enter password again'}, status: :unauthorized
    elsif user_authorize && @user.save
      render json: {user: UserSerializer.new(@user), authorize: user_authorize}, status: :accepted
    else
      render json: {error: 'Failed to update user'}, status: :not_acceptable
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :bio, :img_url, :name)
  end

  def user_authorize
    @user == current_user
  end

  def set_user
    begin
      @user = User.find(params[:id])
    rescue ActiveRecord::RecordNotFound => exception
      render json: {
        error: exception.to_s,
      }, status: :not_found
    end
  end

end