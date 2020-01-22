class Api::V1::AuthController < ApplicationController
  def create
    @user = User.find_by(username: user_login_params[:username])
    # returns nil if no user found
    # @user in the conditional below prevents error on running #authenticate method on nil value

    if @user && @user.authenticate(user_login_params[:password])
      token = encode_token({user_id: @user.id})
      render json: {user: UserSerializer.new(@user), jwt: token}, status: :accepted
    else
      render json: {message: 'Invalid username or password'}
    end
  end

  private

  def user_login_params
    # params {user: {username: 'Chandler', password: 'password'}}
    params.require(:user).permit(:username, :password)
  end

end