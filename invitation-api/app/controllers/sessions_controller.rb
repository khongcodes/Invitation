class SessionsController < ApplicationController
  def create
    @user = User.find_by(username: session_params[:username])
    # returns nil if no user found
    # @user in the conditional below prevents error on running #authenticate method on nil value

    if @user && @user.authenticate(session_params[:password])
      login
      render json: {user: UserSerializer.new(@user)}, status: :accepted
    else
      render json: {message: 'Invalid username or password'}
    end
  end

  def is_logged_in?
    if logged_in? && current_user
      render json: {user: UserSerializer.new(current_user), logged_in: true}
    else
      render json: {message: 'no such user', logged_in: false}
    end
  end

  def destroy
    logout
    render json: {
      status: 200,
      logged_out: true
    }
  end

  private

  def session_params
    params.require(:user).permit(:username, :password)
  end

end